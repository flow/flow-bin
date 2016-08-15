#!/bin/bash

# Make sure we're at the package root
cd -P "$(dirname "$SOURCE")"

VERSION="$(node -p 'require("./package.json").version')"

# These patterns must also be under "files" in package.json
RELEASES=(
  "flow-linux64-v${VERSION}"
  "flow-osx-v${VERSION}"
  "flow-win64-v${VERSION}"
)

for release in "${RELEASES[@]}"; do
  # Remove versions
  rm -rf "${release/%$VERSION/}"*
  # Download and unzip
  mkdir -p "$release"
  url="https://github.com/facebook/flow/releases/download/v$VERSION/$release.zip"
  curl -L "$url" | tar xz -C "$release" --strip-components=1 -- "flow/flow" "flow/flow.exe"
done

shasum -a 256 flow-*/flow* > SHASUM256.txt
