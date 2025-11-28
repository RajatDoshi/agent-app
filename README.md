Here’s a **concise, clear README** you can use as a starting point for your project:

---

# Agent App

A full-stack project combining **React + TypeScript + Tailwind** frontend, **FastAPI + Agents SDK** backend, and **Supabase** database.
Users can ask questions to an AI agent, get responses, and store/retrieve them in Supabase.

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
│   └── app/db.py
├── .gitignore
└── README.md
```

---

## Setup

### Prerequisites

* Node.js 20+ and npm 9+
* Python 3.11+
* Git
* Supabase account

---

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
```

Create `.env` with:

```
OPENAI_API_KEY=<your_openai_key>
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_anon_key>
```

Run backend:

```bash
uvicorn app.main:app --reload
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open in browser: `http://localhost:5173`

---

### Supabase

1. Create a table `questions`:

| Column     | Type      | Default / Notes                  |
| ---------- | --------- | -------------------------------- |
| id         | uuid      | primary key, `gen_random_uuid()` |
| prompt     | text      |                                  |
| response   | text      |                                  |
| created_at | timestamp | default `now()`                  |

2. Enable RLS. Create insert policy for `anon`:

```sql
CREATE POLICY "Allow anon inserts"
ON public.questions
FOR INSERT
TO anon
USING (auth.role() = 'anon');
```

(Optional) Add select policy for frontend reads:

```sql
CREATE POLICY "Allow anon selects"
ON public.questions
FOR SELECT
TO anon
USING (auth.role() = 'anon');
```

---

## Usage

1. Open frontend → ask a question.
2. Backend agent responds and stores it in Supabase.
3. Retrieve stored questions/responses as needed.

---

## Notes

* Keep `.env` files private.
* For production, consider **service_role key** backend-only for inserts.
* Tailwind styling ensures clean, spaced UI like Google’s design system.

---

If you want, I can make an **even shorter “super minimal README”** that’s only 1-2 screens long for your GitHub, perfect for a quick start.

Do you want me to do that?
