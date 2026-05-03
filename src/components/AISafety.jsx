import { useState } from 'react';
import { ShieldCheck, ChevronDown, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { safetyPrinciples, safetyGuidelines, promptSafetyChecklist } from '../data/safetyData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const severityConfig = {
  critical: { label: 'Critical', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800/40', badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300', icon: 'text-red-500' },
  high: { label: 'High', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800/40', badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300', icon: 'text-orange-500' },
  medium: { label: 'Medium', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800/40', badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300', icon: 'text-yellow-500' },
};

function SafetyCard({ principle, index }) {
  const [open, setOpen] = useState(false);
  const sev = severityConfig[principle.severity];

  return (
    <div className={`card overflow-hidden transition-all duration-300 ${open ? 'ring-1 ring-primary-200 dark:ring-primary-700/40' : 'hover:-translate-y-0.5'}`}
      style={{ animationDelay: `${index * 70}ms` }}>
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="text-2xl w-10 h-10 flex items-center justify-center">{principle.icon}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h3 className="font-display font-bold text-gray-900 dark:text-white">{principle.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${sev.badge} ${sev.border}`}>
                {sev.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 pr-4">{principle.description}</p>
          </div>
        </div>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
          open ? 'bg-primary-50 dark:bg-primary-900/40 border-primary-200 dark:border-primary-700/40 text-primary-600 dark:text-primary-400 rotate-180'
               : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
        }`}>
          <ChevronDown size={16} strokeWidth={2.5} />
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{principle.description}</p>
              <div className={`rounded-xl border ${sev.border} ${sev.bg} p-3`}>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <XCircle size={12} className={sev.icon} /> Examples to Avoid
                </p>
                <ul className="space-y-1">
                  {principle.badExamples.map((ex, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                      <span className="text-red-400 mt-0.5">✗</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/20 p-3">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 size={12} /> Good Practice
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">{principle.goodPractice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SafetyChecklist() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const allChecked = promptSafetyChecklist.every(item => checked[item.id]);

  return (
    <div className="card p-6">
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center gap-2">
        <span className="text-xl">📋</span> Pre-Publish Checklist
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Run through this before using AI-generated content publicly</p>
      <div className="space-y-3">
        {promptSafetyChecklist.map(item => (
          <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
            <div
              onClick={() => toggle(item.id)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 ${
                checked[item.id]
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400'
              }`}
            >
              {checked[item.id] && <CheckCircle2 size={12} className="text-white" strokeWidth={3} />}
            </div>
            <span className={`text-sm leading-relaxed transition-colors duration-200 ${checked[item.id] ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
              {item.item}
            </span>
          </label>
        ))}
      </div>
      {allChecked && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 text-center">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">✅ All checks passed! Your prompt is safety-reviewed.</p>
        </div>
      )}
    </div>
  );
}

export default function AISafety() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section id="safety" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900/50 dark:to-gray-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-badge mb-4"><ShieldCheck size={12} />Responsible AI</div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
            AI Safety &amp;<br /><span className="gradient-text">Responsible Prompting</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Great prompt engineers are also responsible ones. Learn the ethical boundaries and best practices for using AI safely and constructively.
          </p>
        </div>

        {/* Alert banner */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/20 p-5 flex gap-4 items-start">
            <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Why This Matters</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                Prompt engineering is a powerful skill. With that power comes responsibility. Understanding safety boundaries isn't just good ethics — it protects you, your users, and the broader AI ecosystem. The best prompt engineers are the most responsible ones.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Principles accordion */}
          <div className={`lg:col-span-2 space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {safetyPrinciples.map((principle, i) => (
              <SafetyCard key={principle.id} principle={principle} index={i} />
            ))}
          </div>

          {/* Right: sidebar */}
          <div className={`space-y-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <SafetyChecklist />

            <div className="card p-6">
              <h3 className="font-display font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span> Golden Rules
              </h3>
              <div className="space-y-3">
                {safetyGuidelines.map((g, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0">{g.icon}</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{g.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-900 p-6 text-white">
              <p className="text-lg font-display font-bold mb-2">🤝 The Responsible AI Pledge</p>
              <p className="text-sm text-primary-100 leading-relaxed">
                "I will use prompt engineering to create value, not harm. I will be transparent about AI usage, protect privacy, and keep humans in control of important decisions."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
