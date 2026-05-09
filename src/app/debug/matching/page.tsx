"use client";

import { useState } from "react";
import { matchPrograms, AssessmentAnswers } from "@/lib/matching-engine";
import { getProgramWithUniversity } from "@/lib/seed-data";
import { Beaker } from "lucide-react";

export default function DebugMatchingPage() {
  const [results, setResults] = useState<any[]>([]);
  const [activeProfile, setActiveProfile] = useState("");

  const runTest = (profileName: string, answers: AssessmentAnswers) => {
    setActiveProfile(profileName);
    const matches = matchPrograms(answers);
    setResults(matches.slice(0, 10)); // Show top 10
  };

  const PROFILES = [
    {
      name: "Medical/Helper Student",
      answers: {
        interests: { "Helping & caring for people": true, "Science & research": true, "Biology": true },
        skills: { "Problem solving": 4, "Communication": 5 },
        workStyle: ["I prefer practical work over theory.", "I prefer stable careers."],
        constraints: { location: "Any location in Egypt", budget: "Medium-High", language: "English" },
        careerGoals: ["Stability", "Helping people"]
      } as AssessmentAnswers
    },
    {
      name: "Tech/Coding Student",
      answers: {
        interests: { "Technology & coding": true, "Math": true, "Computer Science": true },
        skills: { "Technology usage": 5, "Mathematics": 5 },
        workStyle: ["I enjoy solving complex problems.", "I prefer fast-growing fields."],
        constraints: { location: "Any location in Egypt", budget: "Low", language: "English" },
        careerGoals: ["High salary", "Technology future"]
      } as AssessmentAnswers
    },
    {
      name: "Business/Leadership Student",
      answers: {
        interests: { "Business & management": true, "Finance & numbers": true, "Business": true },
        skills: { "Leadership": 5, "Communication": 4 },
        workStyle: ["I prefer working with people.", "I like structured tasks."],
        constraints: { location: "Cairo", budget: "High", language: "English" },
        careerGoals: ["High salary", "Building businesses"]
      } as AssessmentAnswers
    },
    {
      name: "Creative/Media Student",
      answers: {
        interests: { "Design & creativity": true, "Media & communication": true, "Art/Design": true },
        skills: { "Creativity": 5, "Writing": 4 },
        workStyle: ["I like exploring new ideas.", "I prefer working with people."],
        constraints: { location: "Any location in Egypt", budget: "Medium-High", language: "English" },
        careerGoals: ["Creativity", "Flexible work"]
      } as AssessmentAnswers
    },
    {
      name: "Law/Politics Student",
      answers: {
        interests: { "Debate & justice": true, "History/Politics": true, "Languages": true },
        skills: { "Writing": 5, "Communication": 5, "Analytical thinking": 4 },
        workStyle: ["I prefer stable careers.", "I prefer working with people."],
        constraints: { location: "Cairo", budget: "Low", language: "English" },
        careerGoals: ["Stability", "Helping people"]
      } as AssessmentAnswers
    },
    {
      name: "Engineering Student",
      answers: {
        interests: { "Building & fixing things": true, "Physics": true, "Math": true },
        skills: { "Mathematics": 5, "Problem solving": 5 },
        workStyle: ["I prefer practical work over theory.", "I like structured tasks."],
        constraints: { location: "Any location in Egypt", budget: "Medium", language: "English" },
        careerGoals: ["Stability", "High salary"]
      } as AssessmentAnswers
    },
    {
      name: "Psychology/Education Student",
      answers: {
        interests: { "Understanding human behavior": true, "Teaching & guiding": true, "Psychology": true },
        skills: { "Communication": 5, "Teamwork": 5 },
        workStyle: ["I prefer working with people.", "I prefer stable careers."],
        constraints: { location: "Any location in Egypt", budget: "Low", language: "English" },
        careerGoals: ["Helping people", "Stability"]
      } as AssessmentAnswers
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Beaker className="w-8 h-8 text-violet-600" /> Matching Engine Debugger
        </h1>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-3">
            <h2 className="font-bold text-slate-700 uppercase text-sm tracking-wider mb-4">Test Profiles</h2>
            {PROFILES.map((p, i) => (
              <button
                key={i}
                onClick={() => runTest(p.name, p.answers)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${activeProfile === p.name ? "bg-violet-600 text-white border-violet-700 shadow-md" : "bg-white border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700"}`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="md:col-span-3">
            {activeProfile ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 text-white p-6">
                  <h2 className="text-xl font-bold">Results for: {activeProfile}</h2>
                  <p className="text-slate-400 text-sm mt-1">Showing top 10 recommended programs</p>
                </div>
                <div className="p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-slate-700">Rank</th>
                        <th className="p-4 font-bold text-slate-700">Score</th>
                        <th className="p-4 font-bold text-slate-700">Program Name</th>
                        <th className="p-4 font-bold text-slate-700">University</th>
                        <th className="p-4 font-bold text-slate-700">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((rec, i) => {
                        const p = getProgramWithUniversity(rec.programId);
                        if (!p) return null;
                        return (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4 font-bold text-slate-500">#{i + 1}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${rec.matchScore > 75 ? "bg-emerald-100 text-emerald-700" : rec.matchScore > 50 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"}`}>
                                {rec.matchScore}%
                              </span>
                            </td>
                            <td className="p-4 font-semibold text-slate-900">{p.program_name}</td>
                            <td className="p-4 text-slate-600">{p.university?.short_name}</td>
                            <td className="p-4 text-slate-500">{p.field_category}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                Select a profile on the left to run the matching engine.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
