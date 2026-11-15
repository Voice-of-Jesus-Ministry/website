export const SIDE = 6;
export const TILES = [
  { name: "Star", symbol: "★", color: "#ffd473" },
  { name: "Diamond", symbol: "◆", color: "#9be6ff" },
  { name: "Circle", symbol: "●", color: "#ffc1d9" },
  { name: "Triangle", symbol: "▲", color: "#a6e9b8" },
  { name: "Square", symbol: "■", color: "#d9c4ff" },
] as const;

// Swapping row 1 column 2 with row 2 column 2 makes a horizontal match.
const OPENING = [
  0, 1, 0, 3, 4, 2,
  2, 0, 3, 4, 1, 0,
  3, 4, 1, 0, 2, 3,
  4, 2, 0, 1, 3, 4,
  1, 3, 4, 2, 0, 1,
  0, 1, 2, 3, 4, 2,
];

export function openingBoard(offset = 0) {
  return OPENING.map((tile) => (tile + offset) % TILES.length);
}

export function adjacent(first: number, second: number) {
  return [first, second].every((index) => Number.isInteger(index) && index >= 0 && index < SIDE ** 2)
    && Math.abs(first % SIDE - second % SIDE)
      + Math.abs(Math.floor(first / SIDE) - Math.floor(second / SIDE)) === 1;
}

export function matchingCells(board: readonly number[]) {
  const matches = new Set<number>();

  for (let index = 0; index < board.length; index++) {
    const tile = board[index];
    if (index % SIDE < SIDE - 2 && tile === board[index + 1] && tile === board[index + 2]) {
      [index, index + 1, index + 2].forEach((cell) => matches.add(cell));
    }
    if (index < board.length - 2 * SIDE && tile === board[index + SIDE] && tile === board[index + 2 * SIDE]) {
      [index, index + SIDE, index + 2 * SIDE].forEach((cell) => matches.add(cell));
    }
  }
  return matches;
}

function matchedSwap(board: readonly number[], first: number, second: number) {
  if (!adjacent(first, second) || board[first] === board[second]) return null;
  const swapped = [...board];
  [swapped[first], swapped[second]] = [swapped[second], swapped[first]];
  const matches = matchingCells(swapped);
  return matches.has(first) || matches.has(second) ? { swapped, matches } : null;
}

export function findMove(board: readonly number[]): [number, number] | null {
  for (let index = 0; index < board.length; index++) {
    for (const next of [index + 1, index + SIDE]) {
      if (matchedSwap(board, index, next)) return [index, next];
    }
  }
  return null;
}

function refill(board: number[], matches: Set<number>, random: () => number) {
  for (let column = 0; column < SIDE; column++) {
    let destination = SIDE - 1;
    for (let row = SIDE - 1; row >= 0; row--) {
      const index = row * SIDE + column;
      if (!matches.has(index)) {
        board[destination * SIDE + column] = board[index];
        destination--;
      }
    }
    for (; destination >= 0; destination--) {
      board[destination * SIDE + column] = Math.floor(random() * TILES.length);
    }
  }
}

export function playSwap(board: readonly number[], first: number, second: number, random = Math.random) {
  const move = matchedSwap(board, first, second);
  if (!move) return null;

  const { swapped } = move;
  let matches = move.matches;
  let points = 0;
  // A cap guarantees completion even if refills repeatedly form matches.
  for (let cascade = 0; matches.size > 0 && cascade < 20; cascade++) {
    points += matches.size;
    refill(swapped, matches, random);
    matches = matchingCells(swapped);
  }
  const refreshed = matches.size > 0 || !findMove(swapped);
  return {
    board: refreshed ? openingBoard(Math.floor(random() * TILES.length)) : swapped,
    points,
    refreshed,
  };
}
