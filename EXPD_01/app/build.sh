#!/bin/bash

set -e

echo "🚀 Starting NexSplit Android Build Process..."
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the app directory."
    exit 1
fi

print_status "Installing Capacitor dependencies..."
npm install --no-package-lock

print_status "Installing core dependencies..."
cd core && npm install --no-package-lock && cd ..

print_status "Building web assets..."
cd core && npm run build && cd ..

print_status "Cleaning previous Android build..."
rm -rf android/app/build

print_status "Syncing Capacitor with Android..."
npx cap sync android

print_status "Generating icons and splash screens..."
npx cap copy android

# Generate custom icons if ImageMagick is available
if command -v convert &> /dev/null; then
    print_status "Generating custom Android icons..."
    chmod +x ./generate-icons.sh
    ./generate-icons.sh
else
    print_warning "ImageMagick not found. Using default Capacitor icons."
    print_status "To generate custom icons, install ImageMagick and run: ./generate-icons.sh"
fi

print_status "Building Android APK..."
cd android 
chmod +x ./gradlew

# Clean and build debug APK
print_status "Cleaning previous build..."
./gradlew clean

print_status "Building debug APK..."
./gradlew assembleDebug

# Check if build was successful
if [ $? -eq 0 ]; then
    print_success "✅ Android build completed successfully!"
    print_status "APK location: android/app/build/outputs/apk/debug/app-debug.apk"
    
    # List the generated APK
    if [ -f "app/build/outputs/apk/debug/app-debug.apk" ]; then
        print_success "APK file size: $(du -h app/build/outputs/apk/debug/app-debug.apk | cut -f1)"
    fi
else
    print_error "❌ Android build failed!"
    exit 1
fi

cd ..

print_success "🎉 Build process completed successfully!"
print_status "You can find your APK in: android/app/build/outputs/apk/debug/" 