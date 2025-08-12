FROM node:20-bullseye

# Install Java (needed for Android build)
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip && apt-get clean

# Install Android SDK
ENV ANDROID_SDK_ROOT /opt/android-sdk
RUN mkdir -p ${ANDROID_SDK_ROOT} && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /cmdline-tools.zip && \
    unzip /cmdline-tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    rm /cmdline-tools.zip

# Install required SDK packages
RUN yes | ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools/bin/sdkmanager --licenses
RUN ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0"

# Install Android NDK 25 (downgrade from 27 to fix build errors)
ENV ANDROID_NDK_VERSION=25.2.9519653
RUN wget https://dl.google.com/android/repository/android-ndk-r25b-linux.zip -O /android-ndk.zip && \
    unzip /android-ndk.zip -d ${ANDROID_SDK_ROOT} && \
    rm /android-ndk.zip && \
    mv ${ANDROID_SDK_ROOT}/android-ndk-r25b ${ANDROID_SDK_ROOT}/ndk

# Set environment variables for NDK
ENV ANDROID_NDK_HOME=${ANDROID_SDK_ROOT}/ndk
ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/ndk

# Install Expo CLI
RUN npm install -g expo-cli

# Set workdir
WORKDIR /app

# Default command
CMD ["bash"]
