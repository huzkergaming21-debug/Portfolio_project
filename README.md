# Huzker Cybersecurity Portfolio

A local, editable version of the Huzker portfolio. It uses React + Vite for the frontend and Flask + SQLite for the API and admin content store.

## Requirements
- Node.js 18+
- Python 3.10+

## Run locally

### 1. Start the backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
export ADMIN_USERNAME=ACNAVIA
export ADMIN_PASSWORD='set-a-strong-password'
export SECRET_KEY='replace-with-a-long-random-secret'
python app.py
```
The API runs at `http://127.0.0.1:5000`.

### 2. Start the frontend
Open a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Admin dashboard
Click **Admin** in the navigation and sign in with `ADMIN_USERNAME` and `ADMIN_PASSWORD`. The dashboard edits the saved JSON content (profile, About Me details, Quick Facts, projects, skills, experience and contact links). Changes persist in `backend/portfolio.db`.

## Important notes
- The local Flask backend is a portable replacement for the hosted AppDeploy API. It does not contain any production credentials.
- Replace example contact details and review all portfolio text before publishing.
- For production hosting, run Flask behind a production WSGI server and HTTPS; do not expose Flask's development server directly to the internet.
