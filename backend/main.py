from ollama import chat
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue
from sentence_transformers import SentenceTransformer
import paper
import logging
import os
from dotenv import load_dotenv

load_dotenv()

URL = os.getenv("URL")
KEY = os.getenv("KEY")

# Setup logging
logging.basicConfig(level=logging.INFO)

# Constants
COLLECTION_NAME = "iris_llm"

# FastAPI app init
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Globals
first = True
chat_context = ""


# Models
class ChatRequest(BaseModel):
    query: str


# Qdrant + Embeddings setup
qdrant_client = QdrantClient( url=URL, api_key=KEY,)
embedder = SentenceTransformer("all-MiniLM-L6-v2")


def search_qdrant_context(query: str, top_k: int = 3) -> str:
    """
    Search Qdrant with embedded query and return top-k matches as combined context.
    """
    try:
        embedding = embedder.encode(query).tolist()

        search_result = qdrant_client.search(
            collection_name=COLLECTION_NAME, query_vector=embedding, limit=top_k
        )

        if not search_result:
            return ""

        contexts = []
        for result in search_result:
            payload = result.payload
            context = (
                f"Title: {payload['title']}\n"
                f"Authors: {payload['authors']}\n"
                f"Summary: {payload['summary']}\n"
                f"PDF Link: {payload['pdf_link']}"
            )
            contexts.append(context)

        return "\n\n".join(contexts)

    except Exception as e:
        logging.error(f"Error searching Qdrant: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Error fetching context from Qdrant"
        )


@app.post("/prepare-paper")
def generate_paper(request: ChatRequest):
    global first, chat_context

    try:
        logging.info(f"Received request: {request.query}")

        if first:
            papers = paper.fetch_arxiv_papers(request.query)
            paper.process_papers(papers)
            context_data = search_qdrant_context(request.query)
            if not context_data:
                raise HTTPException(
                    status_code=500, detail="No relevant data found in Qdrant."
                )

            prompt = f"""
            Generate a well-structured research paper based on the following context.
            Include proper citations using the links provided.

            ### Context:
            {context_data}

            ### Instructions:
            - Write in an academic style.
            - Use citations where necessary.
            - Include a structured format (Abstract, Introduction, Main Body, Conclusion).
            """
            first = False
        else:
            context_data = search_qdrant_context(request.query)
            prompt = f"""
            Continue the research discussion based on previous exchanges and the following new context.

            ### Previous Context:
            {chat_context}

            ### New Related Context:
            {context_data}

            ### New User Query:
            {request.query}

            ### Instructions:
            - Maintain coherence with previous responses.
            - Use citations where necessary.
            - Follow academic writing style.
            - For each paper referenced, ALWAYS include:
              * Title of the paper
              * Authors
              * PDF link
            - Format citations as: [Title by Authors (PDF Link)]
            """

        # Chat with Ollama
        try:
            response = chat(
                model="gemma3:1b", messages=[{"role": "user", "content": prompt}]
            )
        except Exception as ollama_error:
            logging.error(f"Ollama error: {ollama_error}")
            raise HTTPException(
                status_code=500, detail="Ollama model is not available or not running"
            )

        if not response or not response.message:
            raise HTTPException(
                status_code=500, detail="Ollama returned an empty response"
            )

        chat_context += f"\nUser: {request.query}\nAI: {response.message.content}"
        return {"response": response.message.content}

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def home():
    return {"message": "Ollama FastAPI server is running!"}
