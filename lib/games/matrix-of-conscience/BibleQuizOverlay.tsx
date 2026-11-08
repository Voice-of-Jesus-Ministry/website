import React, { useState, useEffect } from 'react';
import { questions, type Question } from '../questions';
import { useConscience } from './ConscienceProvider';

const QUIZ_LENGTH = 5;
const PTS_PER_CORRECT = 20;
const PERFECT_BONUS = 20;

export function BibleQuizOverlay({ onComplete }: { onComplete: () => void }) {
  const { addPlayerPoints } = useConscience();
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastAnswerWasCorrect, setLastAnswerWasCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, QUIZ_LENGTH);
    setQuizQuestions(shuffled);
  }, []);

  if (quizQuestions.length === 0) return <div>Loading...</div>;

  const currentQ = quizQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    const isCorrect = idx === currentQ.answerIndex;
    const nextCorrect = isCorrect ? correctCount + 1 : correctCount;
    const gained = isCorrect ? PTS_PER_CORRECT : 0;
    
    if (isCorrect) {
      addPlayerPoints(gained);
      setPointsEarned(prev => prev + gained);
      setCorrectCount(nextCorrect);
    }
    setLastAnswerWasCorrect(isCorrect);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= quizQuestions.length) {
      if (nextCorrect === quizQuestions.length) {
        addPlayerPoints(PERFECT_BONUS);
        setPointsEarned(prev => prev + gained + PERFECT_BONUS);
      }
      setFinished(true);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  if (finished) {
    const isPerfect = correctCount === quizQuestions.length;
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 9999, padding: '2rem' }}>
        <div style={{ maxWidth: '540px', width: '100%', textAlign: 'center', background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '12px', padding: '2rem' }}>
          <h2 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Quiz Complete!</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>You answered <strong>{correctCount} / {quizQuestions.length}</strong> correctly.</p>
          <p style={{ color: '#4ade80', fontSize: '1.4rem', fontWeight: 'bold', margin: '1rem 0' }}>
            +{pointsEarned} Points Added to Defense Reserves
          </p>
          {isPerfect && (
            <p style={{ color: '#facc15', fontWeight: 'bold' }}>⭐ Perfect Score Bonus (+{PERFECT_BONUS} pts)!</p>
          )}
          <button onClick={onComplete} style={{ marginTop: '2rem', padding: '0.8rem 1.8rem', fontSize: '1.1rem', cursor: 'pointer', background: '#38bdf8', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px' }}>
            Continue to Mission Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 9999, padding: '2rem' }}>
      <div style={{ maxWidth: '640px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ color: '#38bdf8' }}>Bonus Bible Quiz (Question {currentIndex + 1} / {quizQuestions.length})</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>+20 pts per correct answer, +20 bonus for a perfect score.</p>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', lineHeight: '1.4' }}>{currentQ.text}</h3>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {currentQ.choices.map((choice, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)} style={{ padding: '0.9rem', fontSize: '1rem', cursor: 'pointer', background: '#0f172a', color: '#f8fafc', border: '1px solid #475569', borderRadius: '8px', textAlign: 'left' }}>
                {choice}
              </button>
            ))}
          </div>
        </div>
        <p style={{ color: '#cbd5e1' }}>Points Earned this Quiz: <strong style={{ color: '#38bdf8' }}>{pointsEarned}</strong></p>
      </div>
    </div>
  );
}
