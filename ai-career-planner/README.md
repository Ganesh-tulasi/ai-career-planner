# AI Career & Study Planner Agent

A full-stack AI application that generates personalized career roadmaps using **Pydantic AI** (Backend) and **Next.js** (Frontend).

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Pydantic AI, Python 3.11+
- **AI Model**: `xiaomi/mimo-v2-flash` via OpenRouter (Free tier)

## Prerequisites
- Node.js 18+
- Python 3.10+
- OpenRouter API Key (Get one at [openrouter.ai](https://openrouter.ai))

## Setup Instructions

### 1. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```

Create a virtual environment and activate it:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up Environment Variables:
- Copy `.env.example` to `.env`
- Add your `OPENROUTER_API_KEY`
- (Optional) `OPENAI_BASE_URL` is set to https://openrouter.ai/api/v1 automatically in code if not present.

Run the server:
```bash
uvicorn main:app --reload --port 8000
```
The API is now running at `http://localhost:8000`.

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

## Deployment

### Frontend (Vercel)
1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Set the Root Directory to `frontend`.
4. Deploy.

### Backend (Render)
1. Create a new Web Service on Render.
2. Connect your GitHub repo.
3. Set Root Directory to `backend`.
4. Set Build Command: `pip install -r requirements.txt`
5. Set Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variable `OPENROUTER_API_KEY`.
