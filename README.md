Here’s a **super minimal, GitHub-ready README** with all the info needed to clone, run, and deploy, no extra fluff:

---

# Agent App

Full-stack AI agent project with **React + TypeScript + Tailwind** frontend, **FastAPI + Agents SDK** backend, and **Supabase** database.

---

## Tech Stack

* Frontend: React, TypeScript, Vite, Tailwind CSS
* Backend: FastAPI, Agents SDK
* Database: Supabase (PostgreSQL)

---

## Project Structure

```
agents/
├── frontend/
│   ├── src/components/App.tsx
│   ├── main.tsx
│   └── tailwind.config.cjs
├── backend/
│   ├── app/main.py
│   ├── app/api/agent_sdk.py
│   └── requirements.txt
└── README.md
```

---

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
```

Create `.env`:

```
OPENAI_API_KEY=<your_openai_key>
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_anon_key>
```

Run:

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

---

### Supabase

Create table `questions` with:

| Column     | Type      | Default / Notes                  |
| ---------- | --------- | -------------------------------- |
| id         | uuid      | primary key, `gen_random_uuid()` |
| prompt     | text      |                                  |
| response   | text      |                                  |
| created_at | timestamp | default `now()`                  |

Enable RLS and create insert policy for `anon`:

```sql
CREATE POLICY "Allow anon inserts"
ON public.questions
FOR INSERT
TO anon
USING (auth.role() = 'anon');
```

(Optional) Select policy:

```sql
CREATE POLICY "Allow anon selects"
ON public.questions
FOR SELECT
TO anon
USING (auth.role() = 'anon');
```

---

## Hosting

**Frontend (Vercel)**

1. Connect GitHub repo → New Project → Root: `frontend`
2. Framework: Vite, Build: `npm run build`, Output: `dist`
3. Add env var `VITE_API_URL=<backend_url>`
4. Deploy → URL available

**Backend (Render)**

1. Connect GitHub repo → New Web Service → Root: `backend`
2. Build: `pip install -r requirements.txt`
3. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add env vars from `.env`
5. Deploy → URL available

---

This README is **ready to go** — clone, set `.env`, and deploy.

Do you want me to also **add a “one-command setup script”** for both frontend + backend to make starting even faster?
