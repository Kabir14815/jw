# The House of Garg – FastAPI Backend

## Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python -m seed
```

## Run

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API: http://localhost:8000  
Docs: http://localhost:8000/docs

## First login

- **Admin:** email `admin@garg.com`, password `admin123` (after running `python -m seed`).
- **Customer:** any email + password; first login creates the account.

## Frontend

Set `VITE_API_URL=http://localhost:8000` in `.env` (optional; default is already `http://localhost:8000`). Run the Vite app on port 5173 so CORS allows it.
