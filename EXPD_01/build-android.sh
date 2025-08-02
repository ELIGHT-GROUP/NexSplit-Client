#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Android Build with Docker${NC}"
echo "=================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ docker-compose is not installed. Please install it and try again.${NC}"
    exit 1
fi

# Create output directory
mkdir -p ./build-output

echo -e "${YELLOW}📦 Building Docker image...${NC}"
docker-compose build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

echo -e "${YELLOW}🔨 Running Android build...${NC}"
docker-compose up --build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build process failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo -e "${YELLOW}📁 Build artifacts are available in:${NC}"
echo "   - ./build-output/ (local directory)"
echo "   - Docker volume: android-builds"

# List build outputs
echo -e "${YELLOW}📋 Build outputs:${NC}"
if [ -d "./build-output" ]; then
    ls -la ./build-output/
else
    echo "No build outputs found in ./build-output/"
fi

echo -e "${GREEN}🎉 Build process finished!${NC}" 