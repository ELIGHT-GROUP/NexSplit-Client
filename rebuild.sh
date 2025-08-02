#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🧹 Cleaning up Docker resources...${NC}"

# Stop and remove containers
echo -e "${YELLOW}Stopping containers...${NC}"
docker-compose down

# Remove volumes
echo -e "${YELLOW}Removing volumes...${NC}"
docker-compose down -v

# Remove images
echo -e "${YELLOW}Removing images...${NC}"
docker-compose down --rmi all

# Clean up any dangling images
echo -e "${YELLOW}Cleaning up dangling images...${NC}"
docker image prune -f

# Clean up any dangling volumes
echo -e "${YELLOW}Cleaning up dangling volumes...${NC}"
docker volume prune -f

echo -e "${GREEN}✅ Cleanup completed!${NC}"

# Rebuild without cache
echo -e "${GREEN}🔨 Rebuilding without cache...${NC}"
docker-compose build --no-cache

# Run the build
echo -e "${GREEN}🚀 Running build...${NC}"
docker-compose up --build

echo -e "${GREEN}🎉 Rebuild completed!${NC}" 