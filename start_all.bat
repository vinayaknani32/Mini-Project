@echo off
echo Starting AI-Powered Career and Productivity Assistant...
start "Career Assistant - FastAPI Backend" cmd /k "cd backend && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 3 /nobreak >nul
start "Career Assistant - React Frontend" cmd /k "cd frontend && npm run dev"
echo Application launched!
echo Frontend: http://localhost:5173
echo Backend API & Swagger Docs: http://127.0.0.1:8000/docs

