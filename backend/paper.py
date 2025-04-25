import os
import requests
import arxiv
import PyPDF2
from uuid import uuid4
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
from dotenv import load_dotenv

load_dotenv()

URL = os.getenv("URL")
KEY = os.getenv("KEY")

# Constants
COLLECTION_NAME = "iris_llm"
DATA_FOLDER = "data"
os.makedirs(DATA_FOLDER, exist_ok=True)

# Initialize clients
qdrant_client = QdrantClient(
    url=URL,
    api_key=KEY,
)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Create collection if not exists
if not qdrant_client.collection_exists(COLLECTION_NAME):
    qdrant_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    )


def fetch_arxiv_papers(query: str, max_results: int = 5):
    """
    Fetches arXiv papers based on the search query.
    """
    arxiv_client = arxiv.Client()
    search = arxiv.Search(
        query=query, max_results=max_results, sort_by=arxiv.SortCriterion.Relevance
    )

    papers = []
    for result in arxiv_client.results(search):
        papers.append(
            {
                "title": result.title,
                "authors": [author.name for author in result.authors],
                "summary": result.summary,
                "pdf_link": result.pdf_url,
            }
        )

    return papers


def pdf_download(url: str, filename: str):
    """
    Downloads a PDF from the given URL if not already present.
    """
    pdf_path = os.path.join(DATA_FOLDER, filename)

    if os.path.exists(pdf_path):
        print(f"File already exists: {pdf_path}")
        return pdf_path

    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(pdf_path, "wb") as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)
        print(f"Downloaded: {pdf_path}")
        return pdf_path
    else:
        print(f"Failed to download {url} (Status: {response.status_code})")
        return None


def extract_text(pdf_path: str, max_pages: int = 2):
    """
    Extracts text from the first few pages of a PDF.
    """
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return ""

    try:
        with open(pdf_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = min(len(reader.pages), max_pages)
            text = "\n".join(
                reader.pages[i].extract_text() or "" for i in range(num_pages)
            )
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""


def get_links(papers_list):
    """
    Returns the list of PDF links from the papers.
    """
    return [paper["pdf_link"] for paper in papers_list]


def process_papers(papers):
    """
    Downloads, extracts, embeds, and stores paper data into Qdrant.
    """
    qdrant_points = []

    for i, paper in enumerate(papers):
        title = paper["title"]
        authors = ", ".join(paper["authors"])
        summary = paper["summary"]
        pdf_link = paper["pdf_link"]

        pdf_name = f"paper_{i + 1}.pdf"
        pdf_path = pdf_download(pdf_link, pdf_name)
        extracted_text = (
            extract_text(pdf_path) if pdf_path else "Could not extract text."
        )

        combined_text = (
            f"Title: {title}\nAuthors: {authors}\nSummary: {summary}"
            f"\nPDF Link: {pdf_link}\nExtracted Content:\n{extracted_text}"
        )

        embedding = embedder.encode(combined_text).tolist()
        metadata = {
            "title": title,
            "authors": authors,
            "summary": summary,
            "pdf_link": pdf_link,
        }

        qdrant_points.append(
            PointStruct(id=str(uuid4()), vector=embedding, payload=metadata)
        )

    if qdrant_points:
        qdrant_client.upsert(
            collection_name=COLLECTION_NAME,
            points=qdrant_points,
        )

        for file in os.listdir(DATA_FOLDER):
            file_path = os.path.join(DATA_FOLDER, file)
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.remove(file_path)

        print("Papers processed and stored in Qdrant.")
    else:
        print("No text extracted. Nothing was stored.")
