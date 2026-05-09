"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { saveDemoAssessment } from "@/lib/demo-storage";
import { ArrowLeft, ArrowRight, CheckCircle2, BrainCircuit } from "lucide-react";

const STEPS = [
  "Interests",
  "Skills",
  "Work Style",
  "Constraints",
  "Career Goals"
];

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [interests, setInterests] = useState<Record<string, boolean>>({});
  const [skills, setSkills] = useState<Record<string, number>>({});
  const [workStyle, setWorkStyle] = useState<string[]>([]);
  const [constraints, setConstraints] = useState({
    location: "",
    budget: "",
    language: ""
  });
  const [careerGoals, setCareerGoals] = useState<string[]>([]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const assessmentData = {
      interests,
      skills,
      workStyle,
      constraints,
      careerGoals,
      timestamp: new Date().toISOString()
    };
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    
    saveDemoAssessment(assessmentData);
    router.push("/results/latest");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">What activities do you enjoy the most?</h2>
              <p className="text-slate-500 mb-6">Select all that apply.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "Business & management", "Technology & coding", "Design & creativity", 
                  "Helping & caring for people", "Science & research", "Finance & numbers",
                  "Building & fixing things", "Debate & justice", "Media & communication",
                  "Teaching & guiding", "Understanding human behavior", "Learning languages"
                ].map(item => (
                  <button
                    key={item}
                    onClick={() => setInterests(prev => ({ ...prev, [item]: !prev[item] }))}
                    className={`p-3 rounded-xl border-2 text-left transition-all text-sm ${interests[item] ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item}</span>
                      {interests[item] && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 ml-2" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Which subjects do you enjoy most?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Math", "Business", "Computer Science", "Biology", 
                  "Languages", "Art/Design", "Physics", "Chemistry", 
                  "History/Politics", "Psychology"
                ].map(item => (
                  <button
                    key={item}
                    onClick={() => setInterests(prev => ({ ...prev, [item]: !prev[item] }))}
                    className={`p-3 rounded-xl border-2 text-center transition-all text-sm ${interests[item] ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    <span className="font-medium">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">How confident are you in these skills?</h2>
              <p className="text-slate-500 mb-6">Rate from 1 (Not confident) to 5 (Very confident).</p>
            </div>
            {["Problem solving", "Communication", "Analytical thinking", "Creativity", "Leadership", "Technology usage", "Mathematics", "Writing", "Teamwork", "Organization"].map(skill => (
              <div key={skill} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm gap-4">
                <span className="font-medium text-slate-700">{skill}</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setSkills(prev => ({ ...prev, [skill]: rating }))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${skills[skill] === rating ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">What describes your preferred work style?</h2>
              <p className="text-slate-500 mb-6">Select up to 3 that fit you best.</p>
              <div className="grid gap-3">
                {[
                  "I prefer practical work over theory.",
                  "I enjoy solving complex problems.",
                  "I prefer working with people.",
                  "I like structured tasks.",
                  "I like exploring new ideas.",
                  "I prefer stable careers.",
                  "I prefer fast-growing fields."
                ].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      if (workStyle.includes(item)) {
                        setWorkStyle(workStyle.filter(i => i !== item));
                      } else if (workStyle.length < 3) {
                        setWorkStyle([...workStyle, item]);
                      }
                    }}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${workStyle.includes(item) ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item}</span>
                      {workStyle.includes(item) && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-4">Let's narrow down your options</h2>
            
            <div className="space-y-3">
              <label className="font-semibold text-slate-700">Preferred Location</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Cairo", "New Cairo", "Giza / Sheikh Zayed / 6 October", "Any location in Egypt", "Abroad later"].map(loc => (
                  <button
                    key={loc}
                    onClick={() => setConstraints({ ...constraints, location: loc })}
                    className={`p-3 rounded-lg border text-left transition-all ${constraints.location === loc ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-slate-700">Budget Tier</label>
              <div className="grid grid-cols-2 gap-3">
                {["Low", "Medium", "Medium-High", "High", "Very High"].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setConstraints({ ...constraints, budget: tier })}
                    className={`p-3 rounded-lg border text-center transition-all ${constraints.budget === tier ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-semibold text-slate-700">Preferred Language of Study</label>
              <div className="grid grid-cols-3 gap-3">
                {["Arabic", "English", "French", "German", "No preference"].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setConstraints({ ...constraints, language: lang })}
                    className={`p-3 rounded-lg border text-center transition-all ${constraints.language === lang ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">What matters most to you in a career?</h2>
              <div className="grid grid-cols-2 gap-3">
                {["High salary", "Stability", "Creativity", "International opportunities", "Helping people", "Building businesses", "Technology future", "Flexible work"].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      if (careerGoals.includes(item)) {
                        setCareerGoals(careerGoals.filter(i => i !== item));
                      } else {
                        setCareerGoals([...careerGoals, item]);
                      }
                    }}
                    className={`p-3 rounded-lg border text-center transition-all ${careerGoals.includes(item) ? "border-blue-600 bg-blue-50 text-blue-900" : "border-slate-200 hover:border-blue-300"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
              <BrainCircuit className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to discover your Path?</h3>
              <p className="text-slate-600">We will analyze your answers and generate your personalized Career DNA report.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, i) => (
              <span key={step} className={`text-xs font-semibold ${i <= currentStep ? "text-blue-600" : "text-slate-400"}`}>
                {step}
              </span>
            ))}
          </div>
          <div className="h-2 flex bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 min-h-[500px] flex flex-col">
          <div className="flex-grow">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-slate-100">
            <button
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all ${currentStep === 0 ? "opacity-0 pointer-events-none" : "text-slate-600 hover:bg-slate-100"}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center px-8 py-3 rounded-full font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-70 shadow-md hover:shadow-blue-600/20"
            >
              {isSubmitting ? "Analyzing..." : currentStep === STEPS.length - 1 ? "Generate Report" : "Next"}
              {!isSubmitting && currentStep < STEPS.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
