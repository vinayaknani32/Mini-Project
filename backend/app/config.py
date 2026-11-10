import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

class Settings:
    PROJECT_NAME: str = "AI-Powered Career & Productivity Assistant"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    UPLOAD_DIR: Path = UPLOAD_DIR
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/career_assistant.db")
    
    # Gemini API Key (can be set in .env or passed via Settings page in UI)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # File Uploads
    MAX_FILE_SIZE_MB: int = 10
    ALLOWED_EXTENSIONS: set = {".pdf", ".docx", ".txt"}
    
    # CORS
    CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]

settings = Settings()
