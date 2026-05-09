"use client";

import { useState, useEffect, useRef } from "react";
import { getDemoAssessment, getDemoSavedPrograms, getDemoDecisionBoard } from "@/lib/demo-storage";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { Send, Bot, User, Sparkles, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";

type Message = {
  role: 'user' | 'model';
  content: string | React.ReactNode;
  options?: string[];
};

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hi! I'm your PathWise Guide. I can help you navigate the platform or give you a highly customized AI recommendation based on your unique profile. What would you like to do?",
      options: [
        "Help me find a major",
        "Compare my saved programs",
        "I want a custom AI recommendation"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiMode, setIsAiMode] = useState(false); // Controls when free-text is allowed
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

  const handleOptionClick = (option: string) => {
    // Add user's choice to chat
    setMessages(prev => {
      // Remove options from the last message
      const updatedPrev = [...prev];
      if (updatedPrev.length > 0) {
        updatedPrev[updatedPrev.length - 1].options = undefined;
      }
      return [...updatedPrev, { role: 'user', content: option }];
    });

    // Handle predefined paths
    setTimeout(() => {
      if (option === "Help me find a major") {
        setMessages(prev => [...prev, {
          role: 'model',
          content: (
            <span>
              The best way to find your major is to take our interactive assessment! It analyzes your personality and skills. <Link href="/assessment" className="text-blue-200 underline font-semibold">Click here to go to the Assessment</Link>. What else can I help with?
            </span>
          ),
          options: ["Compare my saved programs", "I want a custom AI recommendation"]
        }]);
      } else if (option === "Compare my saved programs") {
        setMessages(prev => [...prev, {
          role: 'model',
          content: (
            <span>
              You can view and weigh the pros and cons of your saved choices on your Decision Board. <Link href="/decision-board" className="text-blue-200 underline font-semibold">Go to Decision Board</Link>. What else can I help with?
            </span>
          ),
          options: ["Help me find a major", "I want a custom AI recommendation"]
        }]);
      } else if (option === "I want a custom AI recommendation") {
        setIsAiMode(true);
        setMessages(prev => [...prev, {
          role: 'model',
          content: "Awesome! Please write a detailed paragraph about yourself below. Mention your favorite subjects, hobbies, budget constraints, and dream career. Our AI will analyze your profile against our real university database and give you a custom path!"
        }]);
      }
    }, 600);
  };

  const handleSendAI = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Only send history from the point AI mode started to avoid confusing the AI with predefined chatbot menus
      const aiHistory = messages
        .filter(m => typeof m.content === 'string') // filter out react nodes
        .slice(-4) // just keep recent context
        .map(m => ({ role: m.role, content: m.content as string }));

      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: aiHistory,
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
            <h1 className="font-bold text-slate-900">PathWise Guide</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-500" /> Smart Assistant
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 mt-1 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`rounded-2xl p-4 ${msg.role === 'user' ? 'bg-slate-200 text-slate-800 rounded-tr-none' : 'bg-blue-600 text-white shadow-sm rounded-tl-none'}`}>
                  {typeof msg.content === 'string' ? (
                    msg.content.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>
                    ))
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
              
              {/* Options rendering */}
              {msg.options && msg.options.length > 0 && (
                <div className="ml-11 flex flex-col gap-2 mt-2">
                  {msg.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="text-left bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between group"
                    >
                      {opt}
                      <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              )}
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
            placeholder={isAiMode ? "Write your details to get a custom AI recommendation..." : "Select an option above to continue..."}
            className="w-full bg-slate-100 border-none rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendAI()}
            disabled={isLoading || !isAiMode}
          />
          <button 
            onClick={handleSendAI}
            disabled={!input.trim() || isLoading || !isAiMode}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
