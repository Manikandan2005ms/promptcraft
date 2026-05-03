import { useDarkMode } from './hooks/useScrollAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Techniques from './components/Techniques';
import PromptBuilder from './components/PromptBuilder';
import Quiz from './components/Quiz';
import CheatSheet from './components/CheatSheet';
import AISafety from './components/AISafety';
import PromptAnalyzer from './components/PromptAnalyzer';
import Footer from './components/Footer';
import { ScrollProgressBar, BackToTop } from './components/ScrollUtils';

export default function App() {
  const [dark, setDark] = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <ScrollProgressBar />
      <Navbar dark={dark} setDark={setDark} />

      <main>
        <Hero />
        <Stats />
        <Techniques />
        <PromptBuilder />
        <Quiz />
        <CheatSheet />
        <AISafety />
        <PromptAnalyzer />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
