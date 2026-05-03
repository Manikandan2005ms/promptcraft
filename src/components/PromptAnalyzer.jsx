import React, { useState } from 'react';
import { ShieldCheck, Search, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function PromptAnalyzer() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);

  const analyzePrompt = () => {
    if (!prompt.trim()) return;

    let score = 0;
    const feedback = [];
    const lowerText = prompt.toLowerCase();

    // 1. Length & Depth (Max 15)
    if (prompt.length > 500) {
      score += 15;
      feedback.push({ msg: "Excellent depth and detail.", type: "success" });
    } else if (prompt.length > 200) {
      score += 10;
      feedback.push({ msg: "Sufficient length.", type: "success" });
    } else {
      score += 2;
      feedback.push({ msg: "Too brief. Lacks depth for complex tasks.", type: "error" });
    }

    // 2. Persona / Role (Max 15)
    if (lowerText.includes("act as") || lowerText.includes("persona") || lowerText.includes("you are a")) {
      score += 15;
      feedback.push({ msg: "Strong persona definition.", type: "success" });
    } else {
      feedback.push({ msg: "Missing clear expert persona.", type: "error" });
    }

    // 3. Structure & Delimiters (Max 15)
    if (prompt.includes("###") || prompt.includes("---") || (prompt.includes("<") && prompt.includes(">"))) {
      score += 15;
      feedback.push({ msg: "Great use of structural delimiters.", type: "success" });
    } else {
      feedback.push({ msg: "Lacks structural markers (###, XML, etc).", type: "warning" });
    }

    // 4. Negative Constraints (Max 15)
    if (lowerText.includes("do not") || lowerText.includes("avoid") || lowerText.includes("negative") || lowerText.includes("constraints")) {
      score += 15;
      feedback.push({ msg: "Negative constraints defined.", type: "success" });
    } else {
      feedback.push({ msg: "No negative constraints found.", type: "warning" });
    }

    // 5. Few-Shot Examples (Max 15)
    if (lowerText.includes("example") || lowerText.includes("instance") || lowerText.includes("sample")) {
      score += 15;
      feedback.push({ msg: "Few-shot examples detected.", type: "success" });
    } else {
      feedback.push({ msg: "Missing examples for better context.", type: "warning" });
    }

    // 6. Reasoning / CoT (Max 15)
    if (lowerText.includes("step by step") || lowerText.includes("think") || lowerText.includes("reasoning")) {
      score += 15;
      feedback.push({ msg: "Chain-of-Thought reasoning requested.", type: "success" });
    } else {
      feedback.push({ msg: "No reasoning path specified.", type: "warning" });
    }

    // 7. Output Format (Max 10)
    if (lowerText.includes("json") || lowerText.includes("table") || lowerText.includes("markdown") || lowerText.includes("format:")) {
      score += 10;
      feedback.push({ msg: "Clear output format instructions.", type: "success" });
    } else {
      feedback.push({ msg: "Vague output formatting.", type: "error" });
    }

    // Conversational Filler Penalty
    if (lowerText.includes("please") || lowerText.includes("can you")) {
      score -= 5;
      feedback.push({ msg: "Avoid conversational filler like 'please'. Be direct.", type: "warning" });
    }

    // THE TOUGH CAP: Max 99
    const finalScore = Math.max(0, Math.min(score, 99));
    
    let label = "Novice (Needs Work)";
    let color = "text-red-500";
    if (finalScore > 90) { label = "PROMPT GOD (Legendary)"; color = "text-emerald-500"; }
    else if (finalScore > 75) { label = "Architect (Elite)"; color = "text-teal-500"; }
    else if (finalScore > 50) { label = "Practitioner (Good)"; color = "text-amber-500"; }

    setResult({ score: finalScore, feedback, label, color });
  };

  return (
    <section id="analyzer" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/50 dark:bg-gray-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
              Expert Mode
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Prompt <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">Analyzer</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Analyze your prompt against professional engineering standards.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                className="w-full h-48 bg-black/40 border border-gray-800 rounded-2xl p-6 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all resize-none font-medium"
              />
            </div>

            <button
              onClick={analyzePrompt}
              className="w-full bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transform active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
            >
              <ShieldCheck className="w-6 h-6" />
              Run Rigorous Analysis
            </button>

            {result && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col items-center mb-8">
                  <div className="text-7xl font-black mb-2 flex items-baseline gap-1">
                    <span className={result.color}>{result.score}</span>
                    <span className="text-2xl text-gray-600">/100</span>
                  </div>
                  <div className={`text-sm font-bold tracking-widest uppercase ${result.color}`}>
                    {result.label}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-gray-800 pt-8">
                  {result.feedback.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      {f.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                      {f.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />}
                      {f.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
                      <span className="text-sm text-gray-300">{f.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
