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
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

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

# Install Gradle
RUN wget -q https://services.gradle.org/distributions/gradle-8.7.2-bin.zip -O /tmp/gradle.zip && \
    unzip -q /tmp/gradle.zip -d /opt && \
    rm /tmp/gradle.zip && \
    ln -s /opt/gradle-8.7.2/bin/gradle /usr/local/bin/gradle

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY app/package*.json ./
COPY app/core/package*.json ./core/

# Install Node.js dependencies
RUN npm install -g @capacitor/cli && \
    cd core && npm install && cd ..

# Copy the entire project
COPY . .

# Create build script
RUN echo '#!/bin/bash\n\
echo "Installing Capacitor dependencies..."\n\
cd core && npm install && cd ..\n\
\n\
echo "Building web assets..."\n\
cd core && npm run build && cd ..\n\
\n\
echo "Syncing Capacitor..."\n\
npx cap sync android\n\
\n\
echo "Building Android APK..."\n\
cd android && ./gradlew assembleDebug && cd ..\n\
\n\
echo "Build completed! APK should be in android/app/build/outputs/apk/debug/"\n\
' > /app/build.sh && chmod +x /app/build.sh

# Set the default command
CMD ["/app/build.sh"] 