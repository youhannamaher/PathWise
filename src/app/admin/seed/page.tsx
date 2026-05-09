"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { seedUniversities, seedPrograms } from "@/lib/seed-data";
import { Database, Loader2 } from "lucide-react";

export default function AdminSeedPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSeed = async () => {
    setIsLoading(true);
    setStatus("Seeding Universities...");
    
    try {
      // 1. Seed Universities
      const { error: uniError } = await supabase.from('universities').upsert(
        seedUniversities.map(u => ({
          ...u,
          // Convert our mock IDs back to UUIDs if needed, or rely on the local seed-data UUID structure
          id: u.id.length < 36 ? `11111111-1111-1111-1111-11111111111${u.id.replace('u', '')}` : u.id
        }))
      );
      
      if (uniError) throw uniError;

      setStatus("Seeding Programs...");
      
      // 2. Seed Programs
      const { error: progError } = await supabase.from('programs').upsert(
        seedPrograms.map(p => ({
          ...p,
          id: p.id.length < 36 ? `22222222-2222-2222-2222-22222222222${p.id.replace('p', '')}` : p.id,
          university_id: p.university_id.length < 36 ? `11111111-1111-1111-1111-11111111111${p.university_id.replace('u', '')}` : p.university_id
        }))
      );

      if (progError) throw progError;

      setStatus("Seeding complete! Data is ready in Supabase.");
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.message || 'Check console'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold">Database Seed Admin</h1>
        </div>
        
        <p className="text-slate-600 mb-8">
          This will inject the mock university and program data directly into your Supabase project. Make sure you have configured `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your `.env.local` file.
        </p>

        <button
          onClick={handleSeed}
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors mb-4"
        >
          {isLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Seeding...</> : "Run Supabase Seed"}
        </button>

        {status && (
          <div className={`p-4 rounded-xl text-sm font-medium ${status.includes("Error") ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
