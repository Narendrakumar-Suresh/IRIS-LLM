#!/bin/bash

# Define image name
IMAGE_NAME="iris-backend"

# Stop and remove existing container if running
echo "Stopping existing container..."
docker stop $IMAGE_NAME 2>/dev/null
docker rm $IMAGE_NAME 2>/dev/null

# Build the Docker image
echo "Building Docker image..."
docker build --no-cache -t $IMAGE_NAME .

# Run the Docker container with GPU support
echo "Running Docker container..."
docker run --gpus all -p 8000:8000 --name $IMAGE_NAME $IMAGE_NAME
