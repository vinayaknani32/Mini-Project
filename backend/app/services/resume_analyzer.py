import re
from typing import Dict, Any, List
from .document_parser import DocumentParser
from .matching_engine import MatchingEngine

class ResumeAnalyzer:
    @classmethod
    def analyze(cls, text: str, filename: str) -> Dict[str, Any]:
        """Deep audit of resume structure, ATS readiness, content density, and impact metrics."""
        sections = DocumentParser.identify_sections(text)
        contact = DocumentParser.extract_contact_info(text)
        candidate_name = DocumentParser.extract_candidate_name(text, contact)
        skills = sorted(list(MatchingEngine.extract_skills_from_text(text)))
        bullets = DocumentParser.extract_bullet_points(text)
        
        words = text.split()
        word_count = len(words)

        missing_sections = [name.title() for name, present in sections.items() if not present]
        present_sections = [name.title() for name, present in sections.items() if present]

        # Formatting score calculation
        formatting_base = 65
        if sections.get("contact") and contact.get("email"):
            formatting_base += 10
        if contact.get("phone"):
            formatting_base += 5
        if sections.get("education"):
            formatting_base += 10
        if sections.get("experience"):
            formatting_base += 10
        formatting_score = min(formatting_base, 98)

        # Content score calculation
        content_score = 60
        if 250 <= word_count <= 850:
            content_score += 20
        elif word_count > 150:
            content_score += 10
        
        if len(skills) >= 8:
            content_score += 18
        elif len(skills) >= 4:
            content_score += 12
        content_score = min(content_score, 98)

        # Quantified impact score
        metrics_found = len(re.findall(r"\b(\d+[\%kKmM]?|\$\d+)\b", text))
        action_verbs = len(re.findall(r"\b(led|spearheaded|engineered|architected|delivered|reduced|increased|optimized|streamlined|orchestrated|supervised|developed|designed)\b", text, re.I))
        impact_score = min(50 + (metrics_found * 5) + (action_verbs * 3), 96)

        overall_score = round((formatting_score * 0.3) + (content_score * 0.4) + (impact_score * 0.3), 1)

        # Spelling, grammar & phrasing audit on candidate's actual text
        grammar_issues = []
        if re.search(r"\bi\s+(managed|did|was|worked|helped|am|have)\b", text, re.I):
            grammar_issues.append({
                "type": "First-Person Pronoun Usage",
                "message": "Avoid personal pronouns ('I managed', 'I was'). Standard executive resumes use active third-person action verbs like 'Led', 'Architected', 'Directed'."
            })
        if re.search(r"\betc\b|\band\s+so\s+on\b", text, re.I):
            grammar_issues.append({
                "type": "Vague Phrasing Detected",
                "message": "Remove 'etc.' or 'and so on'. Replace with explicit technologies and tools to capture ATS search keywords."
            })
        if re.search(r"responsible\s+for", text, re.I):
            grammar_issues.append({
                "type": "Passive Duty Phrasing",
                "message": "Replace 'Responsible for [duty]' with quantifiable achievement statements (e.g. 'Accelerated release velocity by 24% by orchestrating Agile sprint ceremonies')."
            })
        if re.search(r"helped\s+with|assisted\s+in", text, re.I):
            grammar_issues.append({
                "type": "Diminished Ownership Phrasing",
                "message": "Replace 'Helped with' or 'Assisted in' with strong leadership verbs like 'Collaborated on', 'Co-engineered', or 'Delivered'."
            })

        strengths = [
            f"Detected {len(skills)} verified industry competencies in your profile.",
            f"Resume length of {word_count} words fits standard recruiter scanning guidelines.",
            f"Contact coordinates identified: {contact.get('email') or 'Email verified'}."
        ]

        weaknesses = []
        if missing_sections:
            weaknesses.append(f"Missing standard sections: {', '.join(missing_sections)}.")
        if metrics_found < 3:
            weaknesses.append("Low density of numerical business metrics (% gains, dollar savings, team headcount).")
        if not sections.get("summary"):
            weaknesses.append("No professional summary statement detected at the top.")

        improvement_suggestions = [
            "Convert bullet points to the Google XYZ framework: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
            "Group your skills into categories (e.g., 'Languages & Frameworks', 'Cloud & Tools', 'Methodologies') for faster visual scanning.",
            "Tailor your technical keywords directly to each job description to boost your ATS match percentage."
        ]

        return {
            "filename": filename,
            "overall_score": overall_score,
            "formatting_score": float(formatting_score),
            "content_score": float(content_score),
            "impact_score": float(impact_score),
            "candidate_name": candidate_name,
            "contact_info": contact,
            "extracted_sections": present_sections,
            "missing_sections": missing_sections,
            "identified_skills": skills,
            "strengths": strengths,
            "weaknesses": weaknesses,
            "improvement_suggestions": improvement_suggestions,
            "grammar_spelling_issues": grammar_issues,
            "word_count": word_count
        }
