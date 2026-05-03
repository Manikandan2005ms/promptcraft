import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Layers, Lightbulb, ClipboardCheck, Library } from 'lucide-react';

const stats = [
  {
    icon: Layers,
    value: '4',
    label: 'Core Pillars',
    description: 'Clarity, Context, Constraints & Creativity',
    color: 'purple',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-100 dark:border-purple-800/40',
  },
  {
    icon: Lightbulb,
    value: '8',
    label: 'Techniques',
    description: 'From beginner to advanced level',
    color: 'blue',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-100 dark:border-blue-800/40',
  },
  {
    icon: ClipboardCheck,
    value: '10',
    label: 'Quiz Questions',
    description: 'Test your knowledge with MCQs',
    color: 'emerald',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-100 dark:border-emerald-800/40',
  },
  {
    icon: Library,
    value: '100+',
    label: 'Templates',
    description: 'Ready-to-use prompt templates',
    color: 'amber',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-100 dark:border-amber-800/40',
  },
];

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-16 lg:py-20 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`card p-6 lg:p-8 transition-all duration-500 group cursor-default
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                  hover:-translate-y-1`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} border ${stat.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} className={stat.iconColor} />
                </div>
                <div className="font-display font-extrabold text-4xl lg:text-5xl text-gray-900 dark:text-white mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
