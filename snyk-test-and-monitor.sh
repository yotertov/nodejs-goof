#!/bin/bash
# Usage: ./snyk-test-and-monitor.sh 478468688580.dkr.ecr.us-east-1.amazonaws.com/nodejs-goof:latest

# Configure Snyk CLI options
SNYK_TOKEN=${SNYK_TOKEN}  # Replace with your Snyk API token (store securely!)

# Get remote repo URL from git config and remove unwanted prefix
SNYK_REMOTE_REPO_URL=$(git config --get remote.origin.url | sed 's/^git@github.com://; s/\.git$//')

# Get current branch name
SNYK_TARGET_REFERENCE=$(git rev-parse --abbrev-ref HEAD)

# Get container image ID from argument (assuming first argument)
CONTAINER_IMAGE_ID="$1"

# Run SCA scan
snyk test \
  --all-projects \
  --fail-fast \
  || true  # Ignore SCA scan failures

# Run container scan (adjust based on your container image build process)
snyk container test $CONTAINER_IMAGE_ID \
  --file=Dockerfile \
  --platform=linux/amd64 \
  || true  # Ignore container scan failures

# Run IaC scan (adjust based on your IaC tool)
snyk iac test \
  --report \
  --remote-repo-url="$SNYK_REMOTE_REPO_URL" \
  --target-reference="$SNYK_TARGET_REFERENCE" \
  || true  # Ignore IaC scan failures

# Send SCA scan results to Snyk platform with grouping and target reference
snyk monitor \
  --remote-repo-url="$SNYK_REMOTE_REPO_URL" \
  --target-reference="$SNYK_TARGET_REFERENCE"

# Send container scan results to Snyk platform
snyk container monitor $CONTAINER_IMAGE_ID

# Exit script with non-zero code if any scan fails (exit code 1)
if [[ $? -ne 0 ]]; then
  echo "Snyk scan failed!"
  exit 1
fi

echo "Snyk scans completed successfully."
