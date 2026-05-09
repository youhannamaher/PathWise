"use client";

import { useEffect, useState } from "react";
import { getDemoAssessment, getDemoSavedPrograms, getDemoDecisionBoard } from "@/lib/demo-storage";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { matchPrograms } from "@/lib/matching-engine";
import { FileText, Printer, CheckCircle2, TrendingUp, Compass, Award } from "lucide-react";
import Link from "next/link";

export default function FinalReportPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const assessment = getDemoAssessment();
    const savedIds = getDemoSavedPrograms();
    const decisionBoard = getDemoDecisionBoard();
    
    if (assessment) {
      const matches = matchPrograms(assessment).slice(0, 3);
      const topPrograms = matches.map(m => ({ ...m, program: getProgramWithUniversity(m.programId) }));
      const savedPrograms = savedIds.map(id => getProgramWithUniversity(id));
      
      setData({ assessment, topPrograms, savedPrograms, decisionBoard });
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">No Data Available</h1>
        <p className="text-slate-600 mb-8">Please complete the assessment to generate a report.</p>
        <Link href="/assessment" className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700">
          Start Assessment
        </Link>
      </div>
    );
  }

  const { assessment, topPrograms, decisionBoard } = data;
  const topInterests = Object.keys(assessment.interests || {}).filter(k => assessment.interests[k]);

  return (
    <div className="min-h-screen bg-slate-200 py-12 px-4 print:py-0 print:bg-white print:p-0">
      <div className="max-w-[800px] mx-auto space-y-4">
        
        {/* Controls (Hidden when printing) */}
        <div className="flex justify-end gap-4 print:hidden mb-6">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Printer className="w-5 h-5" /> Print Report
          </button>
        </div>

        {/* Paper Sheet */}
        <div className="bg-white p-10 md:p-16 shadow-xl print:shadow-none print:p-0">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-8 mb-8 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <FileText className="w-8 h-8" />
                <span className="text-2xl font-black tracking-tight">PathWise</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mt-4">Personal Career Report</h1>
              <p className="text-slate-500 mt-2">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Section 1: DNA Summary */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" /> Career DNA Summary
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-700 mb-2">Core Interests</h3>
                <ul className="list-disc pl-5 text-slate-600">
                  {topInterests.map((i: string) => <li key={i}>{i}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-slate-700 mb-2">Work Style Preferences</h3>
                <ul className="list-disc pl-5 text-slate-600">
                  {assessment.workStyle?.map((w: string, idx: number) => <li key={idx}>{w}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: Top Matches */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-2">
              <Compass className="w-6 h-6 text-blue-600" /> Top Academic Paths
            </h2>
            <div className="space-y-6">
              {topPrograms.map((p: any, idx: number) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{p.program?.program_name}</h3>
                    <span className="font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full text-sm">{p.matchScore}% Match</span>
                  </div>
                  <p className="text-slate-600 font-medium mb-4">{p.program?.university?.name}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-slate-500 font-medium mb-1">Why it fits:</span>
                      <ul className="space-y-1">
                        {p.reasons.map((r: string, i: number) => (
                          <li key={i} className="flex items-start gap-1 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="block text-slate-500 font-medium mb-1">Career Outcomes:</span>
                      <div className="flex flex-wrap gap-1">
                        {p.program?.career_outcomes.slice(0, 3).map((c: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Recommended Action Plan */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b pb-2">
              <Award className="w-6 h-6 text-blue-600" /> Recommended Action Plan
            </h2>
            <div className="space-y-6">
              {[
                { title: "Review Admission Requirements", desc: `Check the exact high school score requirements for the top programs.` },
                { title: "Skill Preparation", desc: `Start building foundational skills in: ${Object.keys(assessment.skills || {}).slice(0, 2).join(', ')}.` },
                { title: "Campus Visits", desc: `Schedule visits or virtual tours for the top matched universities.` },
                { title: "Finalize Decision Board", desc: "Weigh the final pros and cons based on budget and location constraints." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{step.title}</h4>
                    <p className="text-slate-600 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            Powered by PathWise — The lifelong academic & career guidance platform.
          </div>

        </div>
      </div>
    </div>
  );
}
