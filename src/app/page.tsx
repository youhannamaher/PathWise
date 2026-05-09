"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, GraduationCap, Map, Compass, ShieldCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import { resetAllPathWiseData } from "@/lib/demo-storage";

export default function Home() {
  const router = useRouter();

  const handleStartFree = (e: React.MouseEvent) => {
    e.preventDefault();
    resetAllPathWiseData();
    window.location.href = "/assessment";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 lg:py-40 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
        <div className="container relative mx-auto text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Find the university path that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">actually fits you.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            PathWise helps students discover suitable majors, compare real university programs, and build a clear roadmap from school to career.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={handleStartFree}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/25 cursor-pointer"
            >
              Start My Career Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <Link 
              href="/programs" 
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all"
            >
              Explore Universities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why choosing is so hard</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Students today choose their futures based on scattered information, family pressure, random opinions, and incomplete knowledge.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Information Overload", desc: "Hundreds of new programs, AI degrees, and changing markets make it impossible to track.", icon: Map },
              { title: "External Pressure", desc: "Choosing a path just because 'it sounds good' or because friends are doing it.", icon: Compass },
              { title: "No Clear Roadmap", desc: "Entering a major without knowing the required skills or future job outcomes.", icon: ShieldCheck }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The PathWise Solution</h2>
              <p className="text-lg text-slate-600 mb-8">We take the guesswork out of your academic future using a data-driven, personalized approach.</p>
              <div className="space-y-6">
                {[
                  { title: "Career DNA Assessment", desc: "Discover your true interests, strengths, and work style.", icon: BrainCircuit },
                  { title: "Smart Program Matching", desc: "Get matched with real universities and programs in Egypt.", icon: GraduationCap },
                  { title: "Side-by-Side Comparison", desc: "Compare tuition, location, outcomes, and more in one place.", icon: Map },
                  { title: "AI-Powered Decisions", desc: "Chat with an AI coach that knows your profile and options.", icon: Compass }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 shrink-0 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-violet-50 rounded-3xl transform rotate-3" />
              <div className="relative bg-white border border-slate-100 shadow-xl rounded-3xl p-6 overflow-hidden">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <h4 className="font-bold text-slate-900">Your Top Matches</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Business Informatics", match: 89, color: "bg-emerald-500" },
                    { name: "Computer Science", match: 78, color: "bg-blue-500" },
                    { name: "Digital Business", match: 74, color: "bg-violet-500" },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <span className="font-medium text-slate-700">{m.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full ${m.color}`} style={{ width: `${m.match}%` }} />
                        </div>
                        <span className="font-bold text-slate-900">{m.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 bg-slate-900 text-white px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Beyond University</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
            PathWise is building a lifelong career ecosystem. The journey doesn't stop at admission.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Living CV", "Course Recommendations", "Job Matching", "Mentor Network"].map((feature, i) => (
              <div key={i} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                <div className="text-sm font-medium text-blue-400 mb-2">Coming Soon</div>
                <div className="font-bold">{feature}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-white mb-6">Start building your future direction today.</h2>
          <p className="text-blue-100 text-xl mb-10">Takes only 10 minutes. Free for students.</p>
          <button 
            onClick={handleStartFree}
            className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl cursor-pointer"
          >
            Start Assessment Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
