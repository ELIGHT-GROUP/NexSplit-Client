# Docker Android Build Setup

This setup allows you to build your Capacitor Android app using Docker, ensuring consistent builds across different environments.

## 🚀 Quick Start

### Prerequisites

- Docker Desktop installed and running
- Docker Compose installed
- Your project files in the `app/` directory

### Build Commands

**Option 1: Using the convenience script**

```bash
./build-android.sh
```

**Option 2: Using docker-compose directly**

```bash
# Build the Docker image
docker-compose build

# Run the build process
docker-compose up --build
```

## 📁 Project Structure

```
.
├── Dockerfile                 # Docker image definition
├── docker-compose.yml        # Docker Compose configuration
├── .dockerignore             # Files to exclude from Docker build
├── build-android.sh          # Convenience build script
├── build-output/             # Build artifacts (created after build)
└── app/                      # Your Capacitor project
    ├── core/                 # Web application
    ├── android/              # Android project
    └── capacitor.config.json # Capacitor configuration
```

## 🔧 How It Works

### Docker Image

The Docker image includes:

- **OpenJDK 21** - Java runtime
- **Android SDK 35** - Android development tools
- **Gradle 8.7.2** - Build tool
- **Node.js & npm** - For Capacitor and web dependencies
- **Capacitor CLI** - For syncing and building

### Build Process

1. **Install Dependencies** - npm packages for web app
2. **Build Web Assets** - Compile React/TypeScript to static files
3. **Sync Capacitor** - Update Android project with web assets
4. **Build APK** - Compile Android app using Gradle
5. **Copy Artifacts** - Move APK files to output volume

### Volumes

- **Source Code** - Mounted read-only from host
- **Build Output** - APK files copied to `./build-output/`
- **Gradle Cache** - Speeds up subsequent builds
- **npm Cache** - Speeds up dependency installation

## 📦 Build Outputs

After a successful build, you'll find:

- **Debug APK**: `./build-output/app-debug.apk`
- **Release APK**: `./build-output/app-release.apk` (if configured)
- **Build logs**: Available in Docker container logs

## 🛠️ Customization

### Environment Variables

You can modify the build environment by editing `docker-compose.yml`:

```yaml
environment:
  - GRADLE_OPTS=-Dorg.gradle.daemon=false
  - ANDROID_DEBUG_MODE=true
```

### Build Types

To build different APK types, modify the build script in `Dockerfile`:

```bash
# Debug build (default)
./gradlew assembleDebug

# Release build
./gradlew assembleRelease

# Bundle build
./gradlew bundleRelease
```

### Adding Dependencies

To add new Android dependencies, edit:

- `app/android/app/build.gradle` - App dependencies
- `app/android/build.gradle` - Project dependencies

## 🔍 Troubleshooting

### Common Issues

**1. Docker not running**

```bash
# Start Docker Desktop
# Then run the build script
./build-android.sh
```

**2. Build fails with memory issues**

```bash
# Increase Docker memory limit in Docker Desktop settings
# Or modify GRADLE_OPTS in docker-compose.yml
```

**3. APK not generated**

```bash
# Check build logs
docker-compose logs android-builder

# Verify Android SDK installation
docker-compose run --rm android-builder sdkmanager --list
```

**4. Slow builds**

```bash
# Use cached volumes (already configured)
# Build times improve on subsequent runs
```

### Debug Commands

**Enter the container for debugging:**

```bash
docker-compose run --rm android-builder bash
```

**Check Android SDK installation:**

```bash
docker-compose run --rm android-builder sdkmanager --list
```

**Verify Gradle installation:**

```bash
docker-compose run --rm android-builder gradle --version
```

## 📋 Build Commands Reference

| Command                     | Description                    |
| --------------------------- | ------------------------------ |
| `./build-android.sh`        | Full build process with checks |
| `docker-compose build`      | Build Docker image only        |
| `docker-compose up --build` | Build and run                  |
| `docker-compose down`       | Stop containers                |
| `docker-compose logs`       | View build logs                |

## 🎯 Benefits

- **Consistent Environment** - Same build environment everywhere
- **No Local Setup** - No need to install Android SDK locally
- **Isolated Builds** - Clean environment for each build
- **Caching** - Faster subsequent builds
- **Portable** - Works on any machine with Docker

## 🔄 CI/CD Integration

This setup is perfect for CI/CD pipelines. Example GitHub Actions:

```yaml
name: Build Android APK
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build with Docker
        run: |
          docker-compose build
          docker-compose up --build
      - name: Upload APK
        uses: actions/upload-artifact@v2
        with:
          name: app-debug
          path: build-output/
```

## 📝 Notes

- First build will take longer due to Docker image creation
- Subsequent builds are faster due to caching
- Build artifacts are preserved in Docker volumes
- The setup supports both debug and release builds
- All Android SDK licenses are automatically accepted
