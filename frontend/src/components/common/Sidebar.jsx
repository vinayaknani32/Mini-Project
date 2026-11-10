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
  const { isDark, toggleTheme } = useTheme();

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
    <aside className="w-64 bg-[#111827]/95 border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 backdrop-blur-md select-none transition-colors duration-200">
      <div>
        {/* User Profile Card */}
        <div className="flex items-center gap-3 p-2 mb-6 rounded-xl bg-slate-900/60 border border-slate-800/50">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shadow-sm">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-emerald-400 text-sm">
                AM
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              <span className="text-[11px] font-medium text-emerald-400/90 tracking-wide uppercase">Profile Status</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100 truncate">Alex Mercer</h4>
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
                    ? 'bg-slate-800/90 text-white shadow-sm border border-slate-700/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'match' && (
                  <span className="ml-auto text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                    85%
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Theme Toggle Pill */}
      <div className="pt-4 border-t border-slate-800/60">
        <div className="flex items-center justify-between p-1 bg-slate-900/80 rounded-xl border border-slate-800/80">
          <button
            onClick={() => !isDark && toggleTheme()}
            className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !isDark ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Light Mode"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => isDark && toggleTheme()}
            className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isDark ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/50' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Dark Mode"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

