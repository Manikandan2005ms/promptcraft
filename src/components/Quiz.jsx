import { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, RefreshCw, ChevronRight, Brain } from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const STATES = { idle: 'idle', answered: 'answered', finished: 'finished' };

function ScoreEmoji(score, total) {
  const pct = score / total;
  if (pct === 1) return { emoji: '🏆', label: 'Perfect Score!', color: 'text-amber-500' };
  if (pct >= 0.8) return { emoji: '🌟', label: 'Excellent!', color: 'text-emerald-500' };
  if (pct >= 0.6) return { emoji: '👍', label: 'Good Job!', color: 'text-blue-500' };
  if (pct >= 0.4) return { emoji: '📚', label: 'Keep Learning!', color: 'text-orange-500' };
  return { emoji: '💪', label: 'Keep Practicing!', color: 'text-red-500' };
}

export default function Quiz() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [gameState, setGameState] = useState(STATES.idle);
  const [score, setScore] = useState(0);

  const question = quizQuestions[current];
  const progress = ((current + (gameState === STATES.answered ? 1 : 0)) / quizQuestions.length) * 100;

  const selectOption = (idx) => {
    if (gameState === STATES.answered) return;
    setSelected(idx);
    const isCorrect = idx === question.correct;
    setAnswers(prev => [...prev, { q: current, selected: idx, correct: isCorrect }]);
    if (isCorrect) setScore(s => s + 1);
    setGameState(STATES.answered);
  };

  const next = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setGameState(STATES.idle);
    } else {
      setGameState(STATES.finished);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setScore(0);
    setGameState(STATES.idle);
  };

  const scoreInfo = gameState === STATES.finished ? ScoreEmoji(score, quizQuestions.length) : null;

  return (
    <section id="quiz" className="py-20 lg:py-28" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="section-badge mb-4"><Brain size={12} />Knowledge Quiz</div>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-4">
            Test Your <span className="gradient-text">Prompt Engineering</span> Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            10 questions covering all major techniques. See how much you've learned!
          </p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Finished State */}
          {gameState === STATES.finished ? (
            <div className="card p-8 lg:p-12 text-center">
              <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
              <h3 className="font-display font-extrabold text-3xl text-gray-900 dark:text-white mb-2">
                {scoreInfo.label}
              </h3>
              <p className={`text-5xl font-extrabold ${scoreInfo.color} mb-2 font-display`}>
                {score}/{quizQuestions.length}
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                You answered {score} out of {quizQuestions.length} questions correctly
              </p>

              {/* Answer review */}
              <div className="grid grid-cols-5 gap-2 mb-8">
                {answers.map((a, i) => (
                  <div key={i} className={`rounded-xl p-2 text-center border ${
                    a.correct
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40'
                  }`}>
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Q{i + 1}</div>
                    {a.correct
                      ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" />
                      : <XCircle size={16} className="text-red-500 mx-auto" />
                    }
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={restart} className="btn-primary">
                  <RefreshCw size={16} /> Retake Quiz
                </button>
                <a href="#techniques" onClick={e => { e.preventDefault(); document.querySelector('#techniques')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary">
                  Review Techniques
                </a>
              </div>
            </div>
          ) : (
            <div className="card overflow-hidden">
              {/* Progress bar */}
              <div className="h-1.5 bg-gray-100 dark:bg-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="p-6 lg:p-8">
                {/* Question header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Question {current + 1} of {quizQuestions.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Trophy size={13} className="text-amber-500" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{score} pts</span>
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-gray-900 dark:text-white mb-8 leading-snug">
                  {question.question}
                </h3>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {question.options.map((option, idx) => {
                    let optClass = 'quiz-option';
                    if (gameState === STATES.answered) {
                      if (idx === question.correct) optClass += ' correct';
                      else if (idx === selected && idx !== question.correct) optClass += ' incorrect';
                    } else if (idx === selected) {
                      optClass += ' selected';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => selectOption(idx)}
                        className={`${optClass} w-full text-left flex items-center gap-3`}
                      >
                        <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-200 ${
                          gameState === STATES.answered && idx === question.correct
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : gameState === STATES.answered && idx === selected && idx !== question.correct
                            ? 'border-red-500 bg-red-500 text-white'
                            : 'border-current'
                        }`}>
                          {['A', 'B', 'C', 'D'][idx]}
                        </span>
                        <span className="flex-1">{option}</span>
                        {gameState === STATES.answered && idx === question.correct && (
                          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                        )}
                        {gameState === STATES.answered && idx === selected && idx !== question.correct && (
                          <XCircle size={18} className="text-red-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {gameState === STATES.answered && (
                  <div className={`rounded-xl p-4 mb-6 border ${
                    selected === question.correct
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40'
                  }`}>
                    <p className={`text-xs font-semibold mb-1 ${selected === question.correct ? 'text-emerald-700 dark:text-emerald-400' : 'text-blue-700 dark:text-blue-400'}`}>
                      {selected === question.correct ? '✓ Correct!' : '💡 Explanation'}
                    </p>
                    <p className={`text-sm leading-relaxed ${selected === question.correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-blue-700 dark:text-blue-300'}`}>
                      {question.explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {gameState === STATES.answered && (
                  <button onClick={next} className="btn-primary w-full justify-center">
                    {current < quizQuestions.length - 1 ? (
                      <><ChevronRight size={16} /> Next Question</>
                    ) : (
                      <><Trophy size={16} /> See Results</>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
