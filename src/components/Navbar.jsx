import { useState, useEffect } from 'react';
import { Menu, X, Zap, Moon, Sun } from 'lucide-react';

const navLinks = [
  { label: 'Techniques', href: '#techniques' },
  { label: 'Builder', href: '#builder' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Cheat Sheet', href: '#cheatsheet' },
  { label: 'AI Safety', href: '#safety' },
];

export default function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-sm border-b border-gray-200/60 dark:border-gray-800/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
              <Zap size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-lg text-gray-900 dark:text-white tracking-tight">
              Prompt<span className="text-primary-600">Craft</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* CTA */}
            <a
              href="#builder"
              onClick={e => { e.preventDefault(); handleNav('#builder'); }}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-200"
            >
              <Zap size={14} strokeWidth={2.5} />
              Try Builder
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-2 pb-2 border-t border-gray-200/60 dark:border-gray-700/60 flex flex-col gap-1">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={() => handleNav('#builder')}
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Zap size={14} strokeWidth={2.5} />
                Try Prompt Builder
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
