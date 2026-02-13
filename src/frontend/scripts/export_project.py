#!/usr/bin/env python3
"""
Project Source Export Utility
Generates a ZIP archive of the project source code, excluding build artifacts and dependencies.
"""

import os
import zipfile
import sys
from pathlib import Path
from datetime import datetime

# Directories and files to exclude from the ZIP
EXCLUDE_DIRS = {
    'node_modules',
    '.dfx',
    'dist',
    'build',
    '.git',
    '__pycache__',
    '.next',
    'out',
    'target',
    '.cache',
    'coverage',
    '.vscode',
    '.idea',
}

EXCLUDE_FILES = {
    '.DS_Store',
    'Thumbs.db',
    '*.pyc',
    '*.pyo',
    '*.log',
    '.env.local',
    '.env.development.local',
    '.env.test.local',
    '.env.production.local',
}

def should_exclude(path, base_path):
    """Check if a path should be excluded from the ZIP."""
    rel_path = os.path.relpath(path, base_path)
    parts = Path(rel_path).parts
    
    # Check if any part of the path is in exclude dirs
    for part in parts:
        if part in EXCLUDE_DIRS:
            return True
    
    # Check if filename matches exclude patterns
    filename = os.path.basename(path)
    if filename in EXCLUDE_FILES:
        return True
    
    return False

def create_project_zip(repo_root, output_path):
    """Create a ZIP file of the project source."""
    print(f"Creating project source ZIP...")
    print(f"Repository root: {repo_root}")
    print(f"Output path: {output_path}")
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    file_count = 0
    
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(repo_root):
            # Filter out excluded directories
            dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d), repo_root)]
            
            for file in files:
                file_path = os.path.join(root, file)
                
                if should_exclude(file_path, repo_root):
                    continue
                
                # Calculate the archive name (relative path from repo root)
                arcname = os.path.relpath(file_path, repo_root)
                
                try:
                    zipf.write(file_path, arcname)
                    file_count += 1
                    if file_count % 100 == 0:
                        print(f"  Added {file_count} files...")
                except Exception as e:
                    print(f"  Warning: Could not add {arcname}: {e}")
    
    file_size = os.path.getsize(output_path)
    file_size_mb = file_size / (1024 * 1024)
    
    print(f"\n✓ Export complete!")
    print(f"  Files included: {file_count}")
    print(f"  Archive size: {file_size_mb:.2f} MB")
    print(f"  Output location: {output_path}")
    
    return output_path

def main():
    # Determine repository root (parent of frontend directory)
    script_dir = Path(__file__).parent.resolve()
    frontend_dir = script_dir.parent
    repo_root = frontend_dir.parent
    
    # Output path: frontend/export/project-source.zip
    export_dir = frontend_dir / 'export'
    output_path = export_dir / 'project-source.zip'
    
    try:
        result_path = create_project_zip(str(repo_root), str(output_path))
        print(f"\n📦 Project source exported to: {result_path}")
        return 0
    except Exception as e:
        print(f"\n❌ Error creating export: {e}", file=sys.stderr)
        return 1

if __name__ == '__main__':
    sys.exit(main())
