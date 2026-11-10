import re
from pathlib import Path
from typing import Dict, Any, List
import docx

class DocumentParser:
    @staticmethod
    def extract_text_from_pdf(file_path: Path) -> str:
        """Extract text from PDF using pypdf with fitz fallback if installed."""
        text = ""
        try:
            import pypdf
            reader = pypdf.PdfReader(str(file_path))
            for page in reader.pages:
                p_text = page.extract_text()
                if p_text:
                    text += p_text + "\n"
        except Exception:
            try:
                import fitz
                doc = fitz.open(str(file_path))
                for page in doc:
                    text += page.get_text() + "\n"
                doc.close()
            except Exception as e:
                raise RuntimeError(f"Error reading PDF file: {str(e)}")
        return text.strip()

    @staticmethod
    def extract_text_from_docx(file_path: Path) -> str:
        """Extract text from Word .docx file."""
        try:
            doc = docx.Document(str(file_path))
            full_text = []
            for para in doc.paragraphs:
                if para.text.strip():
                    full_text.append(para.text.strip())
            for table in doc.tables:
                for row in table.rows:
                    row_text = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                    if row_text:
                        full_text.append(" | ".join(row_text))
            return "\n".join(full_text)
        except Exception as e:
            raise RuntimeError(f"Error reading DOCX file: {str(e)}")

    @classmethod
    def parse_document(cls, file_path: Path) -> Dict[str, Any]:
        """Main parsing function that extracts raw text, candidate name, sections, and bullets."""
        suffix = file_path.suffix.lower()
        if suffix == ".pdf":
            raw_text = cls.extract_text_from_pdf(file_path)
        elif suffix in [".docx", ".doc"]:
            raw_text = cls.extract_text_from_docx(file_path)
        elif suffix == ".txt":
            raw_text = file_path.read_text(encoding="utf-8", errors="ignore")
        else:
            raise ValueError(f"Unsupported file format: {suffix}")

        parsed_sections = cls.identify_sections(raw_text)
        contact_info = cls.extract_contact_info(raw_text)
        candidate_name = cls.extract_candidate_name(raw_text, contact_info)
        bullet_points = cls.extract_bullet_points(raw_text)
        word_count = len(raw_text.split())

        return {
            "raw_text": raw_text,
            "candidate_name": candidate_name,
            "word_count": word_count,
            "sections": parsed_sections,
            "contact_info": contact_info,
            "bullet_points": bullet_points
        }

    @staticmethod
    def extract_candidate_name(text: str, contact_info: Dict[str, str]) -> str:
        """Extract likely candidate name from header or email."""
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        for line in lines[:5]:
            # Ignore resume headers
            if re.search(r"(resume|curriculum|vitae|page|profile|email|phone)", line, re.I):
                continue
            # If 2 to 4 words with alphabetic chars
            words = line.split()
            if 2 <= len(words) <= 4 and all(re.match(r"^[A-Z][a-zA-Z\.\'-]+$", w) for w in words):
                return line

        # Fallback to email prefix
        if contact_info.get("email"):
            local_part = contact_info["email"].split("@")[0]
            clean_name = re.sub(r"[0-9_\.]+", " ", local_part).title().strip()
            if clean_name:
                return clean_name
        return "Candidate"

    @staticmethod
    def extract_bullet_points(text: str) -> List[str]:
        """Extract all candidate bullet points from work experience & projects."""
        bullets = []
        for line in text.split("\n"):
            line = line.strip()
            # Check for bullet character or dash or number
            if re.match(r"^[\u2022\u2023\u25E6\u2043\u2219\-\*\•]\s*(.+)", line):
                clean_bullet = re.sub(r"^[\u2022\u2023\u25E6\u2043\u2219\-\*\•]\s*", "", line).strip()
                if len(clean_bullet) >= 15:
                    bullets.append(clean_bullet)
            elif re.match(r"^\d+\.\s*(.+)", line):
                clean_bullet = re.sub(r"^\d+\.\s*", "", line).strip()
                if len(clean_bullet) >= 15:
                    bullets.append(clean_bullet)
        return bullets

    @staticmethod
    def identify_sections(text: str) -> Dict[str, bool]:
        """Identifies key resume sections present in text."""
        sections = {
            "contact": bool(re.search(r"(email|phone|linkedin|github|portfolio|contact)", text, re.I)),
            "summary": bool(re.search(r"(summary|objective|about me|profile|overview)", text, re.I)),
            "skills": bool(re.search(r"(skills|technical skills|technologies|competencies|expertise|tools)", text, re.I)),
            "experience": bool(re.search(r"(experience|work history|employment|career history|work)", text, re.I)),
            "projects": bool(re.search(r"(projects|key projects|academic projects|portfolio work)", text, re.I)),
            "education": bool(re.search(r"(education|academic background|qualifications|degrees|university|college)", text, re.I)),
            "certifications": bool(re.search(r"(certifications|credentials|licenses|awards|courses)", text, re.I)),
        }
        return sections

    @staticmethod
    def extract_contact_info(text: str) -> Dict[str, str]:
        email_match = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
        phone_match = re.search(r"(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", text)
        linkedin_match = re.search(r"linkedin\.com/in/([a-zA-Z0-9_-]+)", text, re.I)
        github_match = re.search(r"github\.com/([a-zA-Z0-9_-]+)", text, re.I)

        return {
            "email": email_match.group(0) if email_match else "",
            "phone": phone_match.group(0) if phone_match else "",
            "linkedin": linkedin_match.group(0) if linkedin_match else "",
            "github": github_match.group(0) if github_match else ""
        }
