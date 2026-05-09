"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDemoAssessment, saveDemoProgram, getDemoSavedPrograms } from "@/lib/demo-storage";
import { matchPrograms } from "@/lib/matching-engine";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { BrainCircuit, Bookmark, BookmarkCheck, ArrowRight, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  const router = useRouter();
  const [assessment, setAssessment] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [savedPrograms, setSavedPrograms] = useState<string[]>([]);

  useEffect(() => {
    const data = getDemoAssessment();
    if (!data) {
      router.push("/assessment");
      return;
    }
    setAssessment(data);
    const matches = matchPrograms(data);
    setRecommendations(matches.slice(0, 5)); // Top 5
    setSavedPrograms(getDemoSavedPrograms());
  }, [router]);

  const handleSaveProgram = (id: string) => {
    saveDemoProgram(id);
    setSavedPrograms(getDemoSavedPrograms());
  };

  if (!assessment) return <div className="min-h-screen flex items-center justify-center">Loading your DNA...</div>;

  const topInterests = Object.keys(assessment.interests || {}).filter(k => assessment.interests[k]);
  const topSkills = Object.entries(assessment.skills || {})
    .sort(([, a]: any, [, b]: any) => b - a)
    .slice(0, 3)
    .map(([k]) => k);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 text-blue-100">
              <BrainCircuit className="w-6 h-6" />
              <span className="font-semibold uppercase tracking-wider text-sm">Your Career DNA Profile</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ready for your future.</h1>
            <p className="text-xl text-blue-50 max-w-2xl leading-relaxed">
              Based on your answers, you lean towards <span className="font-semibold">{topInterests[0] || "General"}</span> and <span className="font-semibold">{topInterests[1] || "Management"}</span>. 
              Your strongest assets are your <span className="font-semibold">{topSkills.join(", ")}</span> skills.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <BrainCircuit className="w-96 h-96" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* DNA Summary Side */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Top Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {topInterests.length > 0 ? topInterests.map(i => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">{i}</span>
                )) : <span className="text-slate-500 text-sm">None selected</span>}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Core Strengths</h3>
              <div className="space-y-3">
                {topSkills.map((s: string) => (
                  <div key={s}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700">{s}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(assessment.skills[s] / 5) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">Work Style</h3>
              <ul className="space-y-2">
                {assessment.workStyle?.map((w: string, i: number) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations Side */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-between">
              Top Recommended Programs
              <span className="text-sm font-normal text-slate-500 bg-white px-3 py-1 rounded-full border">Matches found: {recommendations.length}</span>
            </h2>

            <div className="space-y-4">
              {recommendations.map((rec, index) => {
                const program = getProgramWithUniversity(rec.programId);
                if (!program) return null;
                const isSaved = savedPrograms.includes(program.id);

                return (
                  <div key={program.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-bold rounded text-white ${index === 0 ? "bg-emerald-500" : "bg-blue-500"}`}>
                            {rec.matchScore}% Match
                          </span>
                          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {program.field_category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{program.program_name}</h3>
                        <p className="text-slate-600">{program.university?.name}</p>
                      </div>
                      <button 
                        onClick={() => handleSaveProgram(program.id)}
                        className={`p-2 rounded-full transition-colors ${isSaved ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50"}`}
                        title={isSaved ? "Saved" : "Save to board"}
                      >
                        {isSaved ? <BookmarkCheck className="w-6 h-6" /> : <Bookmark className="w-6 h-6" />}
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="text-sm">
                        <span className="text-emerald-700 font-bold block mb-1">Strong match because:</span>
                        <ul className="space-y-1">
                          {rec.reasons.map((r: string, i: number) => (
                            <li key={i} className="flex items-start gap-1.5 text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm">
                        <span className="text-orange-700 font-bold block mb-1">Potential concern:</span>
                        <ul className="space-y-1">
                          {rec.concerns.length > 0 ? rec.concerns.map((c: string, i: number) => (
                            <li key={i} className="flex items-start gap-1.5 text-slate-700">
                              <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" /> {c}
                            </li>
                          )) : <li className="text-slate-500 italic">No major concerns found.</li>}
                        </ul>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-6 pt-4 border-t border-slate-100">
                      <div className="text-sm">
                        <span className="text-slate-500 block mb-1 font-medium">Skills you should develop:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.skillsToDevelop && rec.skillsToDevelop.length > 0 ? rec.skillsToDevelop.map((s: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs">{s}</span>
                          )) : <span className="text-slate-500 italic">You are highly skilled for this path.</span>}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-500 block mb-1 font-medium">Possible Career Outcomes:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {program.career_outcomes.slice(0, 3).map((c: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 mb-4 text-sm border border-slate-100">
                      <span className="font-bold text-slate-800">Suggested first step: </span>
                      <span className="text-slate-600">Before choosing this path, you should check the exact admission score requirements for the {program.faculty} at {program.university?.short_name} and explore introductory courses in {program.interest_tags[0]}.</span>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100 items-center justify-between">
                      <Link 
                        href={`/programs/${program.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        View Full Details <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                      <span className="text-xs font-bold text-slate-400">
                        CONFIDENCE LEVEL: {rec.matchScore >= 80 ? "HIGH" : rec.matchScore >= 60 ? "MEDIUM" : "LOW"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
              <h3 className="font-bold text-slate-900 mb-2">Want to compare these programs?</h3>
              <p className="text-slate-600 text-sm mb-4">Add them to your decision board to weigh pros and cons.</p>
              <Link 
                href="/decision-board"
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Go to Decision Board
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add the missing import at the top
import { CheckCircle2 } from "lucide-react";
