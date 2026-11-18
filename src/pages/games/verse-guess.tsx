import { useState } from 'react';

// Placeholder verse data – replace with real verses later
const VERSES = [
  { id: 1, text: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.', answer: 'John 3:16' },
  { id: 2, text: 'I can do all things through him who strengthens me.', answer: 'Philippians 4:13' },
];

export default function VerseGuess() {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const current = VERSES[index];

  const checkGuess = () => {
    const correct = guess.trim().toLowerCase() === current.answer.toLowerCase();
    setResult(correct ? 'Correct! 🎉' : `Incorrect. The answer is ${current.answer}`);
  };

  const nextVerse = () => {
    setIndex((index + 1) % VERSES.length);
    setGuess('');
    setResult(null);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Verse Guess</h1>
      <p className="mb-4">{current.text}</p>
      <input
        type="text"
        placeholder="Enter reference (e.g., John 3:16)"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="border rounded px-2 py-1 mr-2"
      />
      <button onClick={checkGuess} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
        Check
      </button>
      <button onClick={nextVerse} className="bg-gray-300 px-3 py-1 rounded">
        Next
      </button>
      {result && <p className="mt-4 font-medium">{result}</p>}
    </div>
  );
}
