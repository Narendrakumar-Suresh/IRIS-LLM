# Use a base Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed for Ollama
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install -r requirements.txt

# Install Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Expose FastAPI port
EXPOSE 8000

# Create a startup script
RUN echo '#!/bin/bash\n\
ollama serve &\n\
sleep 5\n\
ollama pull gemma3:1b\n\
uvicorn main:app --host 0.0.0.0 --port 8000\n' > /app/start.sh && \
    chmod +x /app/start.sh

# Use the startup script as the entry point
CMD ["/app/start.sh"]