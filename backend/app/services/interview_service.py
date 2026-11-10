from typing import List, Dict, Any, Optional
from .gemini_service import gemini_service

class InterviewService:
    @classmethod
    async def generate_questions(cls, role_title: str, experience_level: str = "Mid-Level") -> List[Dict[str, Any]]:
        """Generates realistic interview questions tailored to the specified role."""
        role_lower = role_title.lower()

        if "marketing" in role_lower:
            return [
                {
                    "id": 1,
                    "type": "HR / Behavioral",
                    "question": "Tell me about yourself and why you are interested in a marketing career with our company.",
                    "sample_answer": "I am a strategic marketing professional passionate about data-driven audience growth. Over the past 3 years, I spearheaded omnichannel campaigns that scaled conversion rates by 28%. I am drawn to your company because of your customer-centric approach to market expansion.",
                    "tips": "Structure using Present, Past, and Future. Keep response under 2 minutes."
                },
                {
                    "id": 2,
                    "type": "Technical / Domain",
                    "question": "What is marketing, and how do you differentiate sales from marketing in practical execution?",
                    "sample_answer": "Marketing focuses on understanding market needs, building brand awareness, and generating qualified leads at scale. Sales focuses on directly closing those qualified prospects into paying relationships. Marketing builds the pipeline; sales converts the deal.",
                    "tips": "Highlight the funnel connection between demand generation and pipeline closing."
                },
                {
                    "id": 3,
                    "type": "Technical / Framework",
                    "question": "Explain the 4Ps of marketing and how you have applied them to launch or optimize a campaign.",
                    "sample_answer": "The 4Ps are Product, Price, Place, and Promotion. In my last campaign, we identified an underserved segment (Place), recalibrated tier packaging (Price), introduced self-serve onboarding features (Product), and deployed targeted LinkedIn and search ads (Promotion), resulting in a 40% uptick in trial signups.",
                    "tips": "Tie theoretical frameworks directly to concrete business outcomes."
                },
                {
                    "id": 4,
                    "type": "Behavioral / Strategy",
                    "question": "How do you convince a skeptical customer or stakeholder to adopt a newly launched product?",
                    "sample_answer": "I focus on customer pain points rather than features. I present social proof, quantified case studies, and offer low-friction pilot trials to eliminate risk. Listening actively to their specific objections allows tailored objection handling.",
                    "tips": "Emphasize active listening, empathy, and data-backed validation."
                },
                {
                    "id": 5,
                    "type": "Analytics / Metrics",
                    "question": "What key metrics and KPIs do you track to evaluate campaign performance and return on ad spend (ROAS)?",
                    "sample_answer": "I prioritize Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), Click-Through Rate (CTR), Conversion Rate (CVR), and ROAS. I maintain real-time attribution dashboards to rapidly reallocate budget toward top-performing channels.",
                    "tips": "Show comfort with attribution models, CAC:LTV ratio, and data dashboards."
                }
            ]
        elif "project manager" in role_lower or "management" in role_lower:
            return [
                {
                    "id": 1,
                    "type": "Behavioral",
                    "question": "How do you handle scope creep and conflicting priorities between stakeholders and engineering teams?",
                    "sample_answer": "I establish a transparent backlog grooming ceremony and maintain a rigorous Change Request protocol. When new requests arrive, I visualize trade-offs using an Impact vs Effort matrix and consult stakeholders to reprioritize deliverables without burning out the team.",
                    "tips": "Highlight diplomacy, transparent data visualization, and protective leadership."
                },
                {
                    "id": 2,
                    "type": "Technical / Methodology",
                    "question": "Describe your experience managing Agile sprint ceremonies and ensuring continuous delivery.",
                    "sample_answer": "I lead 2-week sprint cycles using Jira, facilitating sprint planning, daily standups, and retrospectives. By establishing clear Definition of Ready (DoR) and Definition of Done (DoD), our team maintained a 94% sprint commitment completion rate.",
                    "tips": "Mention concrete metrics like velocity, burndown, and retrospective action items."
                },
                {
                    "id": 3,
                    "type": "Crisis Management",
                    "question": "Tell me about a critical project deadline that was in jeopardy and how you turned it around.",
                    "sample_answer": "Three weeks before launch, a third-party API integration failed compatibility tests. I organized an emergency triage session, descoped non-essential secondary features with product leadership, and focused our top engineers on a custom fallback handler. We launched on schedule with 99.9% uptime.",
                    "tips": "Use the STAR method: Situation, Task, Action, Result."
                }
            ]
        else:
            # Software / AI Engineer defaults
            return [
                {
                    "id": 1,
                    "type": "Technical / Architecture",
                    "question": "How do you design a low-latency, scalable REST API service when handling high concurrent traffic?",
                    "sample_answer": "I use an asynchronous framework like FastAPI with Uvicorn, implement Redis caching for frequent read endpoints, optimize database indexes, and use connection pooling. For heavy compute jobs, I offload tasks asynchronously via background workers (like Celery/RabbitMQ).",
                    "tips": "Cover caching, async I/O, database optimization, and background worker queues."
                },
                {
                    "id": 2,
                    "type": "AI / ML Integration",
                    "question": "How do you mitigate latency, rate limits, and hallucinations when integrating LLM APIs into user-facing web applications?",
                    "sample_answer": "I employ prompt caching, set strict token limits, use streaming responses or async webhooks, and validate output schemas using Pydantic or structured JSON mode. For reliability, I build heuristic fallbacks and local vector search to ground responses with verified context.",
                    "tips": "Mention structured JSON output, grounding, caching, and graceful fallbacks."
                },
                {
                    "id": 3,
                    "type": "Behavioral / Problem Solving",
                    "question": "Tell me about a difficult technical bug that was hard to reproduce in development and how you solved it.",
                    "sample_answer": "We experienced intermittent 504 gateway timeouts in production that did not happen in staging. By inspecting distributed tracing logs in Datadog, I discovered unindexed foreign key queries causing connection pool exhaustion under concurrent load. Adding composite indexes and tuning pool size resolved the issue instantly.",
                    "tips": "Walk through observation, hypothesis, instrumentation, and resolution."
                }
            ]

    @classmethod
    async def evaluate_response(cls, question: str, sample_answer: Optional[str], user_answer: str, role_title: str) -> Dict[str, Any]:
        """Evaluates candidate response and provides detailed actionable feedback."""
        word_count = len(user_answer.split())
        
        # Heuristic scoring
        has_metrics = bool(re.search(r"\b(\d+[\%kKmM]?|\$\d+)\b", user_answer))
        has_action_verbs = bool(re.search(r"\b(led|implemented|designed|built|managed|increased|reduced|achieved|analyzed)\b", user_answer, re.I))
        has_structure = word_count >= 30

        score = 60.0
        if word_count >= 20: score += 10
        if word_count >= 50: score += 10
        if has_metrics: score += 10
        if has_action_verbs: score += 10
        score = min(max(score, 50.0), 96.0)

        strengths = []
        if has_action_verbs:
            strengths.append("Strong usage of active verbs demonstrating personal ownership.")
        if word_count >= 40:
            strengths.append("Good narrative depth and willingness to elaborate on details.")
        if has_metrics:
            strengths.append("Incorporated concrete numerical metrics to substantiate claims.")
        else:
            strengths.append("Directly addressed the core intent of the interviewer's question.")

        improvements = []
        if not has_metrics:
            improvements.append("Quantify your results: Include percentages, team sizes, revenue, or hours saved.")
        if word_count < 35:
            improvements.append("Expand on the 'Result' stage of the STAR method to demonstrate the lasting impact.")
        improvements.append("Connect your solution back to the company's broader strategic goals.")

        communication_feedback = (
            "Your response is coherent and shows authentic domain grasp. To elevate it from good to outstanding, "
            "anchor your explanation with the STAR formula (Situation, Task, Action, Result) and conclude with a crisp summary sentence."
        )

        return {
            "score": score,
            "strengths": strengths,
            "improvements": improvements,
            "communication_feedback": communication_feedback,
            "suggested_model_answer": sample_answer or "A concise, metric-backed response highlighting direct ownership and quantifiable business value."
        }

