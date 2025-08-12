FROM node:20-bullseye

# Install Java (needed for Android build)
RUN apt-get update && apt-get install -y openjdk-17-jdk wget unzip && apt-get clean

# Set Android SDK root path
ENV ANDROID_SDK_ROOT /opt/android-sdk

# Install Android SDK command line tools
RUN mkdir -p ${ANDROID_SDK_ROOT} && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip -O /cmdline-tools.zip && \
    unzip /cmdline-tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools && \
    rm /cmdline-tools.zip

# Accept licenses and install required packages, including the exact NDK version needed
RUN yes | ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools/bin/sdkmanager --licenses

RUN ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools/bin/sdkmanager \
    "platform-tools" \
    "platforms;android-34" \
    "build-tools;34.0.0" \
    "ndk;27.0.12077973"

# Set environment variables for NDK and SDK
ENV ANDROID_NDK_HOME=${ANDROID_SDK_ROOT}/ndk/27.0.12077973
ENV PATH=${PATH}:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools/bin

# Install Expo CLI globally
RUN npm install -g expo-cli

# Set working directory inside the container
WORKDIR /app

CMD ["bash"]
