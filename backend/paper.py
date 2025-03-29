import arxiv
import requests
import PyPDF2
import os

DATA_FOLDER = "data"
CONTEXT_FILE = "context.txt"

# Ensure the data folder exists
os.makedirs(DATA_FOLDER, exist_ok=True)

def fetch_arxiv_papers(query, max_results=5):
    """Fetches arXiv papers based on the query"""
    client = arxiv.Client()
    search = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )

    papers = []
    for result in client.results(search):
        papers.append({
            "title": result.title,
            "authors": [author.name for author in result.authors],
            "summary": result.summary,
            "pdf_link": result.pdf_url
        })

    return papers

def pdf_download(url, filename):
    pdf_path = os.path.join(DATA_FOLDER, filename)

    if os.path.exists(pdf_path):
        print(f"File already exists: {pdf_path}")
        return pdf_path  # Skip download if already exists

    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(pdf_path, 'wb') as file:
            for chunk in response.iter_content(1024):
                file.write(chunk)
        print(f"Downloaded: {pdf_path}")
        return pdf_path
    else:
        print(f"Failed to download {url} (Status: {response.status_code})")
        return None

def extract_text(pdf_path, max_pages=2):
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        return ""

    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = min(len(pdf_reader.pages), max_pages)

            for i in range(num_pages):
                page_text = pdf_reader.pages[i].extract_text()
                if page_text:
                    text += page_text + "\n"
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from {pdf_path}: {e}")
        return ""

def get_links(papers_list):
    return [paper['pdf_link'] for paper in papers_list]

def process_papers(papers):
    all_text = ""

    for i, paper in enumerate(papers):
        title = paper['title']
        authors = ', '.join(paper['authors'])
        summary = paper['summary']
        pdf_link = paper['pdf_link']

        pdf_name = f'paper_{i+1}.pdf'
        pdf_path = pdf_download(pdf_link, pdf_name)

        extracted_text = extract_text(pdf_path) if pdf_path else "Could not extract text."

        all_text += f"Title: {title}\n"
        all_text += f"Authors: {authors}\n"
        all_text += f"Summary: {summary}\n"
        all_text += f"PDF Link: {pdf_link}\n"
        all_text += f"Extracted Content:\n{extracted_text}\n"
        all_text += "=" * 80 + "\n"  # Separator for readability

    if all_text.strip():
        with open(CONTEXT_FILE, "w", encoding="utf-8") as f:
            f.write(all_text)
        print(f"Context saved to {CONTEXT_FILE}")

        # Clean up downloaded PDFs
        for file in os.listdir(DATA_FOLDER):
            file_path = os.path.join(DATA_FOLDER, file)
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.remove(file_path)

    else:
        print("No text extracted. Context file not created.")

# Fetch papers and process them
# papers = fetch_arxiv_papers("RAG in Large Language Models")
# process_papers(papers)
