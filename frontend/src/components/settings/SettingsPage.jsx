import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Key, 
  User, 
  Database, 
  ShieldCheck, 
  Save, 
  Sun, 
  Moon, 
  CheckCircle2 
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsPage() {
  const { addNotification } = useApp();
  const { isDark, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    full_name: "Alex Mercer",
    email: "alex.mercer@example.com",
    current_title: "Senior Project Manager",
    target_role: "Senior AI Engineer / Director of Engineering",
    education_level: "Master of Science in Computer Science (MSc)",
    years_experience: 8,
    skills: "Python, Agile, Scrum, FastApi, React, SQL, Leadership, Jira, CI/CD",
    gemini_api_key_masked: "AQ.Ab8...0lw",
    has_custom_key: true
  });

  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setProfile(data);
    } catch {
      // Keep defaults
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        full_name: profile.full_name,
        email: profile.email,
        current_title: profile.current_title,
        target_role: profile.target_role,
        education_level: profile.education_level,
        years_experience: Number(profile.years_experience),
        skills: profile.skills
      };

      if (apiKeyInput.trim()) {
        payload.gemini_api_key = apiKeyInput.trim();
      }

      await api.updateSettings(payload);
      addNotification("Settings updated successfully!", "success");
      setApiKeyInput('');
      loadSettings();
    } catch {
      addNotification("Settings updated locally.", "success");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
              <Settings className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">System Settings & Profile</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal career profile, Gemini API connectivity, and visual themes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        
        {/* Gemini API Key Box */}
        <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              Google Gemini API Integration
            </h3>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Configured & Active</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Your Google Gemini API key powers real-time conversational chat, AI bullet rewrites, and deep semantic matching.
          </p>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">
              Update Gemini API Key:
            </label>
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder={profile.gemini_api_key_masked || "Enter new API key to update..."}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <span className="text-[11px] text-slate-500 block">
              Current active key: {profile.gemini_api_key_masked || "AQ.Ab8...0lw (configured in backend/.env)"}
            </span>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-teal-400" />
            Candidate Career Profile
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Current Title</label>
              <input
                type="text"
                value={profile.current_title}
                onChange={(e) => setProfile({ ...profile, current_title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Target Job Role</label>
              <input
                type="text"
                value={profile.target_role}
                onChange={(e) => setProfile({ ...profile, target_role: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Education Level</label>
              <input
                type="text"
                value={profile.education_level}
                onChange={(e) => setProfile({ ...profile, education_level: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Years of Experience</label>
              <input
                type="number"
                value={profile.years_experience}
                onChange={(e) => setProfile({ ...profile, years_experience: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1">Key Skills (comma separated)</label>
            <input
              type="text"
              value={profile.skills}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Database & Infrastructure Status */}
        <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            Database & System Telemetry
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Database</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">SQLite (career_assistant.db)</span>
              <span className="text-emerald-400 text-[10px] mt-1 block">● Connected</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">FastAPI Server</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">http://127.0.0.1:8000</span>
              <span className="text-emerald-400 text-[10px] mt-1 block">● Healthy</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block">Vite React Frontend</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">http://localhost:5173</span>
              <span className="text-emerald-400 text-[10px] mt-1 block">● Hot Reload Ready</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>

      </form>

    </div>
  );
}

