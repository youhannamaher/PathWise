"use client";

import { useState } from "react";
import Link from "next/link";
import { seedPrograms, seedUniversities } from "@/lib/seed-data";
import { Search, MapPin, Building2, Bookmark, BookmarkCheck } from "lucide-react";
import { getDemoSavedPrograms, saveDemoProgram, removeDemoProgram } from "@/lib/demo-storage";
import { useEffect } from "react";

export default function ProgramsExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  const [savedPrograms, setSavedPrograms] = useState<string[]>([]);

  useEffect(() => {
    setSavedPrograms(getDemoSavedPrograms());
  }, []);

  const handleSaveToggle = (id: string) => {
    if (savedPrograms.includes(id)) {
      removeDemoProgram(id);
    } else {
      saveDemoProgram(id);
    }
    setSavedPrograms(getDemoSavedPrograms());
  };

  const filteredPrograms = seedPrograms.filter(p => {
    const matchesSearch = p.program_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          seedUniversities.find(u => u.id === p.university_id)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = filterField ? p.field_category.includes(filterField) : true;
    const matchesBudget = filterBudget ? p.budget_tier === filterBudget : true;
    return matchesSearch && matchesField && matchesBudget;
  });

  const uniqueFields = Array.from(new Set(seedPrograms.map(p => p.field_category.split(' ')[0])));
  
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore Programs</h1>
          <p className="text-slate-600 text-lg">Discover and compare real university programs in Egypt.</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search programs or universities..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="py-3 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterField}
            onChange={e => setFilterField(e.target.value)}
          >
            <option value="">All Fields</option>
            {uniqueFields.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <select 
            className="py-3 px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={filterBudget}
            onChange={e => setFilterBudget(e.target.value)}
          >
            <option value="">All Budgets</option>
            <option value="Medium">Medium</option>
            <option value="Medium-High">Medium-High</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(program => {
            const uni = seedUniversities.find(u => u.id === program.university_id);
            const isSaved = savedPrograms.includes(program.id);
            return (
              <div key={program.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                      {program.field_category}
                    </span>
                    <button 
                      onClick={() => handleSaveToggle(program.id)}
                      className={`p-1.5 rounded-full transition-colors ${isSaved ? "text-emerald-500 bg-emerald-50" : "text-slate-400 hover:bg-slate-100"}`}
                    >
                      {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{program.program_name}</h3>
                  
                  <div className="space-y-2 mt-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{uni?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{program.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-sm">
                  <div className="font-medium text-slate-700">
                    {program.budget_tier} Cost
                  </div>
                  <Link 
                    href={`/programs/${program.id}`}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            );
          })}
          {filteredPrograms.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              No programs found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
