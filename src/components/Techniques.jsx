import { useState } from 'react';
import { ChevronDown, Copy, Check, BookOpen } from 'lucide-react';
import { techniques } from '../data/techniquesData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const badgeColors = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/40',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800/40',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800/40',
  orange: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800/40',
  pink: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800/40',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800/40',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800/40',
  red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800/40',
};

const difficultyColors = {
  Beginner: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
  Intermediate: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  Advanced: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
    >
      {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function TechniqueCard({ technique, isOpen, onToggle, index }) {
  return (
    <div
      className={`card overflow-hidden transition-all duration-300
        ${isOpen ? 'shadow-card-hover ring-1 ring-primary-200 dark:ring-primary-700/40' : 'hover:-translate-y-0.5'}
      `}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between gap-4 p-5 lg:p-6 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-xl flex-shrink-0">
            {technique.icon}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-display font-bold text-gray-900 dark:text-white text-base lg:text-lg">
                {technique.name}
              </h3>
              <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColors[technique.badgeColor]}`}>
                {technique.badge}
              </span>
            </div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold ${difficultyColors[technique.difficulty]}`}>
              {technique.difficulty}
            </span>
          </div>
        </div>

        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isOpen
            ? 'bg-primary-50 dark:bg-primary-900/40 border-primary-200 dark:border-primary-700/40 text-primary-600 dark:text-primary-400 rotate-180'
            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400'
        }`}>
          <ChevronDown size={16} strokeWidth={2.5} />
        </div>
      </button>

      {/* Expanded Content */}
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 lg:px-6 pb-5 lg:pb-6 border-t border-gray-100 dark:border-gray-800 pt-5">
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">What It Is</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{technique.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">When to Use</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{technique.whenToUse}</p>
              </div>
              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 p-3">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">💡 Pro Tip</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">{technique.tip}</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example Prompt</h4>
                <CopyButton text={technique.example} />
              </div>
              <div className="rounded-xl bg-gray-900 dark:bg-black p-4 overflow-auto max-h-64">
                <pre className="text-xs text-gray-300 leading-relaxed font-mono whitespace-pre-wrap break-words">
                  {technique.example}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Techniques() {
  const [openId, setOpenId] = useState(null);
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section id="techniques" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-badge mb-4">
            <BookOpen size={12} />
            Techniques Library
          </div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
            8 Proven Prompting<br className="hidden sm:block" />
            <span className="gradient-text"> Techniques</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Master each technique with detailed explanations, real-world use cases, and production-ready example prompts you can copy immediately.
          </p>
        </div>

        {/* Technique Cards */}
        <div className="space-y-3">
          {techniques.map((technique, index) => (
            <TechniqueCard
              key={technique.id}
              technique={technique}
              isOpen={openId === technique.id}
              onToggle={() => setOpenId(openId === technique.id ? null : technique.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
