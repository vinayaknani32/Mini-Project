import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import settings
from .database import init_db, SessionLocal
from .api.router import api_router
from .services.productivity_service import ProductivityService

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Modern AI-Powered Career and Productivity Assistant Backend with ATS Matching & Gemini Integration"
)

# CORS middleware for seamless React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()
    db = SessionLocal()
    try:
        ProductivityService.seed_initial_tasks(db)
    finally:
        db.close()

# Include all API routes
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "api_docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "timestamp": "ok"}

