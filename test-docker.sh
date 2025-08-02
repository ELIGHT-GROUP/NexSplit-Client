#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧪 Testing Docker Android Build Setup${NC}"
echo "=================================="

# Test 1: Check if Docker is running
echo -e "${YELLOW}Test 1: Checking Docker...${NC}"
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Docker is running${NC}"
else
    echo -e "${RED}❌ Docker is not running${NC}"
    exit 1
fi

# Test 2: Check if docker-compose is available
echo -e "${YELLOW}Test 2: Checking docker-compose...${NC}"
if command -v docker-compose &> /dev/null; then
    echo -e "${GREEN}✅ docker-compose is available${NC}"
else
    echo -e "${RED}❌ docker-compose is not installed${NC}"
    exit 1
fi

# Test 3: Check if project structure exists
echo -e "${YELLOW}Test 3: Checking project structure...${NC}"
if [ -d "./app" ] && [ -d "./app/android" ] && [ -d "./app/core" ]; then
    echo -e "${GREEN}✅ Project structure is correct${NC}"
else
    echo -e "${RED}❌ Project structure is missing${NC}"
    exit 1
fi

# Test 4: Check if Docker files exist
echo -e "${YELLOW}Test 4: Checking Docker files...${NC}"
if [ -f "./Dockerfile" ] && [ -f "./docker-compose.yml" ]; then
    echo -e "${GREEN}✅ Docker files exist${NC}"
else
    echo -e "${RED}❌ Docker files are missing${NC}"
    exit 1
fi

# Test 5: Build Docker image (without running)
echo -e "${YELLOW}Test 5: Building Docker image...${NC}"
if docker-compose build --no-cache; then
    echo -e "${GREEN}✅ Docker image built successfully${NC}"
else
    echo -e "${RED}❌ Docker image build failed${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 All tests passed! Docker setup is ready.${NC}"
echo -e "${YELLOW}You can now run: ./build-android.sh${NC}" 