#!/bin/bash

set -e

echo "🎨 Generating Android Icons..."
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    print_error "ImageMagick is not installed. Please install it first."
    print_status "On Ubuntu/Debian: sudo apt-get install imagemagick"
    print_status "On macOS: brew install imagemagick"
    print_status "On Windows: Download from https://imagemagick.org/"
    exit 1
fi

# Create icon directories if they don't exist
mkdir -p android/app/src/main/res/mipmap-mdpi
mkdir -p android/app/src/main/res/mipmap-hdpi
mkdir -p android/app/src/main/res/mipmap-xhdpi
mkdir -p android/app/src/main/res/mipmap-xxhdpi
mkdir -p android/app/src/main/res/mipmap-xxxhdpi

# Source icon
SOURCE_ICON="core/public/assets/android-chrome-512x512.png"

if [ ! -f "$SOURCE_ICON" ]; then
    print_error "Source icon not found: $SOURCE_ICON"
    exit 1
fi

print_status "Generating Android icons from: $SOURCE_ICON"

# Generate icons for different densities
print_status "Generating MDPI icons (48x48)..."
convert "$SOURCE_ICON" -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher.png
convert "$SOURCE_ICON" -resize 48x48 android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png

print_status "Generating HDPI icons (72x72)..."
convert "$SOURCE_ICON" -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher.png
convert "$SOURCE_ICON" -resize 72x72 android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png

print_status "Generating XHDPI icons (96x96)..."
convert "$SOURCE_ICON" -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher.png
convert "$SOURCE_ICON" -resize 96x96 android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png

print_status "Generating XXHDPI icons (144x144)..."
convert "$SOURCE_ICON" -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png
convert "$SOURCE_ICON" -resize 144x144 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png

print_status "Generating XXXHDPI icons (192x192)..."
convert "$SOURCE_ICON" -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
convert "$SOURCE_ICON" -resize 192x192 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png

# Generate foreground icons for adaptive icons
print_status "Generating foreground icons for adaptive icons..."

# Create a simple foreground icon (you can customize this)
convert "$SOURCE_ICON" -resize 108x108 android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png
convert "$SOURCE_ICON" -resize 162x162 android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png
convert "$SOURCE_ICON" -resize 216x216 android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png
convert "$SOURCE_ICON" -resize 324x324 android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png
convert "$SOURCE_ICON" -resize 432x432 android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png

print_success "✅ All Android icons generated successfully!"
print_status "Icons are now available in: android/app/src/main/res/mipmap-*/"

# List generated files
echo ""
print_status "Generated icon files:"
find android/app/src/main/res/mipmap-* -name "*.png" | sort 