import React, { useState, useEffect } from 'react';
import { useConscience } from './ConscienceProvider';

const GRID_SIZE = 7;
const GEMS = ['heart', 'star', 'cross', 'flame', 'drop'];
const ICONS: Record<string, string> = {
  heart: '💠',
  star: '🌟',
  cross: '✦',
  flame: '🔥',
  drop: '☄️'
};

function createRandomBoard(): string[][] {
  const board: string[][] = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    const row: string[] = [];
    for (let c = 0; c < GRID_SIZE; c++) {
      row.push(GEMS[Math.floor(Math.random() * GEMS.length)]);
    }
    board.push(row);
  }
  return board;
}

export function Match3Minigame({ onClose }: { onClose: () => void }) {
  const { addPlayerPoints, playerPoints } = useConscience();
  const [board, setBoard] = useState<string[][]>([]);
  const [selected, setSelected] = useState<{ r: number; c: number } | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [matchesMade, setMatchesMade] = useState(0);

  useEffect(() => {
    setBoard(createRandomBoard());
  }, []);

  const checkAndClearMatches = (currentBoard: string[][]): { nextBoard: string[][]; matchCount: number } => {
    const toClear: boolean[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
    let matchCount = 0;

    // Horizontal check
    for (let r = 0; r < GRID_SIZE; r++) {
      let streak = 1;
      for (let c = 1; c < GRID_SIZE; c++) {
        if (currentBoard[r][c] === currentBoard[r][c - 1]) {
          streak++;
        } else {
          if (streak >= 3) {
            for (let k = 0; k < streak; k++) toClear[r][c - 1 - k] = true;
            matchCount++;
          }
          streak = 1;
        }
      }
      if (streak >= 3) {
        for (let k = 0; k < streak; k++) toClear[r][GRID_SIZE - 1 - k] = true;
        matchCount++;
      }
    }

    // Vertical check
    for (let c = 0; c < GRID_SIZE; c++) {
      let streak = 1;
      for (let r = 1; r < GRID_SIZE; r++) {
        if (currentBoard[r][c] === currentBoard[r - 1][c]) {
          streak++;
        } else {
          if (streak >= 3) {
            for (let k = 0; k < streak; k++) toClear[r - 1 - k][c] = true;
            matchCount++;
          }
          streak = 1;
        }
      }
      if (streak >= 3) {
        for (let k = 0; k < streak; k++) toClear[GRID_SIZE - 1 - k][c] = true;
        matchCount++;
      }
    }

    if (matchCount === 0) return { nextBoard: currentBoard, matchCount: 0 };

    // Apply gravity and refill
    const newBoard = currentBoard.map(row => [...row]);
    for (let c = 0; c < GRID_SIZE; c++) {
      const surviving = [];
      for (let r = 0; r < GRID_SIZE; r++) {
        if (!toClear[r][c]) surviving.push(newBoard[r][c]);
      }
      while (surviving.length < GRID_SIZE) {
        surviving.unshift(GEMS[Math.floor(Math.random() * GEMS.length)]);
      }
      for (let r = 0; r < GRID_SIZE; r++) {
        newBoard[r][c] = surviving[r];
      }
    }

    return { nextBoard: newBoard, matchCount };
  };

  const handleTileClick = (r: number, c: number) => {
    if (!selected) {
      setSelected({ r, c });
      return;
    }

    const isAdjacent =
      (Math.abs(selected.r - r) === 1 && selected.c === c) ||
      (Math.abs(selected.c - c) === 1 && selected.r === r);

    if (!isAdjacent) {
      setSelected({ r, c });
      return;
    }

    // Swap
    const swapped = board.map(row => [...row]);
    const temp = swapped[selected.r][selected.c];
    swapped[selected.r][selected.c] = swapped[r][c];
    swapped[r][c] = temp;

    const { nextBoard, matchCount } = checkAndClearMatches(swapped);

    if (matchCount > 0) {
      const gained = matchCount * 10; // 10 points per match
      addPlayerPoints(gained);
      setSessionScore(prev => prev + gained);
      setMatchesMade(prev => prev + matchCount);
      setBoard(nextBoard);
    }

    setSelected(null);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(5,6,16,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 9999, padding: '1rem' }}>
      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center', background: '#10121e', border: '1px solid rgba(126,255,216,0.3)', borderRadius: '16px', padding: '1.5rem' }}>
        <h2 style={{ color: '#7effd8', margin: '0 0 0.5rem 0' }}>Star Matrix Prep Phase</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
          Match 3 stars to generate Tactical Points (<strong>10 pts</strong> each) to buy and upgrade defensive towers!
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1rem 0', background: 'rgba(255,255,255,0.05)', padding: '0.6rem', borderRadius: '8px' }}>
          <div>Reserves: <strong style={{ color: '#38bdf8' }}>{playerPoints} pts</strong></div>
          <div>Session: <strong style={{ color: '#4ade80' }}>+{sessionScore} pts</strong></div>
          <div>Matches: <strong style={{ color: '#facc15' }}>{matchesMade}</strong></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gap: '6px', maxWidth: '380px', margin: '1rem auto' }}>
          {board.map((row, r) =>
            row.map((gem, c) => {
              const isSelected = selected?.r === r && selected?.c === c;
              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleTileClick(r, c)}
                  style={{
                    aspectRatio: '1/1',
                    fontSize: '1.3rem',
                    background: isSelected ? 'rgba(126,255,216,0.25)' : 'rgba(255,255,255,0.06)',
                    border: isSelected ? '2px solid #7effd8' : '1px solid rgba(126,255,216,0.15)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                    transition: 'all 120ms'
                  }}
                >
                  {ICONS[gem] || '·'}
                </button>
              );
            })
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '1.25rem',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            background: '#7effd8',
            color: '#050610',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Return to Defense Grid
        </button>
      </div>
    </div>
  );
}
