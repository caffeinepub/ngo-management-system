#!/bin/bash
# Project Source Export Script
# Generates a ZIP archive of the entire project source code

set -e

# Determine script directory and repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$FRONTEND_DIR")"

echo "🚀 Starting project source export..."
echo "Repository root: $REPO_ROOT"

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is required but not found"
    echo "Please install Python 3 to use this export utility"
    exit 1
fi

# Create export directory if it doesn't exist
mkdir -p "$FRONTEND_DIR/export"

# Run the Python export script
cd "$REPO_ROOT"
python3 "$SCRIPT_DIR/export_project.py"

# Check if export was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Export completed successfully!"
    echo "📁 ZIP file location: $FRONTEND_DIR/export/project-source.zip"
    exit 0
else
    echo ""
    echo "❌ Export failed"
    exit 1
fi
