# Vayka: Task Tracking & Completion Roadmap

This document tracks all required user stories from Project3Instructions.md plus additional polish tasks for a production-ready application.

---

## Sprint 1: Core Setup & Admin (COMPLETE ✅)

All Sprint 1 stories have been implemented and deployed.

- [x] **Story 1:** As an End User, I want to access the chatbot through a hosted web application, so I can interact with it from anywhere.
- [x] **Story 2:** As an End User, I want to ask natural language questions about the selected topic, so I can receive relevant information.
- [x] **Story 5:** As a Developer, I want to define and update the dataset used by the RAG system, so the chatbot's knowledge stays current.
- [x] **Story 10:** As an Administrator, I want to monitor system performance (latency, failures), so the chatbot meets responsiveness requirements.
- [x] **Story 11:** As an Administrator, I want to manually clear or reload the chatbot's knowledge base so I can recover from incorrect or outdated data.
- [x] **Story 12:** As an Administrator, I want to view basic usage logs (e.g., number of queries, timestamps, response times) so I can understand how the chatbot is being used.

---

## Sprint 2: Advanced RAG, Validation, & Custom Features

### Required User Stories (From Project3Instructions.md)

- [x] **Story 3:** As an End User, I want responses to be grounded in the provided dataset, so I can trust their accuracy.
  - Implemented: RAG retrieval in `/api/chat` with vector search via Supabase `match_documents` RPC

- [x] **Story 4:** As an End User, I want to see which documents or sources were used to generate an answer, so I can verify the response.
  - Implemented: Sources returned in API response, displayed in chat UI with source tags

- [x] **Story 6:** As a Developer, I want to ingest data using at least two distinct ingestion methods, so I can build a rich and flexible knowledge base.
  - Implemented: 
    - Method 1: Text ingestion via `/api/ingest` (manual text input)
    - Method 2: CSV file upload via `/api/ingest-csv` (file upload)

- [x] **Story 7:** As a Developer, I want to clean and preprocess data before ingestion, so retrieval results are accurate and relevant.
  - Implemented: `lib/preprocess.ts` with `cleanTextForIngestion()`, `cleanCsvHeader()`, `cleanCsvValue()`

- [x] **Story 8:** As a Developer, I want the system to dynamically select or construct prompts based on the type of user question, so I can control the chatbot's behavior for different intents.
  - Implemented: Intent detection (`factual`, `recommendation`, `itinerary`, `comparison`) with intent-specific prompt instructions in `/api/chat`

- [x] **Story 9:** As a Developer, I want to test response accuracy against known questions, so I can validate system correctness.
  - Implemented: `scripts/test-accuracy.mjs` with test cases in `scripts/accuracy-cases.json`

- [ ] **Story 13 (Custom):** As an End User, I want to discover affordable weekend destinations from my host city so that I can quickly decide where to travel.
  - Status: Destinations page (`/destinations`) is currently a static mockup
  - Needs: 
    - Fetch destinations from `documents` table
    - Implement functional filters (budget, region, vibe)
    - Connect search bar to vector search

- [ ] **Story 14 (Custom):** As an End User, I want a simple weekend itinerary for a destination so that I can maximize my time without spending hours researching.
  - Status: Itineraries page (`/itineraries`) is currently a static mockup
  - Needs:
    - AI-generated itineraries based on destination
    - LocalStorage persistence for saved itineraries
    - Integration with chat for collaborative planning

---

## Additional Polish Tasks (Beyond Requirements)

These tasks improve the user experience but are not required for project completion.

### 1. Project Infrastructure & Global UX
- [x] **1.1 SEO & Metadata:** Implement dynamic `<title>` and `<meta description>` tags for every route in `layout.tsx`.
- [x] **1.2 Global Error Boundary:** Create a custom `error.tsx` in the root `app` directory to handle 500s gracefully.
- [x] **1.3 Loading States:** Implement `loading.tsx` for all major routes using skeleton screens.
- [ ] **1.4 Favicon & Manifest:** Ensure `icon.png` and `apple-icon.png` are correctly linked and a `manifest.json` is generated for PWA support.
- [ ] **1.5 Navigation Links:** Connect all "ghost" links in `TopNav` and `SideNav` (Notifications, Settings, Help).
- [ ] **1.6 Footer Polish:** Connect all footer links (Privacy Policy, Terms of Service, About) to real pages or clean modals.
- [x] **1.7 Smooth Scroll:** Implement smooth scroll behavior via `scroll-smooth` on `<html>`.
- [ ] **1.8 Responsive Audit:** Fix layout breaking on iPad Pro/Tablet widths in the `Compare` table.

### 2. Admin Dashboard Enhancements
- [x] **2.1 Tab System Implementation:** State-driven tab system for "System Health", "Knowledge Base", "Usage Analytics", and "Settings".
- [x] **2.2 Real Data Visualizations:** Real charts (Recharts) driven by monitoring data.
- [x] **2.3 Settings Tab:** Allow changing app configurations (Gemini model selection, RAG thresholds, system prompts).
- [x] **2.4 Analytics Deep-Dive:** Full-screen table with search, filtering by status code, and payload inspection.
- [x] **2.5 Functional DB Upload:** Bulk JSON/CSV uploads via browser.
- [x] **2.6 Password Protection:** Simple password gate ("admin") for the `/admin` route via HTTP Basic Auth in `middleware.ts`.
- [x] **2.7 Admin Profile Cleanup:** Dynamic initials or generic curator avatar.
- [x] **2.8 Source Confirmation:** Confirmation modals (styled `<dialog>`) for destructive actions (Delete Source, Clear Index).

### 3. Core RAG & API Enhancements
- [ ] **3.1 Response Streaming:** Update `/api/chat` to use Vercel AI SDK or native ReadableStream for typewriter-style responses.
- [x] **3.2 Error Sanitization:** Replace raw JSON error objects (429, 503) with helpful user messages.
- [ ] **3.3 Context Window Management:** Handle long conversation histories (sliding window or summarization).
- [x] **3.4 Citation Precision:** Ensure citations `[Source N]` are accurately placed next to specific facts they support.
- [ ] **3.5 Rate Limit Safeguards:** Server-side cooling/retry logic for Gemini API to prevent "429 Resource Exhausted" failures.

### 4. Landing Page Enhancements
- [x] **4.1 Active Search Input:** Transform textarea into functional form that redirects to `/search/results` with query via `HeroSearchForm` component.
- [ ] **4.2 AI Insights Block:** Make "Curator's Note" dynamic by fetching most-queried destinations from `usage_logs`.
- [ ] **4.3 Smooth Transitions:** Add Framer Motion entrance animations to hero text.

### 5. Destinations Page Enhancements
- [ ] **5.1 Dynamic Listing:** Fetch destination cards from `documents` table (distinct sources).
- [ ] **5.2 Functional Filters:** Implement "Under $2000" and "Tropical" filters to query Supabase metadata.
- [ ] **5.3 Search Bar Logic:** Connect "Search hidden sanctuaries" to debounced vector search.
- [ ] **5.4 LocalStorage Persistence:** Save bookmarked destinations.

### 6. Search & Discovery Enhancements
- [x] **6.1 Result Generation:** Replace mock results in `/search/results` with real API call — reads `?q=` param, queries RAG, shows AI summary + matched sources.
- [ ] **6.2 Dynamic Imagery:** Pull images from metadata or generate if missing.
- [x] **6.3 Filter Sync:** Search form (`SearchForm` component) builds query from budget, vibe, type selections and passes to results via URL params.

### 7. Itinerary Enhancements
- [ ] **7.1 Collaborative Planner:** User and AI collaboratively build/edit itineraries in real-time.
- [ ] **7.2 Local Storage Persistence:** Save itineraries to `localStorage`.
- [ ] **7.3 Timeline Editing:** Drag-and-drop or manual edit with AI suggestions.
- [ ] **7.4 Export to PDF:** Clean PDF export for final plan.

### 8. Performance & Polish
- [ ] **8.1 Image Optimization:** Use `next/image` for all images to prevent layout shift and improve LCP.
- [ ] **8.2 Font Loading:** Optimize Google Font loading to prevent FOIT.
- [ ] **8.3 Micro-Animations:** Add subtle hover lifts and glass-blur transitions to interactive cards.
- [ ] **8.4 Final Cleanup:** Remove console logs, unused imports, and dev issues badge.

---

## Summary

| Category | Total | Complete | Remaining |
|----------|-------|----------|-----------|
| Sprint 1 Stories | 6 | 6 | 0 |
| Sprint 2 Required Stories | 8 | 6 | 2 |
| Additional Polish Tasks | 28 | 18 | 10 |

**Priority for Sprint 2 Completion:**
1. Story 13 - Discover affordable weekend destinations
2. Story 14 - Simple weekend itinerary generator
