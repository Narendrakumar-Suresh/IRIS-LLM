from ollama import chat
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import paper
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Variables
first = True
chat_context = ""

# Request model
class ChatRequest(BaseModel):
    query: str  # User query for paper generation

@app.post('/prepare-paper')
def generate_paper(request: ChatRequest):
    global first, chat_context

    try:
        logging.info(f"Received request: {request.query}")

        if first:
            # Fetch and process arXiv papers dynamically
            papers = paper.fetch_arxiv_papers(request.query)
            paper.process_papers(papers)

            # Ensure context.txt exists before reading
            if not os.path.exists("context.txt"):
                raise HTTPException(status_code=500, detail="context.txt not found or empty")

            # Read updated context from file
            with open("context.txt", "r", encoding="utf-8") as file:
                context_data = file.read().strip()

            if not context_data:
                raise HTTPException(status_code=500, detail="context.txt is empty")

            # First prompt with structured instructions
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

            first = False  # Mark as not first request
        else:
            # Continue conversation with previous responses
            prompt = f"""
            Continue the research discussion based on previous exchanges.

            ### Previous Context:
            {chat_context}

            ### New User Query:
            {request.query}

            ### Instructions:
            - Maintain coherence with previous responses.
            - Use citations where necessary.
            - Follow academic writing style.
            """

        # Ensure Ollama is running before calling `chat`
        try:
            response = chat(model='gemma3:1b', messages=[{'role': 'user', 'content': prompt}])
        except Exception as ollama_error:
            logging.error(f"Ollama error: {ollama_error}")
            raise HTTPException(status_code=500, detail="Ollama model is not available or not running")

        # Ensure the response is valid
        if not response or not response.message:
            raise HTTPException(status_code=500, detail="Ollama returned an empty response")

        # Update chat context
        chat_context += f"\nUser: {request.query}\nAI: {response.message.content}"

        return {"response": response.message.content}

    except Exception as e:
        logging.error(f"Error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Ollama FastAPI server is running!"}
