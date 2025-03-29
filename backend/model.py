from ollama import chat, ChatResponse
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import paper  # Importing your custom arXiv paper processing script

app = FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credential=True,allow_methods=['*'],
                   allow_headers=['*'])

class ChatRequest(BaseModel):
    query: str  # Query for fetching papers

@app.post('/prepare-paper')
def generate_paper(request: ChatRequest):
    try:
        # Fetch and process arXiv papers dynamically
        papers = paper.fetch_arxiv_papers(request.query)
        paper.process_papers(papers)

        # Read updated context from file
        with open("context.txt", "r", encoding="utf-8") as file:
            context_data = file.read()

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

        response: ChatResponse = chat(model='llama3.2:1b', messages=[
            {'role': 'user', 'content': prompt}
        ])

        return {"response": response.message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Ollama FastAPI server is running!"}