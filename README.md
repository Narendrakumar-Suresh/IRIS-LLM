# IRIS-LLM

## Overview

**IRIS-LLM** is an **AI-driven knowledge curation system** that researches topics, extracts relevant information from various sources, and generates **comprehensive, well-structured reports with citations**. Built using **FastAPI** and **Ollama**, IRIS-LLM automates the process of gathering, synthesizing, and presenting information in a structured format, making it an invaluable tool for researchers, students, and professionals.

### 🔹 Key Capabilities:
✅ **Automated Research** – Collects and processes data from various sources.  
✅ **Report Generation** – Produces well-organized, full-length reports.  
✅ **Citations & References** – Ensures credibility with properly formatted citations.  
✅ **Customizable Output** – Tailors reports based on user preferences.  
✅ **Scalable API** – Easily integrates with existing systems for automated content generation.  

---

## Use Cases

IRIS-LLM is ideal for:

- 📚 **Academic Research** – Automates literature reviews and knowledge synthesis.
- 🏛 **Policy & Legal Analysis** – Generates well-cited reports for policy development.
- 🔬 **Scientific Summaries** – Condenses complex topics into accessible reports.
- 💼 **Market & Competitive Analysis** – Extracts trends and insights from industry data.
- 📰 **Automated Journalism** – Creates articles based on factual data.

---

## System Architecture

- **Research Module** – Gathers relevant data from web sources, databases, and documents.
- **LLM Processing** – Uses large language models to analyze and synthesize information.
- **Report Generator** – Structures findings into a human-readable document.
- **Citation Engine** – Ensures accuracy with properly formatted references.

---

## Getting Started

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/IRIS-LLM.git
cd IRIS-LLM/backend
```

### 2️⃣ Set Up a Virtual Environment
```sh
python -m venv myenv
```

### 3️⃣ Activate the Virtual Environment
#### Windows (PowerShell)
```sh
myenv\Scripts\Activate
```
#### Mac/Linux
```sh
source myenv/bin/activate
```

### 4️⃣ Install Dependencies
```sh
pip install --upgrade pip
pip install ollama fastapi uvicorn ruff
```

---

## Running the Server

To start the IRIS-LLM API server, run:
```sh
uvicorn main:app --reload
```
- API available at: **http://127.0.0.1:8000**
- Interactive API Docs: **http://127.0.0.1:8000/docs**

---

## Example API Usage

### Generate a Research Report

#### **Request**
```sh
POST /generate-report
{
  "topic": "Impact of AI on Climate Change",
  "sources": ["web", "papers"],
  "format": "APA"
}
```

#### **Response (Excerpt)**
```json
{
  "title": "The Impact of AI on Climate Change",
  "content": "Artificial Intelligence (AI) has the potential to significantly contribute to climate change mitigation through predictive analytics and optimization...",
  "citations": [
    "[1] Smith, J. (2023). AI and Climate Change. Journal of Sustainability.",
    "[2] United Nations Report on AI in Energy Efficiency (2022)."
  ]
}
```

---

## Future Roadmap

- ✅ Research automation with LLM  
- ✅ report can be exported as text file.
- 🔜 Multi-source citation support (books, research papers, verified web sources)  
- 🔜 Interactive user interface for report generation  
- 🔜 AI-driven summarization & bias detection  


