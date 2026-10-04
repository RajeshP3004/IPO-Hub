# Shared workspace rules

This repository is the single source of truth for the IPO Hub application. All IDEs and coding agents must work directly in this repository root, `E:\IPO Hub`.

## Canonical layout

```text
backend/       FastAPI application and its local runtime files
frontend/      Static browser application served by FastAPI
docs/          Reference material and prototypes only
```

Do not create a nested `IPO-Hub/`, duplicate `backend/`, `frontend/public/`, or other copied project tree. The prototype at `docs/prototype/ipo_hub_prototype.html` is reference material only and must not become the running application.

## Collaboration rules

- Before editing, inspect `git status` and preserve unrelated changes already made by another tool or person.
- Make changes in the canonical paths above; never work from a copied folder.
- Do not commit runtime artifacts: `backend/.venv/`, SQLite databases, `.env`, Python caches, or editor-specific files.
- After a change, run a relevant check and review `git diff` before handing off.
- Keep frontend API requests compatible with the FastAPI routes in `backend/app/api/routes.py`.

## Running locally

Start the application from `backend/` with `uvicorn app.main:app --reload`. The backend serves the `frontend/` directory at the root URL.
