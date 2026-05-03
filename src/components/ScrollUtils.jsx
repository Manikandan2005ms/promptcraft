import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollAnimation';

export function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-glow flex items-center justify-center transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
}
