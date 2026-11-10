import os
import json
import re
from typing import Dict, Any, Optional
import google.generativeai as genai
from ..config import settings

class GeminiService:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.GEMINI_API_KEY or os.getenv("GEMINI_API_KEY", "")
        self.client_ready = False
        if self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.client_ready = True
            except Exception as e:
                print(f"[GeminiService] Warning: Failed to configure Gemini API: {e}")

    def update_key(self, api_key: str):
        if api_key:
            self.api_key = api_key
            try:
                genai.configure(api_key=self.api_key)
                self.client_ready = True
            except Exception as e:
                print(f"[GeminiService] Error updating key: {e}")

    async def generate_content_json(self, prompt: str, fallback_generator=None) -> Dict[str, Any]:
        """Calls Gemini with JSON parsing and fallback."""
        if self.client_ready and self.api_key:
            try:
                for model_name in ["gemini-3.8-flash", "gemini-flash-latest"]:
                    try:
                        model = genai.GenerativeModel(
                            model_name,
                            generation_config={"response_mime_type": "application/json"}
                        )
                        response = model.generate_content(prompt)
                        if response and response.text:
                            clean_text = response.text.strip()
                            clean_text = re.sub(r"^```(?:json)?\s*", "", clean_text, flags=re.MULTILINE)
                            clean_text = re.sub(r"```$", "", clean_text, flags=re.MULTILINE).strip()
                            return json.loads(clean_text)
                    except Exception as model_err:
                        print(f"[GeminiService] Tried {model_name}: {model_err}")
            except Exception as e:
                print(f"[GeminiService] API call failed or timed out: {e}. Executing fallback engine.")
        
        # When Gemini is unavailable, use the built-in intelligent fallback generator
        if fallback_generator:
            return fallback_generator()
        return {}

    async def generate_chat_reply(self, message: str, history=None) -> str:
        """Interactive conversational reply."""
        if self.client_ready and self.api_key:
            for model_name in ["gemini-3.8-flash", "gemini-flash-latest"]:
                try:
                    model = genai.GenerativeModel(model_name)
                    system_instruction = (
                        "You are an expert AI Career and Productivity Coach. Provide concise, "
                        "actionable, encouraging, and high-impact advice for resumes, interviews, "
                        "skill roadmaps, and daily workplace productivity."
                    )
                    prompt = f"{system_instruction}\nUser Question: {message}"
                    response = model.generate_content(prompt)
                    if response and response.text:
                        return response.text.strip()
                except Exception as e:
                    print(f"[GeminiService] Chat call error with {model_name}: {e}")

        # Intelligent career fallback responses
        m = message.lower()
        if "resume" in m:
            return (
                "To optimize your resume for ATS and recruiters: 1) Structure your bullets using the Google XYZ formula: "
                "'Accomplished [X] as measured by [Y], by doing [Z]'. 2) Keep standard section titles like 'Work Experience' "
                "and 'Technical Skills'. 3) Mirror keywords directly from the target job posting without stuffing."
            )
        elif "interview" in m:
            return (
                "For high-stakes interviews: 1) Master the STAR technique (Situation, Task, Action, Result) for behavioral questions. "
                "2) Quantify outcomes (e.g. 'reduced latency by 35%'). 3) Research the company's recent engineering blogs or press releases to ask thoughtful closing questions."
            )
        elif "productivity" in m or "time" in m:
            return (
                "Recommended productivity protocol: 1) Plan tomorrow's top 3 non-negotiable tasks before you sign off today. "
                "2) Protect a 90-minute morning deep-work block with notifications silenced. 3) Use the 2-minute rule for quick administrative chores."
            )
        elif "career" in m or "switch" in m or "roadmap" in m:
            return (
                "To accelerate your career trajectory: Focus on building high-visibility portfolio projects that solve concrete business problems, "
                "contribute to open source, and proactively document your learnings on LinkedIn or GitHub."
            )
        else:
            return (
                f"Great question! Focusing on key high-impact deliverables is crucial. Consider breaking this down into three milestones: "
                "1) Core skill mastery and validation, 2) Targeted application tailoring with quantified resume bullets, and 3) Consistent daily deliberate practice."
            )

# Global singleton
gemini_service = GeminiService()

