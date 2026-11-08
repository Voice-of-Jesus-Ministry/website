import React, { useState, useEffect } from 'react';
import { questions, type Question } from '../questions';
import { useConscience } from './ConscienceProvider';

export function BibleQuizOverlay({ onComplete }: { onComplete: () => void }) {
  const { addPlayerPoints } = useConscience();
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
  }, []);

  if (quizQuestions.length === 0) return <div>Loading...</div>;

  const currentQ = quizQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (idx === currentQ.answerIndex) {
      addPlayerPoints(100);
      setPointsEarned(prev => prev + 100);
      setCurrentIndex(prev => prev + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 9999, padding: '2rem' }}>
        <h2>Incorrect!</h2>
        <p>You earned a total of {pointsEarned} extra points.</p>
        <p>The correct answer was: {currentQ.choices[currentQ.answerIndex]}</p>
        <p>Reference: {currentQ.reference}</p>
        <p>{currentQ.explanation}</p>
        <button onClick={onComplete} style={{ marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.2rem', cursor: 'pointer', background: '#38bdf8', color: '#fff', border: 'none', borderRadius: '4px' }}>Continue to Map</button>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 9999, padding: '2rem' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <h2>Bonus Bible Quiz!</h2>
        <p style={{ color: '#38bdf8', marginBottom: '2rem' }}>Answer correctly to earn 100 bonus points for the next level. If you get one wrong, the quiz ends.</p>
        <h3 style={{ marginBottom: '2rem' }}>{currentQ.text}</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {currentQ.choices.map((choice, idx) => (
            <button key={idx} onClick={() => handleAnswer(idx)} style={{ padding: '1rem', fontSize: '1.1rem', cursor: 'pointer', background: '#1e293b', color: '#f8fafc', border: '1px solid #475569', borderRadius: '4px' }}>
              {choice}
            </button>
          ))}
        </div>
        <p style={{ marginTop: '2rem' }}>Points Earned: {pointsEarned}</p>
      </div>
    </div>
  );
}
