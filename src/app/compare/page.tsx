"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDemoSavedPrograms } from "@/lib/demo-storage";
import { getProgramWithUniversity, seedPrograms } from "@/lib/seed-data";
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function ComparePage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const ids = getDemoSavedPrograms();
    setSavedIds(ids);
    setSelectedIds(ids.slice(0, 3)); // Auto-select up to 3
  }, []);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 4) {
        setSelectedIds([...selectedIds, id]);
      } else {
        alert("You can compare up to 4 programs at a time.");
      }
    }
  };

  const programsToCompare = selectedIds.map(id => getProgramWithUniversity(id)).filter(Boolean);

  if (savedIds.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Compare Programs</h1>
        <p className="text-slate-600 mb-8">You haven't saved any programs to compare yet.</p>
        <Link href="/programs" className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
          Explore Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Compare Programs</h1>

        {/* Selection Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <h3 className="font-semibold text-slate-700 mb-4">Select up to 4 programs to compare:</h3>
          <div className="flex flex-wrap gap-3">
            {savedIds.map(id => {
              const p = getProgramWithUniversity(id);
              if (!p) return null;
              const isSelected = selectedIds.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleSelection(id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${isSelected ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-blue-300"}`}
                >
                  {p.university?.short_name} - {p.program_name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Table */}
        {programsToCompare.length > 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-6 border-b border-slate-200 bg-slate-50 w-48 min-w-[200px]">Feature</th>
                  {programsToCompare.map((p: any) => (
                    <th key={p.id} className="p-6 border-b border-slate-200 border-l w-72 min-w-[280px]">
                      <div className="text-sm font-normal text-slate-500 mb-1">{p.university?.name}</div>
                      <div className="text-lg font-bold text-slate-900 leading-tight">{p.program_name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-6 border-b border-slate-100 font-semibold text-slate-700 bg-slate-50/50">Field</td>
                  {programsToCompare.map((p: any) => (
                    <td key={p.id} className="p-6 border-b border-l border-slate-100 text-slate-600">{p.field_category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-slate-100 font-semibold text-slate-700 bg-slate-50/50">Location</td>
                  {programsToCompare.map((p: any) => (
                    <td key={p.id} className="p-6 border-b border-l border-slate-100 text-slate-600">{p.location}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-slate-100 font-semibold text-slate-700 bg-slate-50/50">Duration</td>
                  {programsToCompare.map((p: any) => (
                    <td key={p.id} className="p-6 border-b border-l border-slate-100 text-slate-600">{p.duration}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-slate-100 font-semibold text-slate-700 bg-slate-50/50">Budget Tier</td>
                  {programsToCompare.map((p: any) => (
                    <td key={p.id} className="p-6 border-b border-l border-slate-100">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                        {p.budget_tier}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-b border-slate-100 font-semibold text-slate-700 bg-slate-50/50">Top Career Outcomes</td>
                  {programsToCompare.map((p: any) => (
                    <td key={p.id} className="p-6 border-b border-l border-slate-100">
                      <ul className="space-y-1 text-sm text-slate-600">
                        {p.career_outcomes.slice(0, 3).map((c: string, i: number) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-6 border-slate-100 font-semibold text-slate-700 bg-slate-50/50">Action</td>
                  {programsToCompare.map((p: any) => (
                    <td key={p.id} className="p-6 border-l border-slate-100">
                      <Link 
                        href={`/programs/${p.id}`}
                        className="inline-flex w-full justify-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 bg-white rounded-3xl border border-slate-100">
            Select at least one program to see details.
          </div>
        )}
      </div>
    </div>
  );
}
