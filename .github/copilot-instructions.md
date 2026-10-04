# IPO Hub workspace instructions

Work only from the repository root, `E:\IPO Hub`. This is a single FastAPI and static-frontend project:

- `backend/` contains the FastAPI API.
- `frontend/` contains the browser UI served by FastAPI.
- `docs/prototype/` is reference-only.

Never create a nested `IPO-Hub/` directory, duplicate backend/frontend trees, or empty `frontend/public/` copies. Preserve other tools' existing changes: check `git status` before editing, edit only the canonical paths, and do not overwrite unrelated work. Do not add `.venv`, `.env`, SQLite database files, or caches to Git.
