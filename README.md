# Kritikos AI (DocuDecide-AI)

Kritikos AI is an end-to-end human-in-the-loop AI decisioning system for document-driven workflows such as insurance claims, underwriting, fraud review, and compliance checks.

The system demonstrates how AI assists human decision-makers rather than replacing them — a pattern commonly used in high-stakes, real-world platforms.

---
## 🌐 Live Demo

Experience the Kritikos AI UI flow without running the code locally:

👉 https://your-netlify-app.netlify.app
---


## 🚀 What the System Does

1. Customers upload documents (PDFs)
2. AI extracts structured data and computes a risk score
3. A unique reference ID is generated per submission
4. All outputs are persisted in a database
5. Investigators retrieve claims using the reference ID
6. Investigators review AI output (risk score + explanation)
7. Investigators can approve, reject, or override the AI decision
8. Final decisions are stored and auditable

---

## 🧠 Why This Matters

Most AI demos stop at model output.

Real-world systems require:
- traceability
- human oversight
- explainability
- persistence
- workflow handoffs across roles

Kritikos-AI focuses on end-to-end system design, not just AI scoring logic.

---

## 🏗️ Architecture Overview

Customer  
↓  
FastAPI Backend  
↓  
AI Scoring Engine  
↓  
SQLite (decisions table)  
↓  
Investigator Review & Override  

### Key Design Choices
- Reference ID acts as the single contract between Customer and Investigator
- AI recommendations are advisory, not final
- Humans retain decision authority
- All decisions and overrides are persisted

---

## 🛠️ Tech Stack

- Backend: FastAPI (Python)
- Database: SQLite (local persistence)
- AI Logic: Rule-based, configurable scoring engine
- Frontend:
  - Customer UI (document upload)
  - Investigator UI (claim review & decision)
- Version Control: Git + GitHub

---

## 📦 Core API Endpoints

### Submit a Claim (Customer)
POST /submit-claim/

- Uploads documents
- Triggers AI scoring
- Returns a reference_id

---

### Fetch a Claim (Investigator)
GET /claims/{reference_id}

- Retrieves claim details
- Includes AI risk score, explanation, and status

---

### Investigator Decision
POST /claims/{reference_id}/decision

- Approve, reject, or override AI decision
- Add investigator comments and escalation details

---

## ✅ End-to-End Flow (Verified)

- Customer upload → AI scoring → database persistence → investigator review → human override
- Fully tested locally using curl and UI flows
- Backend hardened against schema drift and file-path issues

---

## 🔐 Notes on Scope

- Authentication and role-based access are intentionally out of scope
- Focus is on decision workflow correctness, not production hardening
- Designed as a portfolio-quality system prototype

---

## 📈 Potential Extensions

- Authentication and role-based access
- Investigator dashboard with claim listing
- Decision audit trail with timestamps
- ML-based scoring models
- Cloud-hosted database integration

---

## 🧑‍💻 Author

Built by Sai Anurag Balijepalli  
GitHub: https://github.com/AiPM-Anurag

---

## 📄 License

This project is intended for learning, demonstration, and portfolio purposes.
