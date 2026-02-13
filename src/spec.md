# Specification

## Summary
**Goal:** Provide a single, repository-level command to export the full project source (frontend + backend) as a deterministic ZIP archive.

**Planned changes:**
- Add a documented one-command export workflow (e.g., npm script and/or shell script) that generates a ZIP of the project source code.
- Configure the export to include frontend and backend source directories plus required configuration files to rebuild the project.
- Ensure the ZIP excludes dependency and build artifact folders (at minimum: node_modules/, .dfx/, dist/build outputs, and .git/ if present).
- Make the output ZIP filename and output location deterministic and print the output path on completion.

**User-visible outcome:** The user can run a single command from the repo to generate a ZIP file containing the complete project source code (without dependencies/build artifacts), and see where it was saved.
