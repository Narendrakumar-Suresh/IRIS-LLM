import os
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
import paper
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

URL = os.getenv("URL")
KEY = os.getenv("KEY")
GEMINI_KEY = os.getenv("GEMINI_KEY")

# Setup logging
logging.basicConfig(level=logging.INFO)

# Constants
COLLECTION_NAME = "iris_llm"

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Globals
first = True
chat_context = ""

# Request model
class ChatRequest(BaseModel):
    query: str

# Qdrant + embeddings
qdrant = QdrantClient(url=URL, api_key=KEY)
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def search_qdrant_context(query: str, top_k: int = 3) -> str:
    try:
        vec = embedder.encode(query).tolist()
        results = qdrant.search(collection_name=COLLECTION_NAME, query_vector=vec, limit=top_k)
        if not results:
            return ""
        chunks = []
        for r in results:
            p = r.payload
            chunks.append(
                f"**Title**: {p['title']}  \n"
                f"**Authors**: {p['authors']}  \n"
                f"**Summary**: {p['summary']}  \n"
                f"**[PDF Link]({p['pdf_link']})**"
            )
        return "\n\n".join(chunks)
    except Exception as e:
        logging.error(f"Qdrant error: {e}")
        raise HTTPException(500, "Error fetching context from Qdrant")

@app.post("/prepare-paper")
def generate_paper(request: ChatRequest):
    global first, chat_context

    client = genai.Client(api_key=GEMINI_KEY)

    try:
        logging.info(f"Query: {request.query}")

        # On first call, fetch & index papers
        if first:
            papers = paper.fetch_arxiv_papers(request.query)
            paper.process_papers(papers)
            first = False

        # Retrieve fresh context
        context_md = search_qdrant_context(request.query)
        if not context_md:
            raise HTTPException(500, "No relevant context found.")

        # Build prompt
        if "User:" not in chat_context:
            # initial paper generation
            prompt = f"""
**PLEASE RESPOND IN MARKDOWN ONLY.**  
Use `#`, `##`, etc. for headings; do **not** use LaTeX.

# Research Paper

## Context
{context_md}

## Objective
Generate a formal, citation‑supported academic paper exploring the above context.

## Structure
1. ## Abstract (250–300 words)  
   - Summarize problem, methodology, key findings, conclusions.

2. ## Introduction  
   - Background, research question, significance, objectives.

3. ## Main Body  
   - Subsections with headings, your analysis, evidence, methodology.

4. ## Conclusion  
   - Summarize findings, discuss limitations, suggest future work.

5. ## References  
   - List each citation as:  
     `[Title by Authors (PDF Link)]`
"""
        else:
            # follow‑up continuation
            prompt = f"""
**PLEASE RESPOND IN MARKDOWN ONLY.**  
Use `#`, `##`, etc. for headings; do **not** use LaTeX.

# Continued Discussion

## Previous Context
{chat_context}

## New Context
{context_md}

## User Query
{request.query}

## Instructions
- Maintain coherence with prior exchanges.
- Use **Markdown headings** and lists.
- In‑text citations: `[Title by Authors (PDF Link)]`
- Always include Title, Authors, PDF Link in References.
"""

        # Call Gemini
        resp = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt
        )

        if not resp.text:
            raise HTTPException(500, "Empty response from Gemini")

        # Update chat history
        chat_context += f"\nUser: {request.query}\nAI: {resp.text}\n"
        return {"response": resp.text}

    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error: {e}")
        raise HTTPException(500, str(e))

@app.get("/")
def home():
    return {"message": "FastAPI server is running!"}
