# AI-Powered Career and Productivity Assistant

A modern, high-performance, full-stack AI platform built with **React**, **Vite**, **Tailwind CSS**, and **FastAPI**, integrated with **Google Gemini API**, **Scikit-learn NLP**, and **SQLite**.

Designed specifically to empower students, fresh graduates, and career climbers to accelerate career opportunities, conduct deep ATS resume-to-job matching, prepare for interviews, and manage daily productivity with executive-level polish.

---

## 📸 Key UI / Features Overview

The UI is built according to the modern dark-mode SaaS dashboard design:
- **Hero "At-a-Glance" Section**:
  - Semi-circular speedometer gauge tracking **Match Score (85%)**
  - Instant metadata badges: **Experience (8 Years)**, **Top Skills (Python, Agile, Leadership)**, **Education: Verified (MSc)**
  - Single-click **Annotated PDF Report Download** and **Share Report**
- **Experience Timeline & Sentiments**:
  - Horizontal timeline bands showing tenure (2021, 2022, 2023), annotated gaps, and promotions
- **Sentiment & Tone Radar**:
  - Interactive spider chart tracking *Leadership*, *Technical*, and *Collaborative* tone
- **Skill Gap Heatmap**:
  - Matrix comparison across Tech Core, Agile, Leadership, Data Tools, Cloud Ops, and Soft Skills (Match, Partial Match, Keywords, Missing)
- **AI Feedback Loop (Weak Bullets vs AI Suggested Rewrites)**:
  - Real-time side-by-side comparison with one-click copy to clipboard
- **ATS Compatibility Checklist**:
  - Font Check (Pass/Fail), Header Parsing, Table Detection, Keyword Coverage

---

## 🚀 Core Modules

1. **Module 1: AI Career Guidance**
   - Profile collection (education, skills, interests)
   - Dynamic career pathing and demand forecast
   - Personalized step-by-step milestone learning roadmap
   - Curated courses and technology recommendations

2. **Module 2: AI Resume Quality Analyzer**
   - PDF, DOCX, and TXT parsing via `pypdf` and `python-docx`
   - Section completeness audit & digital coordinate extraction
   - Overall Quality, Formatting, Content Density, and Quantified Impact scores
   - Grammar, passive voice, and phrasing optimization cues

3. **Module 3: Resume vs Job Description Matching (Centerpiece)**
   - Upload resume or paste text side-by-side with target Job Description
   - Scikit-learn TF-IDF vectorization and semantic cosine similarity
   - Skill taxonomy matching (Technical, Soft, Tools, Frameworks)
   - ATS compatibility checks (font safety, header parsing, table layout, keyword coverage)
   - Tailored professional summary generator
   - Exportable matching report

4. **Module 4: AI Interview Preparation**
   - Role-specific technical, behavioral, and HR questions (e.g. Business Marketing, Project Management, Software/AI)
   - STAR methodology guidelines (Situation, Task, Action, Result)
   - Interactive answer evaluator scoring responses and providing actionable strengths and polish suggestions

5. **Module 5: AI Job Role Recommendations**
   - Curated high-match opportunities with real-time salary ranges
   - Category filters (AI/ML, Engineering, Management, Operations)
   - 1-click loading into the Resume-JD Matcher

6. **Module 6: AI Productivity Assistant**
   - Daily task manager with priority tags, deadlines, and categories
   - Automatic focus velocity scoring and completion analytics
   - AI-generated energy-optimized daily schedule
   - Actionable productivity protocols

7. **Module 7: AI Career Chatbot**
   - Real-time conversational coach powered by Google Gemini API
   - Instant quick-prompt starters for resumes, interviews, and deep work

8. **Module 8: System Settings & Profile**
   - Manage Gemini API key safely stored in `.env`
   - Candidate career profile configuration
   - Database telemetry & light/dark mode switcher

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Recharts
- **Backend**: Python 3.13, FastAPI, Uvicorn, SQLAlchemy, Pydantic, Scikit-learn, NumPy
- **Document Processing**: `pypdf`, `python-docx`, `pymupdf`
- **Database**: SQLite (`career_assistant.db`)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`) + Local NLP Heuristics

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 1. Clone & Enter Directory
```bash
cd "mini p"
```

### 2. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
```

Verify your `.env` file in `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=sqlite:///./career_assistant.db
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## ⚡ Execution Instructions

### Option A: 1-Click Launch (Recommended)
Double click `start_all.bat` in the root folder, or execute:
```cmd
start_all.bat
```

### Option B: Run in Separate Terminals

**Terminal 1 (Backend Server):**
```cmd
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API runs on: `http://127.0.0.1:8000`  
Interactive Swagger Docs: `http://127.0.0.1:8000/docs`

**Terminal 2 (Frontend Client):**
```cmd
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🧪 Testing Instructions

1. **Verify Backend Health**:
   - Open `http://127.0.0.1:8000/api/health` in your browser. Expected response: `{"status": "healthy", "timestamp": "ok"}`
2. **Verify Interactive Swagger Docs**:
   - Open `http://127.0.0.1:8000/docs` to test all REST endpoints directly.
3. **Open Frontend Dashboard**:
   - Navigate to `http://localhost:5173`.
   - The **At-a-Glance** dashboard opens immediately with the 85% match score, radial speedometer gauge, timeline, radar chart, skill gap matrix, and AI suggested rewrites.
4. **Test Module 3 (Resume-JD Matcher)**:
   - Click "Job Postings" in the sidebar. Upload any PDF/DOCX or paste resume text and a job description, then click **Analyze Match**.
5. **Test Module 4 (Interview Prep)**:
   - Click "Reports" in the sidebar. Select "Business Marketing", type a response to "What is marketing?", and click **Evaluate My Answer**.
6. **Test Module 7 (AI Chatbot)**:
   - Click "AI Chatbot" in the sidebar. Ask any career question or click a quick prompt pill to receive real-time Gemini guidance.

