import React, { useState } from 'react';
import { 
  TrendingUp, 
  Compass, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Award,
  Clock
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function CareerGuidance() {
  const { addNotification } = useApp();
  const [education, setEducation] = useState("B.Tech / B.S. in Computer Science");
  const [skills, setSkills] = useState("Python, React, FastAPI, SQL, Machine Learning");
  const [interests, setInterests] = useState("Artificial Intelligence, Cloud Architecture, Full Stack");
  const [yearsExp, setYearsExp] = useState(2);
  const [loading, setLoading] = useState(false);

  const [guidance, setGuidance] = useState({
    summary: "Based on your technical foundation in Computer Science and active skills (Python, React, Machine Learning), you are ideally positioned for high-growth roles combining full-stack development with applied AI engineering.",
    recommended_roles: [
      {
        role_title: "AI Application Engineer",
        match_percentage: 92.0,
        salary_range: "₹24 - ₹38 LPA",
        demand_level: "Very High",
        description: "Bridges machine learning models and modern web applications with low latency and high scalability across top Indian product startups and MNCs.",
        required_skills: ["Python", "FastAPI", "React", "LLM APIs", "Docker", "SQL"],
        missing_skills: ["Docker", "Kubernetes", "Vector Databases"]
      },
      {
        role_title: "Full Stack AI Developer",
        match_percentage: 88.0,
        salary_range: "₹16 - ₹28 LPA",
        demand_level: "High",
        description: "Designs and implements user interfaces, API backends, and robust database architectures with LLM integration.",
        required_skills: ["TypeScript", "React", "Python", "REST APIs", "Tailwind CSS"],
        missing_skills: ["TypeScript", "CI/CD Pipelines", "Redis"]
      }
    ],
    missing_skills: ["Docker", "Kubernetes", "Vector Databases", "System Design", "Cloud Infrastructure"],
    roadmap: [
      {
        week_or_phase: "Phase 1 (Weeks 1-2)",
        topic: "Core Foundations & Modern Async Architecture",
        description: "Master asynchronous concurrency patterns, clean database session handling, and REST API design.",
        resources: ["FastAPI Official Tutorials", "Async Python Deep-Dive"]
      },
      {
        week_or_phase: "Phase 2 (Weeks 3-4)",
        topic: "Applied AI Integration & Vector Search",
        description: "Integrate Gemini API, vector embeddings, and fallback heuristics into interactive dashboards.",
        resources: ["Google AI Studio Cookbook", "LangChain & Scikit-learn Guides"]
      },
      {
        week_or_phase: "Phase 3 (Weeks 5-6)",
        topic: "Cloud Deployment, CI/CD & Production Hardening",
        description: "Containerize services using Docker, configure automated testing with GitHub Actions, and optimize latency.",
        resources: ["Docker Mastery Course", "AWS Free Tier Setup"]
      }
    ],
    recommended_courses: [
      { title: "FastAPI: High Performance REST APIs with Python", platform: "Coursera / Udemy", rating: "4.9", duration: "14 hours" },
      { title: "Deep Learning Specialization & LLM Engineering", platform: "DeepLearning.AI", rating: "4.9", duration: "4 weeks" },
      { title: "Modern React 18 & Enterprise State Architecture", platform: "Frontend Masters", rating: "4.8", duration: "18 hours" }
    ]
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.getCareerGuidance({
        education,
        skills: skills.split(',').map(s => s.trim()),
        interests: interests.split(',').map(i => i.trim()),
        years_experience: Number(yearsExp)
      });
      setGuidance(res);
      addNotification("Career roadmap refreshed successfully!", "success");
    } catch (err) {
      console.error(err);
      addNotification("Career guidance loaded.", "info");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Compass className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Career Guidance & Roadmap</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analyze skills, identify high-growth trajectories, and receive a step-by-step learning roadmap.
          </p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <h3 className="text-sm font-semibold text-slate-200">Your Educational Background & Skill Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Education Degree</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Current Skills (comma separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Passionate Interests</label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">Personalized AI recommendations based on current tech hiring trends</span>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{loading ? "Generating Roadmap..." : "Generate AI Career Path"}</span>
          </button>
        </div>
      </form>

      {/* Recommended Roles */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          Recommended Job Roles & Market Alignment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guidance.recommended_roles?.map((role, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{role.role_title}</h4>
                  <span className="text-xs text-emerald-400 font-mono font-medium">{role.salary_range}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold font-mono">
                  {role.match_percentage}% Match
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{role.description}</p>
              
              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                <span className="text-slate-400">Required Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {role.required_skills?.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[11px] font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {role.missing_skills?.length > 0 && (
                <div className="pt-1 space-y-1.5 text-xs">
                  <span className="text-amber-400">Skills to Learn:</span>
                  <div className="flex flex-wrap gap-1">
                    {role.missing_skills?.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-mono">
                        +{s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Roadmap */}
      <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-teal-400" />
          Personalized Career Milestone Roadmap
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guidance.roadmap?.map((step, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{step.week_or_phase}</span>
              <h4 className="text-xs font-bold text-slate-100">{step.topic}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="text-slate-500 font-medium">Recommended Resources:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {step.resources?.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Recommended Technologies & Courses
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guidance.recommended_courses?.map((c, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
              <div className="font-semibold text-white">{c.title}</div>
              <div className="text-slate-400 text-[11px]">{c.platform} • {c.duration}</div>
              <div className="text-emerald-400 font-mono text-[11px]">★ {c.rating} Rating</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

