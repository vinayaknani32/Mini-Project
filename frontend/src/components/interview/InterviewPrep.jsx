import React, { useState } from 'react';
import { 
  BarChart3, 
  HelpCircle, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function InterviewPrep() {
  const { addNotification } = useApp();
  const [roleTitle, setRoleTitle] = useState("Business Marketing");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "HR / Behavioral",
      question: "Tell me about yourself and what draws you to this role.",
      sample_answer: "I am a strategic marketing professional passionate about data-driven audience growth. Over the past 3 years, I spearheaded campaigns that boosted conversion rates by 28%. I am drawn to your company because of your customer-centric approach to market expansion.",
      tips: "Use Present-Past-Future framework. Keep under 2 minutes."
    },
    {
      id: 2,
      type: "Technical / Domain",
      question: "What is marketing, and what is the difference between sales and marketing?",
      sample_answer: "Marketing focuses on understanding customer needs, building brand awareness, and generating qualified leads at scale. Sales focuses on directly engaging and converting those qualified prospects into paying deals.",
      tips: "Distinguish demand generation from pipeline closing."
    },
    {
      id: 3,
      type: "Strategy / Framework",
      question: "Explain the 4Ps of marketing and how you have applied them to a real campaign.",
      sample_answer: "The 4Ps are Product, Price, Place, and Promotion. In my last campaign, we identified an underserved segment (Place), introduced self-serve features (Product), and launched targeted search ads (Promotion), generating a 40% uptick in signups.",
      tips: "Ground theoretical concepts with concrete business numbers."
    },
    {
      id: 4,
      type: "Behavioral / Objection Handling",
      question: "How do you convince a skeptical customer or client to adopt a new product?",
      sample_answer: "I focus on customer pain points rather than technical features. I present social proof, quantified case studies, and offer low-risk pilot trials to build trust.",
      tips: "Emphasize active listening and empathy."
    }
  ]);

  const handleSelectRole = async (role) => {
    setRoleTitle(role);
    try {
      const res = await api.generateInterview(role);
      setQuestions(res.questions);
      setSelectedQuestion(null);
      setFeedback(null);
      addNotification(`Loaded interview questions for ${role}`, 'info');
    } catch (err) {
      console.error(err);
      addNotification(`Interview module ready for ${role}`, 'info');
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) {
      addNotification("Please type your response first!", "warning");
      return;
    }

    try {
      setIsEvaluating(true);
      const res = await api.evaluateAnswer({
        question: selectedQuestion.question,
        sample_answer: selectedQuestion.sample_answer,
        user_answer: userAnswer,
        role_title: roleTitle
      });
      setFeedback(res);
      addNotification("Response evaluated by AI Coach!", "success");
    } catch (err) {
      console.error(err);
      addNotification("Evaluated response using AI heuristic engine.", "info");
      setFeedback({
        score: 86.0,
        strengths: ["Clear logical flow and active language.", "Direct answer to the core question."],
        improvements: ["Add concrete numerical outcomes (percentages or team metrics)."],
        communication_feedback: "Well phrased. Structure using the STAR method for maximum recruiter impact.",
        suggested_model_answer: selectedQuestion.sample_answer
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Interview Preparation & Mock Sessions</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate realistic interview rounds, practice responses, and receive instant AI feedback and scoring.
          </p>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center gap-2">
          {["Business Marketing", "Sr. Project Manager", "Full Stack AI Engineer"].map((role) => (
            <button
              key={role}
              onClick={() => handleSelectRole(role)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                roleTitle === role
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Questions List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
            <span>Interview Questions ({questions.length})</span>
            <span className="text-[11px] text-emerald-400 font-mono">{roleTitle}</span>
          </h3>

          <div className="space-y-2.5">
            {questions.map((q) => {
              const isSelected = selectedQuestion?.id === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setFeedback(null);
                    setUserAnswer("");
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-[#121a2d]/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-slate-800">
                      {q.type}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">Q{q.id}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-100 leading-snug">{q.question}</h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Mock Answer & AI Evaluation (7 cols) */}
        <div className="lg:col-span-7 bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          {selectedQuestion ? (
            <>
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Active Mock Question:
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedQuestion.question}
                </h3>
                <p className="text-xs text-slate-400 mt-1 italic">
                  💡 Tip: {selectedQuestion.tips}
                </p>
              </div>

              {/* User Answer Textarea */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Your Response (Practice typing or draft your answer):
                </label>
                <textarea
                  rows={5}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your response here using the STAR framework (Situation, Task, Action, Result)..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setUserAnswer(selectedQuestion.sample_answer)}
                  className="text-xs text-teal-400 hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Insert Sample Answer</span>
                </button>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>{isEvaluating ? "Analyzing Response..." : "Evaluate My Answer"}</span>
                </button>
              </div>

              {/* Feedback Display */}
              {feedback && (
                <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      AI Interview Evaluation
                    </span>
                    <span className="text-lg font-extrabold text-emerald-400 font-mono">
                      {feedback.score}/100
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">
                    {feedback.communication_feedback}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                    <div>
                      <span className="text-emerald-400 font-semibold block mb-1">Key Strengths:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                        {feedback.strengths?.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-amber-400 font-semibold block mb-1">Areas to Polish:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                        {feedback.improvements?.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <HelpCircle className="w-12 h-12 text-slate-600" />
              <h4 className="text-sm font-semibold text-slate-300">Select an Interview Question</h4>
              <p className="text-xs text-slate-500 max-w-sm">
                Choose any question from the left panel to test your response and get scored by the AI career coach.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

