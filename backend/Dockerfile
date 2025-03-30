# Use Ubuntu 24.04 (Noble)
FROM ubuntu:24.04

# Set working directory
WORKDIR /app

# Install system dependencies & Python 3.12
RUN apt-get update && apt-get install -y \
    software-properties-common curl git wget python3.12 python3.12-venv python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Set Python 3.12 as default
RUN ln -sf /usr/bin/python3.12 /usr/bin/python && \
    ln -sf /usr/bin/python3.12 /usr/bin/python3

# Install CUDA
RUN wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/x86_64/cuda-keyring_1.1-1_all.deb && \
    dpkg -i cuda-keyring_1.1-1_all.deb && \
    apt-get update && apt-get install -y cuda

# Install Ollama
RUN curl -fsSL https://ollama.ai/install.sh | sh

# Create and activate virtual environment
RUN python -m venv /app/venv
ENV PATH="/app/venv/bin:$PATH"

# Copy backend files
COPY . .

# Install Python dependencies in venv
RUN pip install --no-cache-dir --upgrade pip
RUN pip install -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Create a startup script
RUN echo '#!/bin/bash\n\
source /app/venv/bin/activate\n\
ollama serve &\n\
sleep 5\n\
ollama pull gemma3:1b\n\
uvicorn main:app --host 0.0.0.0 --port 8000\n' > /app/start.sh && \
    chmod +x /app/start.sh

# Use the startup script as the entry point
CMD ["/app/start.sh"]
