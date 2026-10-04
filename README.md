# IPO Hub

## Project Overview

IPO Hub is the foundation for an IPO-management application. It currently provides an IPO CRUD API backed by SQLite and a small browser interface that lists the available IPOs.

## Features

- Create, update, list, and delete IPO records through a FastAPI API.
- Persist IPO records locally with SQLite.
- View available IPOs from the browser at the same local server address.

## Technology Stack

### Backend

- **Python 3.12+**
- **FastAPI**: A modern web framework for building APIs with Python.
- **SQLAlchemy**: ORM for database interactions.
- **Pydantic**: API data validation.
- **Uvicorn**: ASGI server for running the FastAPI application.

### Frontend

- **HTML**: For structuring the web application.
- **CSS**: For styling the application.
- **JavaScript**: For client-side interactions and API calls.

### Database

- **SQLite**: For development and testing.

## Project structure

```
backend/        FastAPI API and SQLite persistence
frontend/       Static interface served by FastAPI
docs/prototype/ Earlier UI prototypes kept as reference only
```

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Create a virtual environment:
   ```
   python -m venv .venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```
     .venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source .venv/bin/activate
     ```
4. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run the FastAPI application:
   ```
   uvicorn app.main:app --reload
   ```

### Frontend

The frontend is served together with the API. Once the backend is running, open `http://127.0.0.1:8000`.

## Docker Setup

To run the application using Docker, ensure you have Docker installed and run the following command in the root directory of the project:

```
docker compose up --build
```

## API

Interactive API documentation is available at `http://127.0.0.1:8000/docs`. The current API is mounted at `/api/ipos/`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
