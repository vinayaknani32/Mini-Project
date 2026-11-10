import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function ProductivityTracker() {
  const { addNotification } = useApp();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total_tasks: 4,
    completed_tasks: 2,
    pending_tasks: 2,
    completion_rate: 50.0,
    high_priority_pending: 1,
    today_focus_score: 85,
    ai_productivity_tips: [
      "Protect your morning 90-minute block for high-leverage work without interruptions.",
      "Group administrative tasks into a single 30-minute afternoon sprint.",
      "Apply the 2-minute rule: if a task takes under two minutes, execute it immediately."
    ],
    suggested_daily_schedule: [
      { time: "09:00 AM - 10:30 AM", activity: "Deep Work: Core High-Priority Project Milestone", energy: "High" },
      { time: "10:45 AM - 11:30 AM", activity: "Technical Skill Upgrading & Reading", energy: "Medium" },
      { time: "11:30 AM - 12:30 PM", activity: "Resume Tailoring & Job Applications", energy: "High" },
      { time: "02:00 PM - 03:00 PM", activity: "Mock Interview Practice & Feedback Review", energy: "Medium" },
      { time: "04:30 PM - 05:00 PM", activity: "Daily Review & Planning Tomorrow's Top 3 Tasks", energy: "Low" }
    ]
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('Career');
  const [newTaskDeadline, setNewTaskDeadline] = useState('Today, 5:00 PM');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTasksAndStats();
  }, []);

  const loadTasksAndStats = async () => {
    try {
      const [taskList, statData] = await Promise.all([
        api.getTasks(),
        api.getProductivityStats()
      ]);
      setTasks(taskList);
      setStats(statData);
    } catch (err) {
      console.log('Using seeded local tasks', err);
      setTasks([
        { id: 1, title: "Tailor Resume for Senior AI Engineer JD", category: "Career", priority: "high", deadline: "Today, 5:00 PM", is_completed: true },
        { id: 2, title: "Complete Mock Interview Session for Technical Architecture", category: "Career", priority: "high", deadline: "Today, 3:00 PM", is_completed: false },
        { id: 3, title: "Study Advanced FastAPI Async & SQL Indexing", category: "Learning", priority: "medium", deadline: "Tomorrow", is_completed: false },
        { id: 4, title: "Update LinkedIn Headline with Key Technical Keywords", category: "Productivity", priority: "low", deadline: "This Friday", is_completed: true }
      ]);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      setIsLoading(true);
      const created = await api.createTask({
        title: newTaskTitle,
        category: newTaskCategory,
        priority: newTaskPriority,
        deadline: newTaskDeadline,
        estimated_minutes: 30
      });
      setTasks(prev => [created, ...prev]);
      setNewTaskTitle('');
      addNotification("Task created successfully!", "success");
      loadTasksAndStats();
    } catch {
      const localTask = {
        id: Date.now(),
        title: newTaskTitle,
        category: newTaskCategory,
        priority: newTaskPriority,
        deadline: newTaskDeadline,
        is_completed: false
      };
      setTasks(prev => [localTask, ...prev]);
      setNewTaskTitle('');
      addNotification("Task added to your daily schedule!", "success");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (task) => {
    const updatedStatus = !task.is_completed;
    try {
      await api.updateTask(task.id, { is_completed: updatedStatus });
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_completed: updatedStatus } : t));
      loadTasksAndStats();
    } catch {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_completed: updatedStatus } : t));
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      addNotification("Task deleted", "info");
      loadTasksAndStats();
    } catch {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-100 bg-[#0b101e] min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Productivity Assistant</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Plan daily career objectives, track focus velocity, and receive automated schedule recommendations.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Daily Focus Score</span>
          <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">{stats.today_focus_score}/100</h3>
          <span className="text-[10px] text-emerald-400">Peak Performance Zone</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Completion Rate</span>
          <h3 className="text-3xl font-extrabold text-teal-400 mt-1">{stats.completion_rate}%</h3>
          <span className="text-[10px] text-teal-400">{stats.completed_tasks} completed / {stats.total_tasks} total</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Pending Tasks</span>
          <h3 className="text-3xl font-extrabold text-cyan-400 mt-1">{stats.pending_tasks}</h3>
          <span className="text-[10px] text-cyan-400">On Track for Today</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#121a2d]/90 border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">High-Priority Backlog</span>
          <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{stats.high_priority_pending}</h3>
          <span className="text-[10px] text-amber-400">Requires Urgent Focus</span>
        </div>
      </div>

      {/* Main Grid: Tasks on Left, AI Schedule on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Tasks Manager (7 cols) */}
        <div className="lg:col-span-7 bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          
          {/* New Task Input Form */}
          <form onSubmit={handleCreateTask} className="space-y-3 pb-5 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              Create New Priority Task
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="e.g., Practice STAR method mock interview for 30 minutes..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:opacity-90 transition-opacity"
              >
                Add Task
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Priority:</span>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Category:</span>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="Career">Career</option>
                  <option value="Learning">Learning</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Coding">Coding</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Deadline:</span>
                <input
                  type="text"
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 w-32"
                />
              </div>
            </div>
          </form>

          {/* Tasks List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today's Action Items ({tasks.length})
            </h3>

            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                  task.is_completed
                    ? 'bg-slate-900/40 border-slate-800/50 opacity-60'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.is_completed}
                    onChange={() => handleToggleTask(task)}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500 cursor-pointer"
                  />
                  <div>
                    <h4 className={`text-xs font-medium text-slate-200 ${task.is_completed ? 'line-through text-slate-500' : ''}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span className="font-mono text-emerald-400">{task.category}</span>
                      <span>•</span>
                      <span className={task.priority === 'high' ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                        {task.priority.toUpperCase()}
                      </span>
                      <span>•</span>
                      <span>{task.deadline || 'No deadline'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: AI Daily Schedule & Tips (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Recommended Daily Schedule */}
          <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              AI Optimized Daily Schedule
            </h3>

            <div className="space-y-2.5">
              {stats.suggested_daily_schedule?.map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono text-emerald-400 font-semibold block text-[11px]">{item.time}</span>
                    <span className="text-slate-200 text-xs mt-0.5 block">{item.activity}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono shrink-0 ${
                    item.energy === 'High' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.energy} Energy
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Productivity Tips */}
          <div className="bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Productivity Protocols
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              {stats.ai_productivity_tips?.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

