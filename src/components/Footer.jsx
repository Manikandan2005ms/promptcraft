import { useState } from 'react';
import { Zap, Github, Twitter, Linkedin, Youtube, ArrowRight, Mail } from 'lucide-react';

const footerLinks = {
  Learn: [
    { label: 'Techniques', href: '#techniques' },
    { label: 'Cheat Sheet', href: '#cheatsheet' },
    { label: 'AI Safety', href: '#safety' },
    { label: 'Quiz', href: '#quiz' },
  ],
  Tools: [
    { label: 'Prompt Builder', href: '#builder' },
    { label: 'Persona Templates', href: '#cheatsheet' },
    { label: 'Power Verbs', href: '#cheatsheet' },
    { label: 'Prompt Formulas', href: '#cheatsheet' },
  ],
  Resources: [
    { label: 'Anthropic Docs', href: 'https://docs.anthropic.com', external: true },
    { label: 'OpenAI Cookbook', href: 'https://github.com/openai/openai-cookbook', external: true },
    { label: 'LearnPrompting.org', href: 'https://learnprompting.org', external: true },
    { label: 'PromptingGuide.ai', href: 'https://www.promptingguide.ai', external: true },
  ],
};

const socials = [
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNav = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <footer className="relative border-t border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-14">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow-sm">
                <Zap size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg text-gray-900 dark:text-white">
                Prompt<span className="text-primary-600">Craft</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-xs">
              The most complete AI Prompt Engineering learning platform. Master techniques, build prompts, and become an AI power user.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Mail size={14} /> Get weekly prompt tips
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>✅</span> You're subscribed! Check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-field flex-1 text-xs py-2.5"
                    required
                  />
                  <button type="submit" className="px-3 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors duration-200 flex items-center gap-1">
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150 text-left flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.external && <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -rotate-45 transition-all duration-150" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <span>© 2025 PromptCraft. Built for AI learners everywhere.</span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to the community
            </span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-150"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
