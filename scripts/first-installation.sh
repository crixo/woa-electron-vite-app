#!/bin/bash

# Be sure to make the script executable by running chmod +x script.sh.

# Ask for version number
read -p "Enter WOA version number (e.g. 1.0.10): " VERSION

# Define paths and filenames
ZIP_NAME="WOA-${VERSION}-arm64-mac.zip"
DOWNLOAD_URL="https://github.com/crixo/woa-electron-vite-app/releases/download/v${VERSION}/${ZIP_NAME}"
DOWNLOAD_DIR="$HOME/Downloads"
DEST_DIR="$HOME/Applications"
APP_NAME="WOA.app"
APP_PATH="${DEST_DIR}/${APP_NAME}"

echo "Downloading WOA version ${VERSION} to ${DOWNLOAD_DIR}..."
curl -L -o "${DOWNLOAD_DIR}/${ZIP_NAME}" "${DOWNLOAD_URL}"

echo "Unzipping the package..."
unzip -q "${DOWNLOAD_DIR}/${ZIP_NAME}" -d "${DOWNLOAD_DIR}"

echo "Moving ${APP_NAME} to ${DEST_DIR}..."
mv "${DOWNLOAD_DIR}/${APP_NAME}" "${DEST_DIR}"

echo "Removing quarantine and enabling app permissions..."
sudo xattr -rd com.apple.quarantine "${APP_PATH}"
sudo spctl --add --label "WOA" "${APP_PATH}"
sudo spctl --enable --label "WOA"

echo "Launching WOA..."
open "${APP_PATH}"

echo "All done 🥳"
