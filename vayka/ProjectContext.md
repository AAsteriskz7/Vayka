# Agent Context: Vayka (Travel AI RAG System)

## 1. Project Overview
Vayka is a RAG-based (Retrieval-Augmented Generation) chatbot hosted via a web application. Its primary domain is travel, designed to help users synthesize scattered travel data, policies, and itineraries. The system is built using Next.js, and it features a full RAG pipeline (data ingestion, cleaning, vector retrieval, and dynamic prompting).

## 2. End User Personas
The system is designed around two distinct travel personas:
* **The Group Trip Coordinator:** A user planning a complex holiday weekend trip for a large group of 17 college students. They need the AI to synthesize data to find group-friendly activities, navigate logistics, and build coherent itineraries.
* **The Layover Maximizer:** A traveler navigating tight timeframes, such as a 10-hour international layover. They need the AI to pull precise transit times, verify visa requirements, and build a highly optimized schedule to visit specific landmarks (e.g., a distant monastery or large statue) without missing their connection.

## 3. Architecture & Tech Stack Details
* **Tech Stack:** Next.js
* **RAG Pipeline Requirements:**
    * Must support at least two distinct ingestion methods (e.g., API-based travel data scraping + PDF policy uploads).
    * Must include data cleaning/preprocessing before ingestion.
    * Must feature dynamic prompt construction determined programmatically at runtime based on user intent (factual lookup vs. creative itinerary generation).
* **Roles:** End User (Traveler), Developer (System Builder), Administrator (System Monitor).

## 4. User Stories & Sprint Tracking

### Sprint 1 (Core Setup & Admin)
* **[Story 1]** As an End User, I want to access the chatbot through a hosted web application, so I can interact with it from anywhere.
* **[Story 2]** As an End User, I want to ask natural language questions about the selected topic, so I can receive relevant information.
* **[Story 5]** As a Developer, I want to define and update the dataset used by the RAG system, so the chatbot's knowledge stays current.
* **[Story 10]** As an Administrator, I want to monitor system performance (latency, failures), so the chatbot meets responsiveness requirements.
* **[Story 11]** As an Administrator, I want to manually clear or reload the chatbot's knowledge base so I can recover from incorrect or outdated data.
* **[Story 12]** As an Administrator, I want to view basic usage logs (e.g., number of queries, timestamps, response times) so I can understand how the chatbot is being used.

### Sprint 2 (Advanced RAG, Validation, & Custom Features)
* **[Story 3]** As an End User, I want responses to be grounded in the provided dataset, so I can trust their accuracy.
* **[Story 4]** As an End User, I want to see which documents or sources were used to generate an answer, so I can verify the response.
* **[Story 6]** As a Developer, I want to ingest data using at least two distinct ingestion methods (e.g., API-based ingestion, document scraping, or direct text/file uploads), so I can build a rich and flexible knowledge base.
* **[Story 7]** As a Developer, I want to clean and preprocess data before ingestion, so retrieval results are accurate and relevant.
* **[Story 8]** As a Developer, I want the system to dynamically select or construct prompts based on the type of user question, so I can control the chatbot's behavior for different intents (e.g., factual lookup vs. explanation vs. creative response).
* **[Story 9]** As a Developer, I want to test response accuracy against known questions, so I can validate system correctness.
* **[Custom Story 13]** As an End User coordinating a group, I want to filter my itinerary queries by party size, so the chatbot only recommends activities and dining venues capable of accommodating large groups.
* **[Custom Story 14]** As an End User with a tight schedule, I want to input my exact layover duration and target landmark, so the chatbot can calculate transit times and determine the logistical feasibility of the excursion.