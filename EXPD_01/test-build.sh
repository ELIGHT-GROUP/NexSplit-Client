#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧪 Testing NexSplit Build Process${NC}"
echo "====================================="

# Check if we're in the right directory
if [ ! -d "app" ]; then
    echo -e "${RED}❌ app directory not found. Please run this script from the project root.${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Entering app directory...${NC}"
cd app

# Check if build script exists
if [ ! -f "build.sh" ]; then
    echo -e "${RED}❌ build.sh not found in app directory${NC}"
    exit 1
fi

echo -e "${BLUE}🔧 Making build script executable...${NC}"
chmod +x build.sh

if [ -f "generate-icons.sh" ]; then
    echo -e "${BLUE}🔧 Making icon generation script executable...${NC}"
    chmod +x generate-icons.sh
fi

echo -e "${YELLOW}⚠️  Note: This will install dependencies and build the project.${NC}"
echo -e "${YELLOW}⚠️  Make sure you have Node.js and npm installed.${NC}"
echo ""

read -p "Do you want to continue? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}🚀 Starting build process...${NC}"
    ./build.sh
else
    echo -e "${YELLOW}Build cancelled.${NC}"
    exit 0
fi 