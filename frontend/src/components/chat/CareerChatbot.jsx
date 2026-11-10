import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';

export default function CareerChatbot() {
  const { addNotification } = useApp();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello Alex! I am your AI Career and Productivity Coach, powered by Gemini. Ask me anything about tailoring your resume, mastering technical or behavioral interviews, closing skill gaps, or optimizing your daily engineering productivity."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "How can I tailor my resume bullet points for a Senior AI Engineer JD?",
    "Explain the STAR method for behavioral interview questions with an example.",
    "What are the top 3 high-impact skills I should learn next for high market demand?",
    "How do I structure my morning schedule for uninterrupted deep work?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageToSend = null) => {
    const text = messageToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.sendChatMessage(text, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: res.reply }]);
    } catch {
      // Fallback
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "To maximize your career velocity: 1) Anchor each resume bullet with quantifiable metrics (e.g. 'reduced latency by 35%'). 2) Mirror the exact technical keywords from target JDs. 3) Dedicate 90 morning minutes daily to deep-work skill mastery."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden p-6 text-slate-100 bg-[#0b101e]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">AI Career & Productivity Chatbot</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time conversational mentor powered by Google Gemini API.
          </p>
        </div>

        <button
          onClick={() => setMessages([{
            role: 'assistant',
            content: "Hello! How can I assist with your career or daily productivity goals today?"
          }])}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-2">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={index}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isUser
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs'
                  : 'bg-slate-800 border border-slate-700 text-emerald-400'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                isUser
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'bg-[#121a2d]/90 border border-slate-800 text-slate-200 shadow-lg'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#121a2d] border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
              <span>Gemini is generating response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Pills */}
      <div className="pt-2 pb-3 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <span className="text-[11px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Quick Prompts:
          </span>
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors whitespace-nowrap text-[11px]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="shrink-0 flex items-center gap-3 bg-[#121a2d]/90 border border-slate-800 rounded-2xl p-2.5 shadow-xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about career planning, resume tailoring, mock interviews, or productivity..."
          className="flex-1 bg-transparent px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>

    </div>
  );
}

