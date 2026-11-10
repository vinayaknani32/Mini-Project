import React, { useState } from 'react';
import { 
  Download, 
  Share2, 
  Info, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  FileText,
  AlertCircle,
  Copy,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import SpeedometerGauge from '../common/SpeedometerGauge';

export default function OverviewDashboard() {
  const { currentMatch, setActiveTab, addNotification } = useApp();
  const [copiedId, setCopiedId] = useState(null);

  // Fallback data if currentMatch is still loading
  const data = currentMatch || {
    job_title: "Sr. Project Manager",
    overall_match_score: 85,
    ats_compatibility_score: 88,
    detected_experience_years: "8 Years",
    top_skills_summary: "Python, Agile, Leadership",
    education_verified_status: "Verified (MSc)",
  };

  const handleDownloadPDF = () => {
    window.open('/api/match/download-report', '_blank');
    addNotification("Downloading Annotated PDF Match Report...", "success");
  };

  const handleShareReport = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification("Report link copied to clipboard!", "success");
  };

  const handleCopyRewrite = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addNotification("AI rewritten bullet copied!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* ===================== HERO SECTION: AT-A-GLANCE ===================== */}
      <div className="bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left: Heading & Speedometer Gauge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">At-a-Glance</h1>
              <div className="flex items-center gap-4">
                <SpeedometerGauge score={data.overall_match_score || 85} size={170} />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight text-white">Match Score:</span>
                    <span className="text-3xl font-extrabold text-emerald-400">
                      {Math.round(data.overall_match_score || 85)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Compared to JD: <strong className="text-slate-200 font-medium">{data.job_title}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center-Right: Profile Badges & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* Metadata Pills */}
            <div className="space-y-1.5 text-xs">
              <div className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                <span className="text-slate-400">Experience:</span> <span className="font-semibold text-white">{data.detected_experience_years || '8 Years'}</span>
              </div>
              <div className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                <span className="text-slate-400">Top Skills:</span> <span className="font-semibold text-emerald-300">{data.top_skills_summary || 'Python, Agile, Leadership'}</span>
              </div>
              <div className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300">
                <span className="text-slate-400">Education:</span> <span className="font-semibold text-white">{data.education_verified_status || 'Verified (MSc)'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold shadow-sm transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Annotated PDF</span>
              </button>
              
              <button
                onClick={handleShareReport}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold shadow-sm transition-all"
              >
                <Share2 className="w-4 h-4 text-teal-400" />
                <span>Share Report</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ===================== MID ROW: 3 ANALYTICS CARDS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card 1: Experience Timeline & Sentiments (5 cols) */}
        <div className="lg:col-span-5 bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide mb-4">
              Experience Timeline & Sentiments
            </h3>

            {/* Visual Gantt Timeline Graphic */}
            <div className="relative py-4 space-y-4">
              
              {/* Year 2023 */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 w-10 font-mono">2023</span>
                <div className="flex-1 relative h-6 bg-slate-900/60 rounded-md overflow-hidden">
                  <div className="absolute left-[50%] right-[10%] top-1 bottom-1 bg-emerald-500/80 rounded flex items-center justify-center text-[10px] text-white font-medium shadow-sm">
                    Annotated
                  </div>
                </div>
              </div>

              {/* Year 2022 */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 w-10 font-mono">2022</span>
                <div className="flex-1 relative h-6 bg-slate-900/60 rounded-md overflow-hidden">
                  <div className="absolute left-[30%] w-[18%] top-1 bottom-1 bg-amber-600/90 rounded border border-amber-400/50 flex items-center justify-center text-[10px] text-amber-100 font-medium">
                    Gap
                  </div>
                  <div className="absolute left-[52%] right-[25%] top-1 bottom-1 bg-emerald-500/80 rounded flex items-center justify-center text-[10px] text-white font-medium">
                    Promotion
                  </div>
                </div>
              </div>

              {/* Year 2021 */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-slate-400 w-10 font-mono">2021</span>
                <div className="flex-1 relative h-6 bg-slate-900/60 rounded-md overflow-hidden">
                  <div className="absolute left-[10%] w-[35%] top-1 bottom-1 bg-emerald-600/70 rounded flex items-center justify-center text-[10px] text-white font-medium">
                    Promotion
                  </div>
                </div>
              </div>

              {/* Annotation Pointer */}
              <div className="absolute top-1 left-[32%] text-[10px] text-amber-300 flex flex-col items-center pointer-events-none">
                <span>Annotated gaps</span>
                <span className="text-amber-400/80 text-[9px]">(amber marked)</span>
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full my-0.5" />
                <div className="w-px h-6 bg-amber-500/60 border-dashed border-l" />
              </div>

            </div>
          </div>

          {/* Timeline Bottom Axis Markers */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-800/60">
            <span>Days</span>
            <span>5-5</span>
            <span>10-13</span>
            <span>14-17</span>
            <span>21-23</span>
            <span>30 30</span>
          </div>
        </div>

        {/* Card 2: Sentiment & Tone Radar (3 cols) */}
        <div className="lg:col-span-3 bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col items-center justify-between">
          <div className="w-full">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide text-center mb-2">
              Sentiment & Tone
            </h3>
          </div>

          {/* Custom SVG Triangle Radar */}
          <div className="relative w-44 h-44 my-2 flex items-center justify-center">
            {/* Top label: Leadership */}
            <span className="absolute -top-1 font-semibold text-xs text-slate-300">Leadership</span>
            {/* Bottom Left: Technical */}
            <span className="absolute -bottom-1 -left-2 font-semibold text-xs text-slate-300">Technical</span>
            {/* Bottom Right: Collaborative */}
            <span className="absolute -bottom-1 -right-3 font-semibold text-xs text-slate-300">Collaborative</span>

            <svg viewBox="0 0 140 140" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Concentric reference triangles */}
              <polygon points="70,25 25,105 115,105" fill="none" stroke="#1e293b" strokeWidth="1" />
              <polygon points="70,40 38,98 102,98" fill="none" stroke="#1e293b" strokeWidth="1" />
              <polygon points="70,55 52,90 88,90" fill="none" stroke="#1e293b" strokeWidth="1" />

              {/* Axis lines */}
              <line x1="70" y1="20" x2="70" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="20" y1="110" x2="70" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="120" y1="110" x2="70" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />

              {/* Active Tone Shape */}
              <polygon
                points="70,30 35,98 110,95"
                fill="url(#radarFill)"
                stroke="#34d399"
                strokeWidth="2"
                className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
              />
              
              {/* Vertices points */}
              <circle cx="70" cy="30" r="3.5" fill="#10b981" />
              <circle cx="35" cy="98" r="3.5" fill="#06b6d4" />
              <circle cx="110" cy="95" r="3.5" fill="#34d399" />
            </svg>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 w-full justify-around">
            <span className="text-emerald-400">High Leadership</span>
            <span className="text-teal-400">Executive Tone</span>
          </div>
        </div>

        {/* Card 3: Skill Gap Heatmap (4 cols) */}
        <div className="lg:col-span-4 bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
              Skill Gap Heatmap
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Required (JD)</span>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="text-[11px] text-slate-400">
                  <th className="text-left font-normal py-1 pr-2">Resume Skill</th>
                  <th title="Tech Core" className="px-1.5 py-1">⚙️</th>
                  <th title="Agile" className="px-1.5 py-1">🚗</th>
                  <th title="Leadership" className="px-1.5 py-1">💼</th>
                  <th title="Data Tools" className="px-1.5 py-1">📊</th>
                  <th title="Cloud Ops" className="px-1.5 py-1">☁️</th>
                  <th title="Soft Skills" className="px-1.5 py-1">💎</th>
                </tr>
              </thead>
              <tbody className="text-xs font-mono">
                {/* Row: Match */}
                <tr>
                  <td className="text-left text-[11px] text-slate-300 py-1.5 font-sans flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Match
                  </td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">15</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">13</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">18</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">15</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">5</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">4</div></td>
                </tr>

                {/* Row: Partial Match */}
                <tr>
                  <td className="text-left text-[11px] text-slate-300 py-1.5 font-sans flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Partial Match
                  </td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">16</div></td>
                  <td className="p-1"><div className="bg-amber-500/80 text-white rounded py-0.5 font-bold text-[11px]">7</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">13</div></td>
                  <td className="p-1"><div className="bg-amber-500/80 text-white rounded py-0.5 font-bold text-[11px]">12</div></td>
                  <td className="p-1"><div className="bg-slate-800 text-slate-400 rounded py-0.5 text-[11px]">0</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">8</div></td>
                </tr>

                {/* Row: Keywords */}
                <tr>
                  <td className="text-left text-[11px] text-slate-300 py-1.5 font-sans flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-400" /> Keywords
                  </td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">18</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">13</div></td>
                  <td className="p-1"><div className="bg-emerald-500/80 text-white rounded py-0.5 font-bold text-[11px]">13</div></td>
                  <td className="p-1"><div className="bg-amber-500/80 text-white rounded py-0.5 font-bold text-[11px]">4</div></td>
                  <td className="p-1"><div className="bg-slate-800 text-slate-400 rounded py-0.5 text-[11px]">0</div></td>
                  <td className="p-1"><div className="bg-slate-800 text-slate-400 rounded py-0.5 text-[11px]">0</div></td>
                </tr>

                {/* Row: Missing */}
                <tr>
                  <td className="text-left text-[11px] text-slate-300 py-1.5 font-sans flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> Missing
                  </td>
                  <td className="p-1"><div className="bg-rose-500/80 text-white rounded py-0.5 font-bold text-[11px]">0</div></td>
                  <td className="p-1"><div className="bg-rose-500/80 text-white rounded py-0.5 font-bold text-[11px]">0</div></td>
                  <td className="p-1"><div className="bg-rose-500/80 text-white rounded py-0.5 font-bold text-[11px]">0</div></td>
                  <td className="p-1"><div className="bg-amber-500/80 text-white rounded py-0.5 font-bold text-[11px]">4</div></td>
                  <td className="p-1"><div className="bg-rose-500/80 text-white rounded py-0.5 font-bold text-[11px]">6</div></td>
                  <td className="p-1"><div className="bg-rose-500/80 text-white rounded py-0.5 font-bold text-[11px]">0</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ===================== BOTTOM ROW: 3 ACTIONABLE CARDS ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Card 1: AI Feedback Loop - Bullet Rewriter (6 cols) */}
        <div className="lg:col-span-6 bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide flex items-center gap-2">
              <span>AI Feedback Loop</span>
              <span className="text-[11px] font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Actionable Rewrites
              </span>
            </h3>
            <button
              onClick={() => setActiveTab('match')}
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <span>Full Matcher</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-12 gap-3 text-xs text-slate-400 pb-2 border-b border-slate-800/60 font-medium">
            <span className="col-span-4">Weak Bullets</span>
            <span className="col-span-8 flex items-center gap-1 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              AI Suggested Rewrite
            </span>
          </div>

          <div className="divide-y divide-slate-800/50 space-y-2.5 pt-2.5">
            {[
              { id: 1, weak: "Managed a team", rewrite: "Led 10-person cross-functional engineering team delivering critical sprint milestones 2 weeks ahead of schedule." },
              { id: 2, weak: "Responsible for standups", rewrite: "Orchestrated bi-weekly Agile sprint ceremonies and daily scrums, accelerating team release velocity by 24%." },
              { id: 3, weak: "Worked on automation", rewrite: "Architected Python ETL and CI/CD automation pipelines, reducing manual deployment overhead by 15 hours weekly." },
              { id: 4, weak: "Talked to clients", rewrite: "Served as primary technical liaison for 8 enterprise clients, translating complex SLAs into clear delivery roadmaps." }
            ].map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-3 pt-2 items-start text-xs group">
                <div className="col-span-4 text-slate-400 flex items-start gap-2">
                  <span className="text-slate-500 font-mono text-[11px]">{item.id}</span>
                  <span className="line-through decoration-rose-500/60 text-slate-400">• {item.weak}</span>
                </div>
                <div className="col-span-8 flex items-start justify-between gap-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 group-hover:border-emerald-500/30 transition-colors">
                  <div className="text-slate-200">
                    <span className="text-emerald-400 font-semibold">• </span>
                    {item.rewrite}
                  </div>
                  <button
                    onClick={() => handleCopyRewrite(item.rewrite, item.id)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-300 shrink-0 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copiedId === item.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: ATS Compatibility Check (3 cols) */}
        <div className="lg:col-span-3 bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide mb-4">
              ATS Compatibility Check
            </h3>

            <div className="space-y-4">
              {/* Font Check */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-200">Font Check</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Pass
                </span>
              </div>

              {/* Header Parsing */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">Header Parsing</span>
                  </div>
                  <span className="text-emerald-400 font-mono">92%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Table Detection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">Table Detection</span>
                  </div>
                  <span className="text-emerald-400 font-mono">88%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              {/* Keyword Coverage */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">Keyword Coverage</span>
                  </div>
                  <span className="text-emerald-400 font-mono">84%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/60 text-[11px] text-slate-400">
            ATS Score: <strong className="text-emerald-400 font-mono">88/100</strong> (Ready for submission)
          </div>
        </div>

        {/* Card 3: AI Feedback Loop / Match Breakdown (3 cols) */}
        <div className="lg:col-span-3 bg-[#121a2d]/90 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wide mb-4">
              AI Feedback Loop
            </h3>

            <div className="space-y-4">
              {/* High Match */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">High Match</span>
                  </div>
                  <span className="text-emerald-400 font-mono">85%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Header Parsing */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">Header Parsing</span>
                  </div>
                  <span className="text-amber-400 font-mono">75%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              {/* Table Detection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">Table Detection</span>
                  </div>
                  <span className="text-orange-400 font-mono">70%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              {/* Keyword Coverage */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium text-slate-200">Keyword Coverage</span>
                  </div>
                  <span className="text-rose-400 font-mono">60%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI Coach Pill / Button */}
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-end">
            <button
              onClick={() => setActiveTab('chat')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-transform"
              title="Open AI Career Chatbot"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Ask AI Coach</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

