import assert from "node:assert/strict";
import test from "node:test";
import { adjacent, findMove, matchingCells, openingBoard, playSwap, TILES } from "../lib/star-match.ts";

test("opening board has a legal move and no existing matches for each palette", () => {
  for (let offset = 0; offset < TILES.length; offset++) {
    const board = openingBoard(offset);
    assert.equal(matchingCells(board).size, 0);
    assert.deepEqual(findMove(board), [1, 7]);
  }
});

test("invalid and nonmatching swaps preserve the original board", () => {
  const board = openingBoard();
  assert.equal(adjacent(5, 6), false);
  assert.equal(adjacent(0, 7), false);
  assert.equal(playSwap(board, -1, 0), null);
  assert.equal(playSwap(board, 0, 1), null);
  assert.deepEqual(board, openingBoard());
});

test("overlapping matches count their common tile once", () => {
  const board = openingBoard();
  for (const index of [8, 13, 14, 15, 20]) board[index] = 1;
  assert.deepEqual([...matchingCells(board)].sort((a, b) => a - b), [8, 13, 14, 15, 20]);
});

test("legal swaps score cleared tiles and leave a stable, playable board", () => {
  const board = openingBoard();
  let nextTile = 0;
  const result = playSwap(board, 1, 7, () => (nextTile++ % TILES.length) / TILES.length);
  assert.ok(result);
  assert.equal(result.points, 3);
  assert.equal(result.board.length, 36);
  assert.equal(matchingCells(result.board).size, 0);
  assert.ok(findMove(result.board));
  assert.deepEqual(board, openingBoard());
});

test("repeated cascades terminate and refresh the board", () => {
  const result = playSwap(openingBoard(), 1, 7, () => 0);
  assert.ok(result?.refreshed);
  assert.ok(result.points > 3);
  assert.equal(matchingCells(result.board).size, 0);
  assert.ok(findMove(result.board));
});
