# Use official Android SDK image as base
FROM openjdk:21-jdk-slim

# Set environment variables
ENV ANDROID_HOME=/opt/android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

# Install required packages
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    curl \
    git \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Download and install Android SDK
RUN mkdir -p $ANDROID_HOME/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /tmp/cmdline-tools.zip && \
    unzip -q /tmp/cmdline-tools.zip -d /tmp && \
    mv /tmp/cmdline-tools $ANDROID_HOME/cmdline-tools/latest && \
    rm /tmp/cmdline-tools.zip

# Accept licenses and install required SDK components
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" \
    "platforms;android-35" \
    "build-tools;35.0.0" \
    "cmdline-tools;latest"

# Install Gradle (compatible with Android Gradle Plugin 8.7.2)
RUN wget -q https://services.gradle.org/distributions/gradle-8.7-bin.zip -O /tmp/gradle.zip && \
    unzip -q /tmp/gradle.zip -d /opt && \
    rm /tmp/gradle.zip && \
    ln -s /opt/gradle-8.7/bin/gradle /usr/local/bin/gradle

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY app/package*.json ./
COPY app/core/package*.json ./core/

# Install Node.js dependencies
RUN npm install -g @capacitor/cli && \
    npm install && \
    cd core && npm install && cd ..

# Copy the entire project
COPY app/ .

# Create build script
RUN echo '#!/bin/bash\n\
set -e\n\
echo "Installing Capacitor dependencies..."\n\
npm install --no-package-lock\n\
cd core && npm install --no-package-lock && cd ..\n\
\n\
echo "Building web assets..."\n\
cd core && npm run build && cd ..\n\
\n\
echo "Syncing Capacitor..."\n\
npx cap sync android\n\
\n\
echo "Building Android APK..."\n\
cd android && chmod +x ./gradlew && ./gradlew assembleDebug && cd ..\n\
\n\
echo "Build completed! APK should be in android/app/build/outputs/apk/debug/"\n\
' > /build.sh && chmod +x /build.sh

# Set the default command
CMD ["/app/build.sh"] 