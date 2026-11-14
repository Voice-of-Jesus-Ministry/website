#!/bin/bash
set -e

echo "Syncing partner assets..."
# Pull latest submodule updates (assumes a submodule is configured)
git submodule update --remote --merge

# Ensure target directory exists
mkdir -p src/partner

# Example: copy assets from the submodule (replace "external-repo" with actual submodule name)
if [ -d "external-repo/assets" ]; then
  cp -r external-repo/assets/* src/partner/
  echo "Assets copied to src/partner/."
else
  echo "No assets directory found in submodule; skipping copy."
fi

echo "Partner sync complete."
