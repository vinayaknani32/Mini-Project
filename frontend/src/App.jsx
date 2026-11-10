import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/common/Sidebar';
import OverviewDashboard from './components/overview/OverviewDashboard';
import CareerGuidance from './components/career/CareerGuidance';
import ResumeAnalyzer from './components/resume/ResumeAnalyzer';
import ResumeJdMatcher from './components/match/ResumeJdMatcher';
import InterviewPrep from './components/interview/InterviewPrep';
import JobRecommendations from './components/jobs/JobRecommendations';
import ProductivityTracker from './components/productivity/ProductivityTracker';
import CareerChatbot from './components/chat/CareerChatbot';
import SettingsPage from './components/settings/SettingsPage';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  const { activeTab, notifications } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <OverviewDashboard />;
      case 'career':
        return <CareerGuidance />;
      case 'resume':
        return <ResumeAnalyzer />;
      case 'match':
        return <ResumeJdMatcher />;
      case 'interview':
        return <InterviewPrep />;
      case 'jobs':
        return <JobRecommendations />;
      case 'productivity':
        return <ProductivityTracker />;
      case 'chat':
        return <CareerChatbot />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden dark:bg-[#0a0f1d] bg-slate-100 dark:text-slate-100 text-slate-900 font-sans transition-colors duration-200">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {renderActiveTab()}

        {/* Global Floating Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-xl border text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200 ${
                n.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                  : n.type === 'warning'
                  ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                  : 'bg-slate-900/90 border-slate-700 text-slate-200'
              }`}
            >
              {n.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : n.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-teal-400 shrink-0" />
              )}
              <span>{n.message}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

