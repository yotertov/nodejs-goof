#!/usr/bin/env bash

IMAGE_NAME=us-east4-docker.pkg.dev/silicon-light-450017-p0/docker-repo/nodejs-goof
IMAGE_TAG=latest

echo "📦 Building and pushing image ${IMAGE_NAME}:${IMAGE_TAG} ..."
docker buildx create --name multiarch --use
PLATFORM=linux/amd64
if [[ $(uname -m) = arm64 ]]; then
  echo "Found arm64! Building arm64 and amd64 images..."
  PLATFORM=linux/arm64,linux/amd64
fi
docker buildx build --push --platform ${PLATFORM} -t ${IMAGE_NAME}:${IMAGE_TAG} .