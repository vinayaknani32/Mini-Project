import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Settings, 
  Sun, 
  Moon, 
  Sparkles,
  CheckSquare,
  MessageSquare,
  Compass
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export default function Sidebar() {
  const { activeTab, setActiveTab } = useApp();
  const { isDark, setDarkMode, setLightMode } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'career', label: 'Analysis', icon: TrendingUp },
    { id: 'resume', label: 'My Resumes', icon: FileText },
    { id: 'match', label: 'Job Postings', icon: Briefcase },
    { id: 'interview', label: 'Reports', icon: BarChart3 },
    { id: 'jobs', label: 'Job Recommendations', icon: Compass },
    { id: 'productivity', label: 'Productivity', icon: CheckSquare },
    { id: 'chat', label: 'AI Chatbot', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 dark:bg-[#111827]/95 bg-white border-r dark:border-slate-800/80 border-slate-200 flex flex-col justify-between p-4 shrink-0 backdrop-blur-md select-none transition-colors duration-200">
      <div>
        {/* User Profile Card */}
        <div className="flex items-center gap-3 p-2 mb-6 rounded-xl dark:bg-slate-900/60 bg-slate-100 border dark:border-slate-800/50 border-slate-200">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full dark:bg-slate-950 bg-white flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                AM
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 dark:ring-slate-950 ring-white animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400/90 tracking-wide uppercase">Profile Status</span>
            </div>
            <h4 className="text-sm font-bold dark:text-slate-100 text-slate-800 truncate">Alex Mercer</h4>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'dark:bg-slate-800/90 bg-emerald-50 dark:text-white text-emerald-950 shadow-sm border dark:border-slate-700/60 border-emerald-300 font-semibold'
                    : 'dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900 dark:hover:bg-slate-800/40 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'match' && (
                  <span className="ml-auto text-[10px] dark:bg-emerald-500/20 bg-emerald-100 dark:text-emerald-300 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">
                    85%
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme Toggle Pill */}
      <div className="pt-4 border-t dark:border-slate-800/60 border-slate-200">
        <div className="flex items-center justify-between p-1 dark:bg-slate-900/80 bg-slate-100 rounded-xl border dark:border-slate-800 border-slate-300">
          <button
            type="button"
            onClick={setLightMode}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !isDark
                ? 'bg-white text-amber-600 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Switch to Light Mode"
          >
            <Sun className="w-4 h-4" />
            <span className="text-[11px]">Light</span>
          </button>
          <button
            type="button"
            onClick={setDarkMode}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isDark
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/60'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            title="Switch to Dark Mode"
          >
            <Moon className="w-4 h-4" />
            <span className="text-[11px]">Dark</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
