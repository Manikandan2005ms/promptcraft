import { useState } from 'react';
import { Copy, Check, BookMarked } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const sheets = [
  {
    id: 'verbs',
    icon: '⚡',
    title: 'Power Verbs',
    subtitle: 'Use these to signal clear intent',
    color: 'blue',
    items: [
      { label: 'Analysis', verbs: ['Analyze', 'Evaluate', 'Assess', 'Audit', 'Diagnose'] },
      { label: 'Creation', verbs: ['Generate', 'Draft', 'Create', 'Design', 'Build'] },
      { label: 'Transformation', verbs: ['Refactor', 'Optimize', 'Rewrite', 'Convert', 'Transform'] },
      { label: 'Explanation', verbs: ['Explain', 'Clarify', 'Simplify', 'Break down', 'Illustrate'] },
      { label: 'Comparison', verbs: ['Compare', 'Contrast', 'Differentiate', 'Benchmark', 'Rank'] },
      { label: 'Planning', verbs: ['Outline', 'Strategize', 'Prioritize', 'Roadmap', 'Schedule'] },
    ],
    copyText: `POWER VERBS FOR PROMPTING

Analysis: Analyze, Evaluate, Assess, Audit, Diagnose
Creation: Generate, Draft, Create, Design, Build
Transformation: Refactor, Optimize, Rewrite, Convert, Transform
Explanation: Explain, Clarify, Simplify, Break down, Illustrate
Comparison: Compare, Contrast, Differentiate, Benchmark, Rank
Planning: Outline, Strategize, Prioritize, Roadmap, Schedule`,
  },
  {
    id: 'formulas',
    icon: '🧪',
    title: 'Prompt Formulas',
    subtitle: 'Battle-tested structures that work',
    color: 'purple',
    items: [
      { label: 'Role + Task', formula: 'You are a [ROLE]. [TASK].' },
      { label: 'Context + Task + Format', formula: 'Given [CONTEXT], [TASK]. Format as [FORMAT].' },
      { label: 'CoT Trigger', formula: '[TASK]. Think step by step before answering.' },
      { label: 'Few-Shot', formula: 'Input: [X] → Output: [Y]\nInput: [A] → Output: [B]\nInput: [?] → Output:' },
      { label: 'Constraint', formula: '[TASK]. Constraints: [LIST]. Never violate these.' },
      { label: 'Refinement', formula: 'Here is my draft: [DRAFT]. Improve it for: [CRITERIA].' },
      { label: 'Persona', formula: 'You are [NAME], a [ROLE] who [TRAITS]. [TASK].' },
      { label: 'XML Structure', formula: '<context>[C]</context>\n<task>[T]</task>\n<format>[F]</format>' },
    ],
    copyText: `PROMPT FORMULAS

Role + Task: "You are a [ROLE]. [TASK]."
Context + Task + Format: "Given [CONTEXT], [TASK]. Format as [FORMAT]."
CoT Trigger: "[TASK]. Think step by step before answering."
Few-Shot: "Input: [X] → Output: [Y] | Input: [A] → Output: [B] | Input: [?] → Output:"
Constraint: "[TASK]. Constraints: [LIST]. Never violate these."
Refinement: "Here is my draft: [DRAFT]. Improve it for: [CRITERIA]."
Persona: "You are [NAME], a [ROLE] who [TRAITS]. [TASK]."
XML: "<context>[C]</context><task>[T]</task><format>[F]</format>"`,
  },
  {
    id: 'personas',
    icon: '🎭',
    title: 'Persona Templates',
    subtitle: 'Copy-paste persona starters',
    color: 'green',
    items: [
      { label: 'The Expert', template: 'You are a world-class [FIELD] expert with 20+ years of experience. You are known for clear explanations and practical, opinionated advice.' },
      { label: 'The Critic', template: 'You are a rigorous critic with high standards. Evaluate objectively, highlight both strengths and specific weaknesses, and suggest concrete improvements.' },
      { label: 'The Teacher', template: 'You are a patient, brilliant teacher who can explain anything to anyone. Start simple, build complexity, and always use relatable analogies.' },
      { label: 'The Strategist', template: 'You are a strategic advisor who thinks in systems and long-term outcomes. You prioritize impact over urgency and challenge assumptions.' },
      { label: 'The Engineer', template: 'You are a senior engineer who values clean code, scalability, and pragmatism. You give specific, working solutions and flag trade-offs honestly.' },
    ],
    copyText: `PERSONA TEMPLATES

The Expert: "You are a world-class [FIELD] expert with 20+ years of experience. Known for clear, practical, opinionated advice."
The Critic: "Rigorous critic with high standards. Evaluate objectively, highlight strengths AND weaknesses, suggest concrete improvements."
The Teacher: "Patient, brilliant teacher. Start simple, build complexity, always use relatable analogies."
The Strategist: "Strategic advisor thinking in systems and long-term outcomes. Prioritizes impact, challenges assumptions."
The Engineer: "Senior engineer valuing clean code, scalability, pragmatism. Gives specific solutions, flags trade-offs."`,
  },
  {
    id: 'output',
    icon: '📐',
    title: 'Output Styles',
    subtitle: 'Format commands that work',
    color: 'amber',
    items: [
      { style: 'Bullet list', command: '"Format as concise bullet points, max 8 items"' },
      { style: 'Numbered steps', command: '"Give step-by-step instructions, numbered"' },
      { style: 'Table', command: '"Format as a markdown table with columns: [A, B, C]"' },
      { style: 'JSON', command: '"Respond only with valid JSON. Schema: {key: value}"' },
      { style: 'Summary + Detail', command: '"Lead with a 1-sentence summary, then expand"' },
      { style: 'Pro/Con', command: '"Format as: Pros (3 bullets) | Cons (3 bullets)"' },
      { style: 'Code + Explain', command: '"Show code first, then explain each section"' },
      { style: 'Concise', command: '"Answer in 3 sentences maximum. No preamble."' },
    ],
    copyText: `OUTPUT STYLE COMMANDS

Bullet list: "Format as concise bullet points, max 8 items"
Numbered steps: "Give step-by-step instructions, numbered"
Table: "Format as a markdown table with columns: [A, B, C]"
JSON: "Respond only with valid JSON. Schema: {key: value}"
Summary + Detail: "Lead with a 1-sentence summary, then expand"
Pro/Con: "Format as: Pros (3 bullets) | Cons (3 bullets)"
Code + Explain: "Show code first, then explain each section"
Concise: "Answer in 3 sentences maximum. No preamble."`,
  },
  {
    id: 'constraints',
    icon: '🎛️',
    title: 'Constraint Library',
    subtitle: 'Control output with precision',
    color: 'red',
    items: [
      { type: 'Length', constraints: ['"Max 100 words"', '"Exactly 3 paragraphs"', '"One sentence only"'] },
      { type: 'Vocabulary', constraints: ['"Use only plain English"', '"No jargon"', '"8th grade reading level"'] },
      { type: 'Perspective', constraints: ['"Avoid personal opinions"', '"Only cite facts"', '"Balanced view"'] },
      { type: 'Scope', constraints: ['"Focus only on [X]"', '"Exclude [Y]"', '"Limit to 2023–2024"'] },
      { type: 'Quality', constraints: ['"No filler phrases"', '"No hedging"', '"Be direct and specific"'] },
    ],
    copyText: `CONSTRAINT LIBRARY

Length: "Max 100 words" | "Exactly 3 paragraphs" | "One sentence only"
Vocabulary: "Use only plain English" | "No jargon" | "8th grade reading level"
Perspective: "Avoid personal opinions" | "Only cite facts" | "Balanced view"
Scope: "Focus only on [X]" | "Exclude [Y]" | "Limit to 2023–2024"
Quality: "No filler phrases" | "No hedging" | "Be direct and specific"`,
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800/40', icon: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800/40', icon: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' },
  green: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800/40', icon: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800/40', icon: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  red: { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800/40', icon: 'text-red-600 dark:text-red-400', badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
};

function SheetCard({ sheet, index }) {
  const [copied, setCopied] = useState(false);
  const colors = colorMap[sheet.color];

  const copy = async () => {
    await navigator.clipboard.writeText(sheet.copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-6 flex flex-col gap-4" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${colors.bg} border ${colors.border} flex items-center justify-center text-xl`}>
            {sheet.icon}
          </div>
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-white">{sheet.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{sheet.subtitle}</p>
          </div>
        </div>
        <button onClick={copy} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${colors.badge} transition-all duration-200 shrink-0`}>
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="space-y-2">
        {sheet.id === 'verbs' && sheet.items.map(g => (
          <div key={g.label} className="flex items-start gap-2">
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 w-24 shrink-0 pt-0.5">{g.label}</span>
            <div className="flex flex-wrap gap-1">
              {g.verbs.map(v => (
                <span key={v} className={`px-2 py-0.5 rounded-md text-xs font-medium ${colors.badge}`}>{v}</span>
              ))}
            </div>
          </div>
        ))}

        {sheet.id === 'formulas' && sheet.items.map(f => (
          <div key={f.label} className={`rounded-xl border ${colors.border} ${colors.bg} p-2.5`}>
            <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mb-1">{f.label}</p>
            <code className="text-xs text-gray-700 dark:text-gray-300 font-mono">{f.formula}</code>
          </div>
        ))}

        {sheet.id === 'personas' && sheet.items.map(p => (
          <div key={p.label} className={`rounded-xl border ${colors.border} ${colors.bg} p-2.5`}>
            <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">{p.label}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{p.template}</p>
          </div>
        ))}

        {sheet.id === 'output' && sheet.items.map(o => (
          <div key={o.style} className="flex items-start gap-2">
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 w-28 shrink-0 pt-0.5">{o.style}</span>
            <code className="text-xs text-gray-700 dark:text-gray-300 font-mono leading-relaxed">{o.command}</code>
          </div>
        ))}

        {sheet.id === 'constraints' && sheet.items.map(c => (
          <div key={c.type} className="flex items-start gap-2">
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 w-20 shrink-0 pt-0.5">{c.type}</span>
            <div className="flex flex-wrap gap-1">
              {c.constraints.map(v => (
                <code key={v} className={`px-2 py-0.5 rounded-md text-[11px] ${colors.badge} font-mono`}>{v}</code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CheatSheet() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section id="cheatsheet" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-badge mb-4"><BookMarked size={12} />Quick Reference</div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
            Prompt Engineering<br />
            <span className="gradient-text">Cheat Sheet</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your go-to reference for building great prompts — power verbs, formulas, persona templates, and more. All copyable.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {sheets.map((sheet, i) => (
            <SheetCard key={sheet.id} sheet={sheet} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
