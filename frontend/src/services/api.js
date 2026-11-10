const API_BASE = '/api';

export const api = {
  // Health
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch {
      return { status: 'offline' };
    }
  },

  // Matcher
  async getDemoMatch() {
    const res = await fetch(`${API_BASE}/match/demo`);
    if (!res.ok) throw new Error('Failed to fetch demo analysis');
    return await res.json();
  },

  async analyzeMatch({ resume_text, job_description, target_job_title, company_name }) {
    const res = await fetch(`${API_BASE}/match/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text, job_description, target_job_title, company_name })
    });
    if (!res.ok) throw new Error('Failed to analyze match');
    return await res.json();
  },

  async uploadAndAnalyzeMatch(formData) {
    const res = await fetch(`${API_BASE}/match/upload-and-analyze`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload and analyze');
    return await res.json();
  },

  // Resume Analyzer
  async uploadResume(formData) {
    const res = await fetch(`${API_BASE}/resume/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload resume');
    return await res.json();
  },

  async listResumes() {
    const res = await fetch(`${API_BASE}/resume/list`);
    if (!res.ok) throw new Error('Failed to list resumes');
    return await res.json();
  },

  // Career Guidance
  async getCareerGuidance(profile) {
    const res = await fetch(`${API_BASE}/career/guidance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error('Failed to get career guidance');
    return await res.json();
  },

  // Interview Prep
  async generateInterview(role_title, experience_level = 'Mid-Senior') {
    const res = await fetch(`${API_BASE}/interview/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role_title, experience_level })
    });
    if (!res.ok) throw new Error('Failed to generate interview');
    return await res.json();
  },

  async evaluateAnswer({ question, sample_answer, user_answer, role_title }) {
    const res = await fetch(`${API_BASE}/interview/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, sample_answer, user_answer, role_title })
    });
    if (!res.ok) throw new Error('Failed to evaluate answer');
    return await res.json();
  },

  // Productivity Tasks
  async getTasks() {
    const res = await fetch(`${API_BASE}/tasks/`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return await res.json();
  },

  async createTask(task) {
    const res = await fetch(`${API_BASE}/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error('Failed to create task');
    return await res.json();
  },

  async updateTask(id, updates) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update task');
    return await res.json();
  },

  async deleteTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete task');
    return await res.json();
  },

  async getProductivityStats() {
    const res = await fetch(`${API_BASE}/tasks/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return await res.json();
  },

  // AI Chatbot
  async sendChatMessage(message, history = []) {
    const res = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
    if (!res.ok) throw new Error('Failed to send chat message');
    return await res.json();
  },

  // Settings
  async getSettings() {
    const res = await fetch(`${API_BASE}/settings/`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  },

  async updateSettings(data) {
    const res = await fetch(`${API_BASE}/settings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return await res.json();
  }
};

