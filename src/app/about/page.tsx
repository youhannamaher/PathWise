"use client";

import Image from "next/image";
import { Sparkles, Calendar, Users, GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        
        {/* Top Banner specific for the presentation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-12 relative overflow-hidden"
        >
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm font-bold tracking-widest uppercase mb-6">
              <Calendar className="w-4 h-4" /> 10 May 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Business Model Canvas <br /> <span className="text-blue-200">Presentation</span>
            </h1>
            <p className="text-xl text-blue-50 max-w-2xl mx-auto leading-relaxed font-medium">
              This website and product concept (PathWise) were exclusively created to showcase our final project presentation.
            </p>
          </div>
          <Sparkles className="w-64 h-64 absolute -left-12 -bottom-12 text-white opacity-10" />
          <Award className="w-64 h-64 absolute -right-12 -top-12 text-white opacity-10" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Supervision Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Under the Supervision of</h2>
            <h3 className="text-3xl font-black text-blue-600 mb-8">Dr. Nawal DAFFEUR</h3>
            
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-slate-50 shadow-xl">
              {/* Replace src with actual image name user puts in public folder */}
              <Image 
                src="/dr-nawal.jpg" 
                alt="Dr. Nawal DAFFEUR" 
                fill 
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://ui-avatars.com/api/?name=Nawal+DAFFEUR&background=0D8ABC&color=fff&size=200";
                }}
              />
            </div>
            <p className="text-slate-500 mt-6 font-medium">
              We extend our deepest gratitude for the continuous guidance, feedback, and support throughout this module.
            </p>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center flex flex-col h-full"
          >
            <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Meet The Team</h2>
            
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg mb-8 border-4 border-slate-50">
              {/* Replace src with actual image name user puts in public folder */}
              <Image 
                src="/group.jpg" 
                alt="PathWise Team" 
                fill 
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x400/f8fafc/64748b?text=Please+add+group.jpg+to+public+folder";
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                "Youhanna Maher",
                "Andre Nabil",
                "Youstina Magdy",
                "Rowaida Mandour",
                "Rawan Mohamed",
                "Sama Khaled"
              ].map((name, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="font-bold text-slate-700 text-sm">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
