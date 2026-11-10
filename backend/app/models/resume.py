from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from datetime import datetime
from ..database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_type = Column(String(50), default="pdf")
    file_size_kb = Column(Float, default=0.0)
    
    # Extracted text & parsed data (JSON string or text)
    extracted_text = Column(Text, nullable=False)
    extracted_data_json = Column(Text, nullable=True)
    
    # Overall Resume Quality Metrics
    overall_score = Column(Float, default=75.0)
    formatting_score = Column(Float, default=80.0)
    content_score = Column(Float, default=70.0)
    impact_score = Column(Float, default=72.0)
    
    analysis_result_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

