"use client";

import { useState } from "react";
import { adjacent, findMove, openingBoard, playSwap, SIDE, TILES } from "../../../lib/star-match";
import styles from "./star-match.module.css";

const ROUND_MOVES = 12;
const location = (index: number) => `row ${Math.floor(index / SIDE) + 1}, column ${index % SIDE + 1}`;

export default function StarMatch() {
  const [board, setBoard] = useState(openingBoard);
  const [selected, setSelected] = useState<number | null>(null);
  const [hint, setHint] = useState<[number, number] | null>(null);
  const [moves, setMoves] = useState(ROUND_MOVES);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  function choose(index: number) {
    if (moves === 0) return;
    setHint(null);
    if (selected === index) {
      setSelected(null);
      setMessage("Tile deselected.");
      return;
    }
    if (selected === null || !adjacent(selected, index)) {
      setSelected(index);
      setMessage(`${TILES[board[index]].name} selected at ${location(index)}. Choose a neighboring tile.`);
      return;
    }
    const result = playSwap(board, selected, index);
    if (!result) {
      setMessage("That swap makes no match. Try another neighboring tile.");
      return;
    }
    const nextScore = score + result.points;
    setSelected(null);
    setBoard(result.board);
    setMoves(moves - 1);
    setScore(nextScore);
    if (moves === 1) {
      setMessage(`Round complete. You cleared ${nextScore} tiles.`);
    } else {
      setMessage(`Cleared ${result.points} tiles. ${moves - 1} moves left.${result.refreshed ? " Board refreshed." : ""}`);
    }
  }

  function showHint() {
    const move = findMove(board);
    if (!move) return;
    setSelected(null);
    setHint(move);
    setMessage(`Try swapping ${location(move[0])} with ${location(move[1])}.`);
  }

  function restart() {
    setBoard(openingBoard(Math.floor(Math.random() * TILES.length)));
    setSelected(null);
    setHint(null);
    setMoves(ROUND_MOVES);
    setScore(0);
    setMessage("New round started.");
  }

  return (
    <section className="game-panel" aria-label="Star Match game">
      <p><strong>{score}</strong> tiles cleared · <strong>{moves}</strong> moves left</p>
      <div className={styles.board} role="group" aria-label="Six by six tile board">
        {board.map((tile, index) => (
          <button
            key={index}
            type="button"
            aria-label={`${TILES[tile].name}, ${location(index)}`}
            aria-pressed={selected === index}
            data-hint={hint?.includes(index) || undefined}
            aria-disabled={moves === 0 || undefined}
            onClick={() => choose(index)}
            className={styles.tile}
            style={{ color: TILES[tile].color }}
          >
            <span aria-hidden="true">{TILES[tile].symbol}</span>
          </button>
        ))}
      </div>
      <p className={styles.status} role="status">{message}</p>
      <div className="actions">
        <button className="button secondary" type="button" onClick={showHint} disabled={moves === 0}>Show a move</button>
        <button className="button" type="button" onClick={restart}>New round</button>
      </div>
    </section>
  );
}
