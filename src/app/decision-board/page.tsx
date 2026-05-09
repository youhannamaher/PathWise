"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDemoSavedPrograms, getDemoDecisionBoard, saveDemoDecisionBoardItem } from "@/lib/demo-storage";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { Plus, Trash2, HelpCircle, Save } from "lucide-react";

export default function DecisionBoard() {
  const [boardItems, setBoardItems] = useState<any[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [activeInput, setActiveInput] = useState<{programId: string, type: 'pros'|'cons'} | null>(null);

  useEffect(() => {
    setSavedIds(getDemoSavedPrograms());
    setBoardItems(getDemoDecisionBoard());
  }, []);

  const handleAddItem = (programId: string, type: 'pros'|'cons', text: string) => {
    if (!text.trim()) return;
    
    const existing = boardItems.find(b => b.program_id === programId) || { program_id: programId, pros: [], cons: [], final_score: 0 };
    const updated = {
      ...existing,
      [type]: [...(existing[type] || []), text]
    };
    
    saveDemoDecisionBoardItem(updated);
    setBoardItems(getDemoDecisionBoard());
    setNewItemText("");
    setActiveInput(null);
  };

  const handleRemoveItem = (programId: string, type: 'pros'|'cons', index: number) => {
    const existing = boardItems.find(b => b.program_id === programId);
    if (!existing) return;
    
    const updatedList = [...existing[type]];
    updatedList.splice(index, 1);
    
    const updated = {
      ...existing,
      [type]: updatedList
    };
    
    saveDemoDecisionBoardItem(updated);
    setBoardItems(getDemoDecisionBoard());
  };

  const handleScoreChange = (programId: string, score: number) => {
    const existing = boardItems.find(b => b.program_id === programId) || { program_id: programId, pros: [], cons: [] };
    const updated = { ...existing, final_score: score };
    saveDemoDecisionBoardItem(updated);
    setBoardItems(getDemoDecisionBoard());
  };

  if (savedIds.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Decision Board</h1>
        <p className="text-slate-600 mb-8">Save some programs first to start building your decision board.</p>
        <Link href="/programs" className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
          Explore Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Decision Board</h1>
            <p className="text-slate-600">List pros and cons, and assign a final score to make your choice.</p>
          </div>
          <Link href="/coach" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-blue-100 text-blue-700 font-medium rounded-xl hover:bg-blue-200 transition-colors">
            <HelpCircle className="w-5 h-5" /> Ask AI Coach
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedIds.map(id => {
            const p = getProgramWithUniversity(id);
            if (!p) return null;
            const boardData = boardItems.find(b => b.program_id === id) || { pros: [], cons: [], final_score: 0 };

            return (
              <div key={id} className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                <div className="p-6 bg-slate-900 text-white">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-1">{p.university?.short_name}</span>
                  <h2 className="text-xl font-bold leading-tight mb-4">{p.program_name}</h2>
                  
                  <div className="flex items-center justify-between bg-slate-800 rounded-xl p-3 border border-slate-700">
                    <span className="text-sm text-slate-300">Gut Feeling Score</span>
                    <select 
                      value={boardData.final_score || 0}
                      onChange={(e) => handleScoreChange(id, parseInt(e.target.value))}
                      className="bg-slate-700 text-white border-none rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500"
                    >
                      {[0,1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} / 10</option>)}
                    </select>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col gap-6">
                  {/* Pros */}
                  <div>
                    <h3 className="font-bold text-emerald-700 mb-3 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> Pros
                    </h3>
                    <ul className="space-y-2 mb-3">
                      {boardData.pros.map((pro: string, i: number) => (
                        <li key={i} className="flex justify-between items-start gap-2 text-sm bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                          <span className="text-slate-700">{pro}</span>
                          <button onClick={() => handleRemoveItem(id, 'pros', i)} className="text-slate-400 hover:text-red-500 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    {activeInput?.programId === id && activeInput?.type === 'pros' ? (
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          autoFocus
                          placeholder="Add a pro..."
                          className="flex-grow text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                          value={newItemText}
                          onChange={e => setNewItemText(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddItem(id, 'pros', newItemText)}
                        />
                        <button onClick={() => handleAddItem(id, 'pros', newItemText)} className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setActiveInput({programId: id, type: 'pros'})}
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Pro
                      </button>
                    )}
                  </div>

                  <div className="h-px bg-slate-100"></div>

                  {/* Cons */}
                  <div>
                    <h3 className="font-bold text-red-700 mb-3 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> Cons
                    </h3>
                    <ul className="space-y-2 mb-3">
                      {boardData.cons.map((con: string, i: number) => (
                        <li key={i} className="flex justify-between items-start gap-2 text-sm bg-red-50/50 p-2 rounded-lg border border-red-100">
                          <span className="text-slate-700">{con}</span>
                          <button onClick={() => handleRemoveItem(id, 'cons', i)} className="text-slate-400 hover:text-red-500 shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    {activeInput?.programId === id && activeInput?.type === 'cons' ? (
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          autoFocus
                          placeholder="Add a con..."
                          className="flex-grow text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                          value={newItemText}
                          onChange={e => setNewItemText(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddItem(id, 'cons', newItemText)}
                        />
                        <button onClick={() => handleAddItem(id, 'cons', newItemText)} className="p-1.5 bg-red-100 text-red-700 rounded-lg">
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setActiveInput({programId: id, type: 'cons'})}
                        className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Con
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
