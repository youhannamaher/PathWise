"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { getDemoSavedPrograms, saveDemoProgram, removeDemoProgram } from "@/lib/demo-storage";
import { Bookmark, BookmarkCheck, ArrowLeft, MapPin, Clock, Languages, Wallet, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function ProgramDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') {
      const p = getProgramWithUniversity(id);
      if (p) {
        setProgram(p);
        setIsSaved(getDemoSavedPrograms().includes(id));
      } else {
        router.push("/programs");
      }
    }
  }, [id, router]);

  const handleSaveToggle = () => {
    if (!program) return;
    if (isSaved) {
      removeDemoProgram(program.id);
    } else {
      saveDemoProgram(program.id);
    }
    setIsSaved(!isSaved);
  };

  if (!program) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        
        <Link href="/programs" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Programs
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-bold rounded-full">
                  {program.field_category}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                  {program.university?.type}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{program.program_name}</h1>
              <h2 className="text-xl text-slate-600 font-medium">{program.university?.name}</h2>
            </div>
            <button 
              onClick={handleSaveToggle}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${isSaved ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"}`}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              {isSaved ? "Saved" : "Save Program"}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Duration</p>
                <p className="font-semibold text-slate-900 text-sm">{program.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Location</p>
                <p className="font-semibold text-slate-900 text-sm">{program.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Language</p>
                <p className="font-semibold text-slate-900 text-sm">{program.language}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Budget Tier</p>
                <p className="font-semibold text-slate-900 text-sm">{program.budget_tier}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" /> Requirements & Admission
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">{program.requirements_summary}</p>
              
              <div className="bg-orange-50 text-orange-800 p-4 rounded-xl text-sm border border-orange-100">
                <span className="font-semibold">Fee Note: </span>{program.approximate_fee_note}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Career Outcomes
              </h3>
              <div className="flex flex-wrap gap-2">
                {program.career_outcomes.map((career: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Skills Needed</h3>
              <ul className="space-y-2">
                {program.skills_needed.map((skill: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Best For Students Who:</h3>
              <ul className="space-y-2">
                {program.best_for.map((trait: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                    {trait}
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              href="/decision-board" 
              className="block w-full text-center px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-lg"
            >
              Add to Decision Board
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
