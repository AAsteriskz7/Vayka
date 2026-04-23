# Vayka: Final Completion Roadmap (Sprint 2 & Beyond)

This document outlines the comprehensive path to transforming Vayka from a visual mockup into a fully functional, production-ready RAG travel application.

## 1. Project Infrastructure & Global UX
- [x] **1.1 SEO & Metadata:** Implement dynamic `<title>` and `<meta description>` tags for every route in `layout.tsx`.
- [x] **1.2 Global Error Boundary:** Create a custom `error.tsx` in the root `app` directory to handle 500s gracefully.
- [x] **1.3 Loading States:** Implement `loading.tsx` for all major routes using skeleton screens that match the "Organic Editorialism" style.
- [ ] **1.4 Favicon & Manifest:** Ensure `icon.png` and `apple-icon.png` are correctly linked and a `manifest.json` is generated for PWA support.
- [ ] **1.5 Navigation Links:** Connect all "ghost" links in `TopNav` and `SideNav` (Notifications, Settings, Help).
- [ ] **1.6 Footer Polish:** Connect all footer links (Privacy Policy, Terms of Service, About) to real pages or clean modals.
- [ ] **1.7 Smooth Scroll:** Implement smooth scroll behavior across all containers.
- [ ] **1.8 Responsive Audit:** Fix layout breaking on iPad Pro/Tablet widths in the `Compare` table.

## 2. Admin Dashboard (Functional Restoration & Cleanup)
- [ ] **2.1 Tab System Implementation:** Replace the static sidebar links with a state-driven tab system to switch between "System Health", "Knowledge Base", "Usage Analytics", and "Settings".
- [ ] **2.2 Real Data Visualizations:** Replace the fake SVG/CSS bar charts in the "System Health" section with real charts (e.g., using Recharts) driven by the `monitoring` data.
- [ ] **2.3 Missing Settings Tab:** Build the "Settings" view to allow changing app configurations (e.g., Gemini model selection, RAG thresholds, system prompts).
- [ ] **2.4 Analytics Deep-Dive:** Expand the "Usage Analytics" section to include a full-screen table with search, filtering by status code, and detailed payload inspection.
- [ ] **2.5 Functional DB Upload:** Implement the logic for the "Upload DB" button to allow bulk JSON/CSV uploads via the browser.
- [ ] **2.6 Password Protection:** Implement a simple password gate ("admin") for the `/admin` route.
- [ ] **2.7 Admin Profile Cleanup:** Replace the hardcoded profile image and name with dynamic initials or a generic curator avatar.
- [ ] **2.8 Source Confirmation:** Add confirmation modals for destructive actions (Delete Source, Clear Index).

## 3. Core RAG & API Enhancements
- [ ] **3.1 Response Streaming:** Update `/api/chat` to use Vercel AI SDK or native ReadableStream for typewriter-style responses.
- [ ] **3.2 Error Sanitization:** Stop returning raw JSON error objects (429, 503) to the UI; replace with helpful user messages.
- [ ] **3.3 Context Window Management:** Implement a strategy to handle long conversation histories in `/api/chat` (e.g., sliding window or summarization).
- [ ] **3.4 Citation Precision:** Update the RAG prompt to ensure citations `[Source N]` are accurately placed next to the specific facts they support.
- [ ] **3.5 Rate Limit Safeguards:** Implement server-side cooling/retry logic for Gemini API to prevent "429 Resource Exhausted" failures during ingestion.

## 4. Landing Page (Functional Search)
- [ ] **4.1 Active Search Input:** Transform the `textarea` on the landing page into a functional form that redirects to `/search` with the query.
- [ ] **4.2 AI Insights Block:** Make the "Curator's Note" or "Trending" section dynamic by fetching the most-queried destinations from `usage_logs`.
- [ ] **4.3 Smooth Transitions:** Add Framer Motion entrance animations to the hero text ("Where organic meets extraordinary").

## 5. Floating AI Agent (Sitewide FAB)
- [ ] **5.1 FAB Transformation:** Convert the current `/chat` page into a floating action button (FAB) accessible from every page.
- [ ] **5.2 Context Awareness:** Ensure the AI agent "sees" the current page context (e.g., if the user is looking at the Tuscany itinerary, the AI knows it).
- [ ] **5.3 AI-Driven Navigation:** Allow the AI to suggest and trigger navigation to other pages (e.g., "Would you like to compare these three? [Compare Now]").
- [ ] **5.4 Collaborative Editing:** Enable the AI to suggest edits to the active itinerary or destination filters.

## 6. Destinations Page (Real Discovery)
- [ ] **6.1 Dynamic Listing:** Fetch destination cards directly from the `documents` table (distinct sources) rather than hardcoding.
- [ ] **6.2 Functional Filters:** Implement the "Under $2000" and "Tropical" filters to actually query the Supabase metadata.
- [ ] **6.3 Search Bar Logic:** Connect the "Search hidden sanctuaries" input to a debounced vector search.
- [ ] **6.4 LocalStorage Persistence:** Use `localStorage` to save bookmarked destinations.

## 7. Search & Discovery Flow (Functional Results)
- [ ] **7.1 Result Generation:** In `app/search/results/page.tsx`, replace mock results with a real API call filtering by budget, vibe, and region.
- [ ] **7.2 Dynamic Imagery:** Ensure search result images are pulled from metadata or generated via the `generate_image` tool if missing.
- [ ] **7.3 Filter Sync:** Ensure sidebar filters are synced with URL search parameters.

## 8. Comparison Engine (Dynamic)
- [ ] **8.1 Multi-Selection:** Allow users to pick 2-3 destinations from the `/destinations` page or get AI recommendations for comparison.
- [ ] **8.2 Dynamic Matrix:** Populate the table rows (Cost, Safety, Weather) using AI-summarized data from the RAG context.
- [ ] **8.3 AI Verdict:** Update the "Curator's Choice" to be a dynamic LLM summary of why one destination wins for the user's specific query.

## 9. Interactive Itineraries
- [ ] **9.1 Collaborative Planner:** Allow the user and AI to collaboratively build and edit itineraries in real-time.
- [ ] **9.2 Local Storage Persistence:** Save created itineraries to `localStorage` so they survive refreshes.
- [ ] **9.3 Timeline Editing:** Allow the user to drag-and-drop or manually edit activities, with the AI offering suggestions (e.g., "You have a gap on Day 2").
- [ ] **9.4 Export to PDF:** Implement a clean PDF export for the final plan.

## 10. Performance & Polish
- [ ] **10.1 Image Optimization:** Use `next/image` for all images to prevent layout shift and improve LCP.
- [ ] **10.2 Font Loading:** Optimize Google Font loading to prevent FOIT.
- [ ] **10.3 Micro-Animations:** Add subtle hover lifts and glass-blur transitions to all interactive cards.
- [ ] **10.4 Final Cleanup:** Remove console logs, unused imports, and the dev issues badge for the final build.
