# Vayka

Vayka is a travel-focused chatbot built with Next.js. The long-term goal is a RAG system for travel planning, but the current repo is focused on Sprint 1: core app setup, chatbot access, admin tooling, and basic dataset management.

## Sprint 1 Scope

This repo currently supports:

- A hosted-style web app built with Next.js
- A chat experience for natural-language questions
- An admin page for knowledge-base management
- A text ingestion flow that stores chunks and embeddings in Supabase
- Basic Supabase connectivity testing

Planned later work includes full retrieval grounding, citations, more ingestion methods, and more advanced RAG behavior.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Supabase
- Gemini API for chat responses
- Gemini embeddings

## Requirements

Before running the project, make sure you have:

- Node.js 20 or newer
- npm
- A Supabase project
- A Gemini API key

## Environment Setup

1. Copy [.env.example] to `.env.local`.
2. Fill in the real values for your accounts and project.
3. Restart the dev server any time you change `.env.local`.

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `GEMINI_CHAT_MODEL`
- `GEMINI_EMBEDDING_MODEL`

Example:

```bash
cp .env.example .env.local
```

If you are on Windows PowerShell, create `.env.local` manually or copy the file in File Explorer.

## Install And Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Important Routes

- `/` - landing page
- `/chat` - chatbot UI
- `/admin` - admin dashboard and knowledge base manager
- `/api/chat` - chat API route
- `/api/ingest` - ingestion API route
- `/api/test-supabase` - simple Supabase connection check
- `/api/list-models` - Gemini model listing utility

## First-Time Setup Checklist

Use this order on a fresh machine:

1. Pull the repo.
2. Create `.env.local` from `.env.example`.
3. Add the real Supabase and Gemini keys.
4. Run `npm install`.
5. Run `npm run dev`.
6. Visit `/api/test-supabase` in the browser to confirm Supabase is connected.
7. Open `/admin` and test ingestion with a short text sample.
8. Check Supabase to confirm the data was written.

## Supabase Expectations

This project expects Supabase to store:

- Document chunks in a `documents` table
- Embedding vectors in an `embeddings` table
- Persistent request history in a `usage_logs` table

The ingestion flow:

1. Takes source text
2. Splits it into chunks
3. Creates an embedding for each chunk
4. Inserts the chunk into `documents`
5. Inserts the vector into `embeddings`

If embeddings fail with a dimension mismatch, make sure your Supabase vector column matches the configured embedding model. The current default embedding model is `gemini-embedding-2-preview`, which is configured for 768-dimensional embeddings.

## How To Use The Project

### Chat

1. Open `/chat`.
2. Enter a question in natural language.
3. The frontend sends the request to `/api/chat`.
4. The backend forwards the prompt to Gemini and returns the response.

Important note: the current chat route is not yet doing full RAG retrieval. Sprint 1 is focused on getting the chat experience and admin workflows working.

### Ingest New Data

1. Open `/admin`.
2. In the "Knowledge Base" section, open the "Add Source" form.
3. Enter:
   - a source name
   - a source type
   - an optional description
   - the text content to ingest
4. Submit the form.
5. The app posts to `/api/ingest`.
6. The backend chunks the text, creates embeddings, and stores the results in Supabase.

Right now, the admin ingestion UI is best suited for pasted text. The interface mentions PDF, CSV, and API source types, but the current implemented ingestion path is plain text content submitted through the form.

## How To Verify Ingestion Worked

### Option 1: Supabase Dashboard

Open your Supabase project and check:

- `documents`
- `embeddings`

You should see new rows after a successful ingestion.

### Option 2: Supabase SQL Editor

Run:

```sql
select id, source, left(content, 120) as preview, created_at
from documents
order by created_at desc
limit 10;
```

```sql
select document_id, created_at
from embeddings
order by created_at desc
limit 10;
```

For persistent admin usage logs, run the SQL in [supabase/usage_logs.sql](/Users/asumi/Desktop/local_school/CS2340/Vayka/supabase/usage_logs.sql#L1) inside the Supabase SQL Editor.

## API Notes

### `POST /api/chat`

Request body:

```json
{
  "message": "What should I do in Brussels for a weekend?"
}
```

### `POST /api/ingest`

Request body:

```json
{
  "source": "Brussels Guide",
  "content": "Paste the travel content here.",
  "metadata": {
    "type": "Text",
    "description": "Optional notes"
  }
}
```

## Troubleshooting

### Missing environment variables

If the app says Supabase or Gemini is not configured:

- confirm `.env.local` exists
- confirm the variable names match exactly
- restart `npm run dev`

### Gemini embedding errors

If ingestion fails during embedding:

- confirm `GEMINI_API_KEY` is valid
- confirm `GEMINI_EMBEDDING_MODEL` is set
- confirm the model and your Supabase vector dimension match

The current default model is:

```text
gemini-embedding-2-preview
```

### Supabase insert errors

If chat works but ingestion fails:

- confirm the required tables exist
- confirm Row Level Security policies allow the inserts you need
- confirm the embedding vector column dimension matches the selected model

### Linting

Run:

```bash
npm run lint
```

At the moment, the repository has some existing lint issues in files outside the core embedding setup. If lint fails, review the output before assuming your latest change caused it.

## Project Context

See:

- [ProjectContext.md](/Users/asumi/Desktop/local_school/CS2340/Vayka/ProjectContext.md)
- [Design.md](/Users/asumi/Desktop/local_school/CS2340/Vayka/Design.md)

These documents describe the sprint goals, user stories, personas, and design direction for Vayka.
