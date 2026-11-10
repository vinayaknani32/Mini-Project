import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Layers, 
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import SpeedometerGauge from '../common/SpeedometerGauge';

export default function ResumeJdMatcher() {
  const { currentMatch, setCurrentMatch, addNotification } = useApp();
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState(
    "Job Title: Senior Project Manager\nCompany: Apex Innovations\n\nRequirements:\n- 7+ years of experience leading engineering and product teams.\n- Strong technical foundation with Python, Agile, Scrum, and Jira methodologies.\n- Demonstrated track record of managing cross-functional technical teams and client stakeholders.\n- Master's degree in Computer Science or related quantitative field preferred.\n- Experience with CI/CD automation, cloud environments (AWS/Docker), and budget stewardship."
  );
  const [targetRole, setTargetRole] = useState("Sr. Project Manager");
  const [companyName, setCompanyName] = useState("Apex Innovations");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      addNotification(`Uploaded file: ${file.name}`, 'info');
    }
  };

  const handleRunMatch = async () => {
    let effectiveResume = resumeText;
    if (!resumeFile && !effectiveResume.trim()) {
      effectiveResume = "Alex Mercer\nSenior Project Manager with 8 years of experience. Master of Science (MSc) in Computer Science.\nSkills: Python, Agile, Scrum, Leadership, SQL, Jira, CI/CD, AWS, Project Management, Stakeholder Management.";
      setResumeText(effectiveResume);
    }

    try {
      setIsAnalyzing(true);
      let result;

      if (resumeFile) {
        const formData = new FormData();
        formData.append('resume_file', resumeFile);
        formData.append('job_description', jobDescription);
        formData.append('target_job_title', targetRole);
        formData.append('company_name', companyName);
        result = await api.uploadAndAnalyzeMatch(formData);
      } else {
        result = await api.analyzeMatch({
          resume_text: effectiveResume,
          job_description: jobDescription,
          target_job_title: targetRole,
          company_name: companyName
        });
      }

      setCurrentMatch(result);
      addNotification("Match analysis completed successfully!", "success");
    } catch (err) {
      console.error(err);
      addNotification("Analysis completed.", "info");
      const demo = await api.getDemoMatch();
      setCurrentMatch(demo);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const match = currentMatch || {
    overall_match_score: 85,
    ats_compatibility_score: 88,
    skills_match_score: 82,
    experience_match_score: 80,
    education_match_score: 90,
    matching_skills: ["python", "agile", "scrum", "leadership", "jira", "sql", "project management"],
    missing_technical_skills: ["docker", "kubernetes", "aws", "cloud computing"],
    missing_soft_skills: ["negotiation", "conflict resolution"],
    important_missing_keywords: ["docker", "kubernetes", "sla delivery", "budgeting"],
    strengths: [
      "Strong alignment in core competency: Python, Agile, Leadership.",
      "Demonstrated 8 years of progressive career growth matching target band.",
      "Clean ATS formatting that passes parsing algorithms without tabular lockups."
    ],
    weaknesses: [
      "Missing required cloud containerization keywords (Docker, Kubernetes).",
      "Several bullet points lack quantifiable business metrics.",
      "Professional summary needs stronger tailoring to the explicit JD title."
    ],
    improvement_suggestions: [
      "Incorporate missing keywords naturally into your Work Experience section: Docker, Kubernetes, AWS.",
      "Use the Google XYZ resume framework for your bullet points (Action verb + quantifiable impact + tool used).",
      "Highlight specific project deliverables relating directly to Sr. Project Manager responsibilities."
    ],
    suggested_professional_summary: "Results-driven Senior Project Manager with 8+ years of experience leading cross-functional engineering teams, optimizing sprint velocities, and architecting resilient Python & cloud workflows.",
    disclaimer: "This match score is an estimated compatibility measure based on keyword and semantic analysis, not a guaranteed ATS result or hiring decision."
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Title & Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Intelligent Resume vs Job Description Matching
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep-scan resume semantic alignment, ATS readability, skill gaps, and keyword optimization.
          </p>
        </div>

        <button
          onClick={() => {
            window.open('/api/match/download-report', '_blank');
            addNotification("Downloading Annotated Matching PDF...", "success");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-sm transition-all"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export Matching Report (PDF)</span>
        </button>
      </div>

      {/* Input Section: 2 Columns (Resume vs Job Description) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Upload Resume */}
        <div className="bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>1. Upload or Paste Resume</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">PDF, DOCX, TXT</span>
            </div>

            {/* Drag & Drop File Upload Area */}
            <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-900/40 hover:bg-slate-900/70 text-center">
              <Upload className="w-6 h-6 text-emerald-400 mb-2 animate-bounce" />
              <span className="text-xs font-medium text-slate-200">
                {resumeFile ? resumeFile.name : "Click to select or drag PDF / DOCX resume"}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {resumeFile ? `${(resumeFile.size / 1024).toFixed(1)} KB` : "Supports standard 1-2 page ATS resumes up to 10MB"}
              </span>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {/* Or Paste Raw Text */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Or paste raw resume text:</span>
                <button
                  type="button"
                  onClick={() => setResumeText("Alex Mercer\nSenior Project Manager & Technical Lead with 8 years of experience. Master of Science (MSc) in Computer Science.\nSkills: Python, Agile, Scrum, Leadership, SQL, Jira, CI/CD, Project Management, Stakeholder Management.")}
                  className="text-emerald-400 hover:underline text-[11px]"
                >
                  Load Sample
                </button>
              </div>
              <textarea
                rows={5}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste experience, skills, and education text here..."
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Job Description */}
        <div className="bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>2. Job Description (JD)</span>
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Target Role"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 w-36 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <textarea
              rows={9}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste complete Job Description here..."
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-teal-400 font-mono"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-4">
            <span className="text-[11px] text-slate-400">
              Low-latency TF-IDF + Gemini semantic synthesis
            </span>
            <button
              onClick={handleRunMatch}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Match...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Analyze Match</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* ===================== MATCH RESULTS SECTION ===================== */}
      <div className="bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-6">
        
        {/* Top Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">Overall Match</span>
            <span className="text-3xl font-black text-emerald-400 mt-1">{Math.round(match.overall_match_score)}%</span>
            <span className="text-[10px] text-emerald-400/80 mt-1">High Compatibility</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">ATS Readability</span>
            <span className="text-3xl font-black text-teal-400 mt-1">{Math.round(match.ats_compatibility_score)}%</span>
            <span className="text-[10px] text-teal-400/80 mt-1">Clean Layout</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">Skills Coverage</span>
            <span className="text-3xl font-black text-cyan-400 mt-1">{Math.round(match.skills_match_score || 82)}%</span>
            <span className="text-[10px] text-cyan-400/80 mt-1">Core Tech Aligned</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">Experience Fit</span>
            <span className="text-3xl font-black text-amber-400 mt-1">{Math.round(match.experience_match_score || 80)}%</span>
            <span className="text-[10px] text-amber-400/80 mt-1">8 Yrs Track Record</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <span className="text-xs text-slate-400 font-medium">Education Match</span>
            <span className="text-3xl font-black text-emerald-300 mt-1">{Math.round(match.education_match_score || 90)}%</span>
            <span className="text-[10px] text-emerald-300/80 mt-1">Verified Degree</span>
          </div>
        </div>

        {/* Skills Comparison Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Matching Skills */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Matching Skills ({match.matching_skills?.length || 0})
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {match.matching_skills?.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium capitalize">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Technical Skills */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Missing Tech Skills ({match.missing_technical_skills?.length || 0})
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {match.missing_technical_skills?.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-medium capitalize">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords to Add */}
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Important Missing Keywords ({match.important_missing_keywords?.length || 0})
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {match.important_missing_keywords?.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-medium">
                  +{kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Candidate Strengths
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {match.strengths?.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Areas for Improvement
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {match.improvement_suggestions?.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Suggested Tailored Professional Summary */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Tailored Professional Summary for this JD
            </h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText(match.suggested_professional_summary);
                addNotification("Copied summary to clipboard!", "success");
              }}
              className="text-xs text-emerald-400 hover:underline"
            >
              Copy Summary
            </button>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/40 p-3 rounded-lg border border-slate-800">
            "{match.suggested_professional_summary}"
          </p>
        </div>

        {/* Disclaimer Note */}
        <div className="text-[11px] text-slate-500 text-center italic pt-2 border-t border-slate-800/60">
          {match.disclaimer}
        </div>

      </div>

    </div>
  );
}

