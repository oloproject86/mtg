
import React, { useState } from 'react';
import { getFinancialAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIService: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: prompt };
    setMessages(prev => [...prev, userMsg]);
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await getFinancialAdvice(prompt);
      setMessages(prev => [...prev, { role: 'model', text: response || 'No advice generated.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to the strategist. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-brand-dark p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="font-display font-bold text-xl uppercase tracking-tight">AI Financial Strategist</h3>
          <p className="text-white/60 text-xs font-mono">Real-time analytical consultation</p>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50 overflow-touch">
        <div className="sticky top-0 bg-slate-50/80 backdrop-blur-sm pb-4 mb-2 border-b border-black/5 z-10">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">Chat with AI Strategist</h4>
        </div>

        {messages.length === 0 && (
          <div className="h-[calc(100%-60px)] flex flex-col items-center justify-center text-center opacity-40 py-10">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <p className="font-mono text-sm">Input your financial query to begin<br/>a strategic simulation.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
              ? 'bg-brand-accent text-white rounded-tr-none' 
              : 'bg-white border border-black/5 rounded-tl-none font-mono text-brand-text'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-2">
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-brand-accent rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-black/10 bg-white flex gap-2">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask about ROI, risk, or cashflow..."
          className="flex-1 px-4 py-3 bg-slate-100 border-none rounded-xl outline-none focus:ring-2 focus:ring-brand-accent transition-all font-mono text-sm"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-brand-dark text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </form>
    </div>
  );
};

export default AIService;
