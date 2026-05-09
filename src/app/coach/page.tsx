"use client";

import { useState, useEffect, useRef } from "react";
import { getDemoAssessment, getDemoSavedPrograms, getDemoDecisionBoard } from "@/lib/demo-storage";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

export default function CoachPage() {
  const [messages, setMessages] = useState<{role: 'user'|'model', content: string}[]>([
    {
      role: 'model',
      content: "Hi! I'm your PathWise AI Coach. I've reviewed your Career DNA and saved programs. How can I help you choose your path today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contextData, setContextData] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gather context for AI
    const assessment = getDemoAssessment();
    const savedIds = getDemoSavedPrograms();
    const decisionBoard = getDemoDecisionBoard();
    
    const savedProgramsDetails = savedIds.map(id => getProgramWithUniversity(id)).filter(Boolean);
    
    setContextData({
      assessment,
      savedPrograms: savedProgramsDetails,
      decisionBoard
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(1), // Exclude initial greeting from history to save tokens or keep it? Keeping it out is fine.
          contextData
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'model', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', content: "Sorry, I encountered an error processing that." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, there was a network error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      <div className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">PathWise AI Coach</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" /> Powered by Gemini
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white shadow-sm border border-slate-100 rounded-tl-none text-slate-700'}`}>
                {msg.content.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white shadow-sm border border-slate-100 rounded-2xl rounded-tl-none p-4 text-slate-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4">
        <div className="max-w-3xl mx-auto relative flex items-center">
          <input 
            type="text" 
            placeholder="Ask about programs, compare options, or get career advice..."
            className="w-full bg-slate-100 border-none rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
