import { ArrowRight, Sparkles, BookOpen, Zap, Star, Play } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const floatingCards = [
  {
    delay: '0s',
    position: 'top-12 -left-4 lg:left-2',
    content: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/60 flex items-center justify-center">
          <span className="text-sm">🔗</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Chain of Thought</p>
          <p className="text-[10px] text-gray-400">Reasoning technique</p>
        </div>
      </div>
    ),
  },
  {
    delay: '1s',
    position: 'top-1/2 -right-2 lg:right-0',
    content: (
      <div>
        <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1">✓ Output Generated</p>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-1.5 rounded-full ${i <= 4 ? 'w-5 bg-primary-400' : 'w-3 bg-gray-200 dark:bg-gray-700'}`} />
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-1">Quality: 4.8/5</p>
      </div>
    ),
  },
  {
    delay: '2s',
    position: 'bottom-16 -left-4 lg:left-2',
    content: (
      <div className="flex items-center gap-2">
        <div className="text-lg">🎯</div>
        <div>
          <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">10 Questions</p>
          <div className="flex gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={8} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const techPills = [
  { label: 'Chain of Thought', icon: '🔗' },
  { label: 'Few-Shot', icon: '🎯' },
  { label: 'Role Prompting', icon: '🎭' },
  { label: 'XML Structuring', icon: '📋' },
  { label: 'Persona Injection', icon: '💉' },
];

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.05);

  const scrollToBuilder = (e) => {
    e.preventDefault();
    document.querySelector('#builder')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToTechniques = (e) => {
    e.preventDefault();
    document.querySelector('#techniques')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 mesh-bg dot-grid dark:opacity-40" />
      <div className="absolute inset-0">
        <div className="glow-orb absolute top-1/4 left-1/4 w-72 h-72 bg-primary-400/20 dark:bg-primary-600/15" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-600/10" style={{ animationDelay: '3s' }} />
        <div className="glow-orb absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/40 border border-primary-200/60 dark:border-primary-700/40 mb-6">
              <Sparkles size={12} className="text-primary-600 dark:text-primary-400" />
              <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 tracking-wide uppercase">
                AI Prompt Engineering Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-6">
              Master{' '}
              <span className="gradient-text">Prompt Engineering</span>{' '}
              Like a Pro
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
              Learn 8 powerful techniques, build custom prompts with our interactive builder,
              test your knowledge, and use our cheat sheets — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={scrollToBuilder}
                className="btn-primary text-base px-7 py-3.5 group"
              >
                <Zap size={18} strokeWidth={2.5} />
                Start Building Prompts
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToTechniques}
                className="btn-secondary text-base px-7 py-3.5 group"
              >
                <BookOpen size={18} />
                Explore Techniques
              </button>
            </div>

            {/* Scrolling tech pills */}
            <div className="flex flex-wrap gap-2">
              {techPills.map((pill, i) => (
                <span
                  key={pill.label}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 shadow-sm
                    transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 cursor-default`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span>{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Mockup */}
          <div
            className={`relative transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main card */}
              <div className="relative rounded-3xl border border-gray-200/80 dark:border-gray-700/60 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
                {/* Window bar */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="flex-1 mx-4">
                    <div className="h-5 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center px-3">
                      <span className="text-[10px] text-gray-400">promptcraft.ai/builder</span>
                    </div>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Prompt Builder</span>
                    <span className="tech-badge">✨ AI-Powered</span>
                  </div>

                  {/* Fields mockup */}
                  <div className="space-y-3 mb-4">
                    {[
                      { label: 'Persona', value: 'Senior ML Engineer' },
                      { label: 'Task', value: 'Explain transformer architecture' },
                      { label: 'Technique', value: 'Chain of Thought + Role' },
                    ].map(field => (
                      <div key={field.label} className="flex items-center gap-3">
                        <span className="text-[11px] font-semibold text-gray-400 w-16 shrink-0">{field.label}</span>
                        <div className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60">
                          <span className="text-xs text-gray-700 dark:text-gray-300">{field.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Output preview */}
                  <div className="rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/40 p-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Sparkles size={12} className="text-primary-500" />
                      <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">Generated Prompt</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        'You are a Senior ML Engineer with 10+ years...',
                        'Step 1: Begin by identifying the core problem...',
                        'Think through each component carefully before...',
                      ].map((line, i) => (
                        <div
                          key={i}
                          className="h-2 rounded-full bg-primary-200 dark:bg-primary-700/50"
                          style={{ width: `${[90, 75, 65][i]}%`, opacity: 1 - i * 0.15 }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary-100 dark:border-primary-800/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Prompt ready · 284 tokens</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <div
                  key={i}
                  className={`absolute ${card.position} hidden sm:block`}
                  style={{ animation: `float 5s ease-in-out ${card.delay} infinite` }}
                >
                  <div className="glass-card rounded-2xl px-4 py-3 shadow-lg min-w-[140px]">
                    {card.content}
                  </div>
                </div>
              ))}

              {/* Gradient glow behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-primary-400/10 dark:bg-primary-600/10 blur-2xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce-subtle">
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-gray-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
