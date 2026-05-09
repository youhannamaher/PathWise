"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDemoAssessment, getDemoSavedPrograms } from "@/lib/demo-storage";
import { BrainCircuit, BookOpen, Map, MessageSquare, Lock, ArrowRight, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [hasAssessment, setHasAssessment] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    setHasAssessment(!!getDemoAssessment());
    setSavedCount(getDemoSavedPrograms().length);
  }, []);

  const futureModules = [
    { title: "Living CV", desc: "Auto-updating resume based on your progress.", icon: BookOpen },
    { title: "Job Matching", desc: "Find internships that fit your skills.", icon: TrendingUp },
    { title: "Course Marketplace", desc: "Fill your skill gaps with targeted courses.", icon: BookOpen },
    { title: "Mentor Matching", desc: "Connect with professionals in your target field.", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Welcome back.</h1>
            <p className="text-slate-600 text-lg">Here is an overview of your academic journey.</p>
          </div>
        </div>

        {/* Core Journey Status */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Current Journey: Before University</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Career DNA</h3>
            </div>
            {hasAssessment ? (
              <div className="mt-auto relative z-10">
                <p className="text-emerald-600 font-medium mb-4 flex items-center gap-1.5 text-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed
                </p>
                <Link href="/results/latest" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 text-sm">
                  View Full Report <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ) : (
              <div className="mt-auto relative z-10">
                <p className="text-slate-500 text-sm mb-4">Not created yet. Start to find your path.</p>
                <Link href="/assessment" className="inline-flex w-full justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm">
                  Start Assessment
                </Link>
              </div>
            )}
            <BrainCircuit className="w-32 h-32 absolute -right-6 -bottom-6 text-slate-50 opacity-50" />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                <Map className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Programs & Board</h3>
            </div>
            <div className="mt-auto relative z-10">
              <p className="text-slate-700 font-medium text-2xl mb-1">{savedCount}</p>
              <p className="text-slate-500 text-sm mb-4">Programs saved for comparison</p>
              <Link href="/decision-board" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 text-sm">
                Open Decision Board <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <Map className="w-32 h-32 absolute -right-6 -bottom-6 text-slate-50 opacity-50" />
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden bg-gradient-to-br from-blue-600 to-violet-600 text-white">
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-lg">AI Coach</h3>
            </div>
            <div className="mt-auto relative z-10">
              <p className="text-blue-100 text-sm mb-4">Need help deciding? Your AI coach is ready.</p>
              <Link href="/coach" className="inline-flex w-full justify-center px-4 py-2 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
                Chat Now
              </Link>
            </div>
          </div>
          
        </div>

        {/* Future Vision Status */}
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Lifelong Journey</h2>
          <span className="px-3 py-1 bg-slate-200 text-slate-600 text-xs font-bold uppercase rounded-full tracking-wider">Coming Soon</span>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {futureModules.map((mod, i) => (
            <div key={i} className="bg-slate-100/50 rounded-2xl p-5 border border-slate-200 relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <mod.icon className="w-8 h-8 text-slate-400 mb-4" />
              <h4 className="font-bold text-slate-700 mb-2">{mod.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
