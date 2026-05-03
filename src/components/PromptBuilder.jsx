import { useState } from 'react';
import { Zap, Copy, Check, RefreshCw, Sparkles, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const personas = [
  'Senior Software Engineer', 'ML Research Scientist', 'Product Manager',
  'UX Designer', 'Data Analyst', 'Marketing Strategist', 'Technical Writer',
  'DevOps Engineer', 'Business Analyst', 'Startup Founder',
];
const tones = ['Professional', 'Friendly', 'Concise', 'Detailed', 'Casual', 'Authoritative', 'Empathetic', 'Creative'];
const formats = ['Structured paragraphs', 'Bullet points', 'Numbered list', 'JSON', 'Markdown', 'Step-by-step guide', 'Table', 'Code with comments'];
const techniqueOptions = [
  'Chain of Thought', 'Few-Shot Prompting', 'Role Prompting',
  'Self Evaluation', 'Persona Injection', 'XML Structuring',
  'Iterative Refinement', 'Constraint Prompting',
];

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="select-field pr-10"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function TextareaField({ label, value, onChange, placeholder, rows = 2 }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="input-field resize-none"
      />
    </div>
  );
}

function buildPrompt(fields) {
  const { persona, task, context, tone, format, technique } = fields;
  if (!task.trim()) return '';

  const parts = [];

  if (technique === 'XML Structuring') {
    parts.push(`<system>`);
    if (persona) parts.push(`  You are a ${persona}. Bring your full expertise to every response.`);
    parts.push(`  Communication tone: ${tone || 'Professional'}.`);
    parts.push(`</system>\n`);
    if (context) { parts.push(`<context>`); parts.push(`  ${context}`); parts.push(`</context>\n`); }
    parts.push(`<task>`);
    parts.push(`  ${task}`);
    parts.push(`</task>\n`);
    parts.push(`<output_format>`);
    parts.push(`  Format: ${format || 'Structured paragraphs'}`);
    parts.push(`  Be thorough, accurate, and actionable.`);
    parts.push(`</output_format>`);
  } else if (technique === 'Chain of Thought') {
    if (persona) parts.push(`You are a ${persona}.\n`);
    if (context) parts.push(`Context: ${context}\n`);
    parts.push(`Task: ${task}\n`);
    parts.push(`Think through this step by step:`);
    parts.push(`Step 1: Understand and restate the core problem`);
    parts.push(`Step 2: Identify key considerations and constraints`);
    parts.push(`Step 3: Reason through possible approaches`);
    parts.push(`Step 4: Select and justify the best approach`);
    parts.push(`Step 5: Deliver the final answer\n`);
    parts.push(`Tone: ${tone || 'Professional'}. Format: ${format || 'Structured paragraphs'}.`);
  } else if (technique === 'Self Evaluation') {
    if (persona) parts.push(`You are a ${persona}.\n`);
    if (context) parts.push(`Context: ${context}\n`);
    parts.push(`Task: ${task}\n`);
    parts.push(`Instructions:`);
    parts.push(`1. Write a complete first draft`);
    parts.push(`2. Add "--- SELF-CRITIQUE ---"`);
    parts.push(`3. Evaluate: accuracy, completeness, clarity, relevance`);
    parts.push(`4. Add "--- IMPROVED VERSION ---"`);
    parts.push(`5. Write the refined final response\n`);
    parts.push(`Tone: ${tone || 'Professional'}. Format: ${format || 'Structured paragraphs'}.`);
  } else if (technique === 'Few-Shot Prompting') {
    if (persona) parts.push(`You are a ${persona}.\n`);
    parts.push(`Here are examples of the expected input → output pattern:`);
    parts.push(`Example 1:`);
    parts.push(`Input: [sample input 1]`);
    parts.push(`Output: [desired output 1]\n`);
    parts.push(`Example 2:`);
    parts.push(`Input: [sample input 2]`);
    parts.push(`Output: [desired output 2]\n`);
    parts.push(`Now apply the same pattern to:`);
    parts.push(`Input: ${task}`);
    parts.push(`Output:`);
  } else if (technique === 'Constraint Prompting') {
    if (persona) parts.push(`You are a ${persona}.\n`);
    if (context) parts.push(`Context: ${context}\n`);
    parts.push(`Task: ${task}\n`);
    parts.push(`HARD CONSTRAINTS — never violate:`);
    parts.push(`✓ Tone: ${tone || 'Professional'}`);
    parts.push(`✓ Format: ${format || 'Structured paragraphs'}`);
    parts.push(`✓ Stay strictly on topic — no tangents`);
    parts.push(`✓ Be specific — avoid vague generalities`);
    parts.push(`✓ Back claims with reasoning or examples`);
  } else if (technique === 'Iterative Refinement') {
    if (persona) parts.push(`You are a ${persona}.\n`);
    if (context) parts.push(`Context: ${context}\n`);
    parts.push(`Task: ${task}\n`);
    parts.push(`Refinement criteria:`);
    parts.push(`- Tone must be ${tone || 'Professional'}`);
    parts.push(`- Format: ${format || 'Structured paragraphs'}`);
    parts.push(`- First, generate a draft`);
    parts.push(`- Then improve it for: clarity, accuracy, and completeness`);
    parts.push(`- Label sections: [DRAFT] → [REFINED]`);
  } else {
    // Role Prompting / Persona Injection / default
    if (persona) parts.push(`You are a ${persona}. Bring your full depth of expertise to the following task.\n`);
    if (context) parts.push(`Context: ${context}\n`);
    parts.push(`Task: ${task}\n`);
    parts.push(`Requirements:`);
    parts.push(`- Tone: ${tone || 'Professional'}`);
    parts.push(`- Format: ${format || 'Structured paragraphs'}`);
    parts.push(`- Be specific, accurate, and directly actionable`);
  }

  return parts.join('\n');
}

export default function PromptBuilder() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [fields, setFields] = useState({ persona: '', task: '', context: '', tone: '', format: '', technique: '' });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const set = (key) => (val) => setFields(prev => ({ ...prev, [key]: val }));

  const generate = () => {
    const prompt = buildPrompt(fields);
    setOutput(prompt);
    setGenerated(true);
  };

  const reset = () => {
    setFields({ persona: '', task: '', context: '', tone: '', format: '', technique: '' });
    setOutput('');
    setGenerated(false);
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenCount = output ? Math.ceil(output.split(/\s+/).length * 1.3) : 0;

  return (
    <section id="builder" className="py-20 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white dark:from-gray-900/50 dark:to-gray-950" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-badge mb-4"><Zap size={12} /> Interactive Builder</div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
            Build Your Perfect<br className="hidden sm:block" />
            <span className="gradient-text"> Prompt Instantly</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fill in the fields below and our builder assembles a professional, technique-driven prompt tailored to your exact needs.
          </p>
        </div>

        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Left: Inputs */}
          <div className="card p-6 lg:p-8 space-y-5">
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center">
                <Sparkles size={14} className="text-primary-600 dark:text-primary-400" />
              </span>
              Configure Your Prompt
            </h3>

            <SelectField label="Persona" value={fields.persona} onChange={set('persona')} options={personas} placeholder="Choose a persona..." />
            <TextareaField label="Task *" value={fields.task} onChange={set('task')} placeholder="What do you want the AI to do? Be specific..." rows={3} />
            <TextareaField label="Context" value={fields.context} onChange={set('context')} placeholder="Background information, constraints, or audience..." rows={2} />

            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Tone" value={fields.tone} onChange={set('tone')} options={tones} placeholder="Select tone..." />
              <SelectField label="Format" value={fields.format} onChange={set('format')} options={formats} placeholder="Select format..." />
            </div>

            <SelectField label="Technique" value={fields.technique} onChange={set('technique')} options={techniqueOptions} placeholder="Select a technique..." />

            <div className="flex gap-3 pt-2">
              <button
                onClick={generate}
                disabled={!fields.task.trim()}
                className="flex-1 btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-glow-sm"
              >
                <Zap size={16} strokeWidth={2.5} />
                Generate Prompt
              </button>
              <button onClick={reset} className="btn-secondary px-4" title="Reset">
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          {/* Right: Output */}
          <div className="card p-6 lg:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center">
                  <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                </span>
                Generated Prompt
              </h3>
              {output && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">~{tokenCount} tokens</span>
                  <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-700/40 transition-all duration-200">
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 min-h-64 rounded-xl bg-gray-900 dark:bg-black border border-gray-800 p-5 overflow-auto relative">
              {output ? (
                <pre className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre-wrap break-words">{output}</pre>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
                    <Zap size={24} className="text-gray-600" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Your prompt will appear here</p>
                  <p className="text-gray-600 text-xs">Fill in at least the Task field and click Generate</p>
                </div>
              )}
            </div>

            {generated && output && (
              <div className="mt-4 flex flex-wrap gap-2">
                {fields.technique && (
                  <span className="tech-badge">⚡ {fields.technique}</span>
                )}
                {fields.tone && (
                  <span className="tech-badge">🎨 {fields.tone}</span>
                )}
                {fields.persona && (
                  <span className="tech-badge">🎭 {fields.persona}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
