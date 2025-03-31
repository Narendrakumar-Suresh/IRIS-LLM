# Define image name
$IMAGE_NAME = "iris-backend"

# Stop and remove any existing container
Write-Host "Stopping existing container..."
docker stop $IMAGE_NAME 2>$null
docker rm $IMAGE_NAME 2>$null

# Build the Docker image
Write-Host "Building Docker image..."
docker build --no-cache -t $IMAGE_NAME .

# Run the Docker container with GPU support
Write-Host "Running Docker container..."
docker run --gpus all -p 8000:8000 --name $IMAGE_NAME $IMAGE_NAME
