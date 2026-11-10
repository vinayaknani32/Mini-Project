import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function ResumeAnalyzer() {
  const { addNotification } = useApp();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysis, setAnalysis] = useState({
    filename: "Alex_Mercer_Senior_PM_Resume.pdf",
    overall_score: 84.0,
    formatting_score: 88.0,
    content_score: 82.0,
    impact_score: 82.0,
    candidate_name: "Alex Mercer",
    contact_info: {
      email: "alex.mercer@example.com",
      phone: "(555) 234-5678",
      linkedin: "linkedin.com/in/alex-mercer",
      github: "github.com/alex-mercer"
    },
    extracted_sections: ["Contact", "Summary", "Skills", "Experience", "Education", "Projects"],
    missing_sections: ["Certifications"],
    identified_skills: ["Python", "Agile", "Scrum", "FastAPI", "SQL", "Docker", "Jira", "CI/CD", "Leadership", "Stakeholder Management"],
    strengths: [
      "Detected 10 verified industry technical & leadership competencies.",
      "Length (420 words) aligns perfectly with recommended single-page density.",
      "Clear contact coordinates with verified GitHub and LinkedIn URLs."
    ],
    weaknesses: [
      "Missing dedicated 'Certifications' section (e.g. PMP, CSM, AWS Certified).",
      "Several bullets describe duties rather than measurable business metrics."
    ],
    improvement_suggestions: [
      "Add quantifiable results (% conversion, team size, cloud dollar savings) to each bullet.",
      "Re-organize skills section by grouping into 'Technical', 'Methodologies', and 'Tools'."
    ],
    grammar_spelling_issues: [
      {
        type: "Passive duty phrasing",
        message: "Replace 'Responsible for daily standups' with 'Orchestrated Agile sprint ceremonies'."
      }
    ]
  });

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      const res = await api.uploadResume(formData);
      setAnalysis(res);
      addNotification(`Parsed "${selectedFile.name}" for ${res.candidate_name || 'Candidate'}! Score: ${res.overall_score}/100`, "success");
    } catch (err) {
      console.error(err);
      addNotification("Upload error: " + (err.message || "Failed to analyze document"), "warning");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <FileText className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Resume Quality Analyzer</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deep-audit resume structure, ATS readability score, section completeness, and quantified impact.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer hover:opacity-95 transition-all">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? "Scanning Document..." : "Upload New Resume"}</span>
          <input
            type="file"
            accept=".pdf,.docx,.doc,.txt"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* File & Candidate Info Banner */}
      <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center font-bold text-teal-400">
            {analysis.candidate_name ? analysis.candidate_name.charAt(0) : "C"}
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">{analysis.candidate_name || "Uploaded Resume"}</h3>
            <span className="text-slate-400 text-[11px] font-mono">{analysis.filename} • {analysis.word_count || 0} words</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          {analysis.contact_info?.email && (
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-emerald-300 font-mono">
              {analysis.contact_info.email}
            </span>
          )}
          {analysis.contact_info?.phone && (
            <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-slate-300 font-mono">
              {analysis.contact_info.phone}
            </span>
          )}
        </div>
      </div>

      {/* Top Quality Score Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Overall Quality</span>
            <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">{analysis.overall_score}/100</h3>
            <span className="text-[10px] text-emerald-400">Top 15% of Applicant Resumes</span>
          </div>
          <Award className="w-8 h-8 text-emerald-400/30" />
        </div>

        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Formatting Score</span>
            <h3 className="text-3xl font-extrabold text-teal-400 mt-1">{analysis.formatting_score}%</h3>
            <span className="text-[10px] text-teal-400">Clean Header & Font Flow</span>
          </div>
          <Layers className="w-8 h-8 text-teal-400/30" />
        </div>

        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Content Density</span>
            <h3 className="text-3xl font-extrabold text-cyan-400 mt-1">{analysis.content_score}%</h3>
            <span className="text-[10px] text-cyan-400">Ideal 1-2 Page Length</span>
          </div>
          <Sparkles className="w-8 h-8 text-cyan-400/30" />
        </div>

        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Quantified Impact</span>
            <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{analysis.impact_score}%</h3>
            <span className="text-[10px] text-amber-400">Metrics & Action Verbs</span>
          </div>
          <ArrowUpRight className="w-8 h-8 text-amber-400/30" />
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Sections & Contact Audit (5 cols) */}
        <div className="lg:col-span-5 bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Section Audit & Digital Coordinates
          </h3>

          <div className="space-y-2 text-xs">
            <span className="text-slate-400 font-medium">Verified Sections:</span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.extracted_sections?.map((sec, i) => (
                <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {sec}
                </span>
              ))}
            </div>
          </div>

          {analysis.missing_sections?.length > 0 && (
            <div className="space-y-2 text-xs pt-2">
              <span className="text-slate-400 font-medium">Missing Recommended Sections:</span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missing_sections?.map((sec, i) => (
                  <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {sec}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <span className="text-slate-400 font-medium">Identified Skills Taxonomy:</span>
            <div className="flex flex-wrap gap-1.5">
              {analysis.identified_skills?.map((sk, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 font-mono text-[11px]">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Strengths, Weaknesses, Improvements (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Strong Elements
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {analysis.strengths?.map((str, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Actionable Improvement Recommendations
            </h3>
            <ul className="space-y-2 text-xs text-slate-200">
              {analysis.improvement_suggestions?.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {analysis.grammar_spelling_issues?.length > 0 && (
            <div className="bg-[#121a2d]/90 border border-rose-500/30 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Phrasing & Style Suggestions
              </h3>
              {analysis.grammar_spelling_issues.map((issue, i) => (
                <div key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="font-semibold text-rose-300">{issue.type}: </span>
                  {issue.message}
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

