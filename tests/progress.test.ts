import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyProgress,
  normalizeScore,
  parseProgress,
  recordAttempt,
  totalXp,
} from "../lib/progress.ts";
import {
  clamp,
  defaultTargetLifetimeMs,
  isHit,
  nextSpawnDelayMs,
} from "../lib/games/quick-click.ts";
import { questions } from "../lib/games/questions.ts";

test("games use a common 100-point scale without repeat farming", () => {
  let state = recordAttempt(emptyProgress(), "bible-quiz", 8, "quiz-1");
  state = recordAttempt(state, "quick-click", 10, "click-1");
  assert.equal(totalXp(state), 130);
  state = recordAttempt(state, "bible-quiz", 3, "quiz-2");
  assert.equal(totalXp(state), 130);
  state = recordAttempt(state, "bible-quiz", 10, "quiz-3");
  assert.equal(totalXp(state), 150);
});
test("a repeated completion cannot apply a new score", () => {
  const state = recordAttempt(emptyProgress(), "quick-click", 2, "attempt");
  assert.deepEqual(recordAttempt(state, "quick-click", 20, "attempt"), state);
});
test("invalid scores do not damage a valid result", () => {
  const state = recordAttempt(emptyProgress(), "bible-quiz", 5, "valid");
  for (const score of [NaN, Infinity, -1, 1.5])
    assert.deepEqual(
      recordAttempt(state, "bible-quiz", score, "invalid"),
      state,
    );
  assert.equal(normalizeScore("quick-click", 500), 100);
  assert.equal(normalizeScore("bible-quiz", Infinity), 0);
});
test("corrupt local data is discarded and valid data round-trips", () => {
  for (const raw of [
    null,
    "bad-json",
    "null",
    "[]",
    JSON.stringify({
      version: 1,
      best: { "bible-quiz": -1, "quick-click": 0 },
      recentAttempts: [],
    }),
  ])
    assert.deepEqual(parseProgress(raw), emptyProgress());
  const state = recordAttempt(emptyProgress(), "bible-quiz", 7, "quiz-1");
  assert.deepEqual(parseProgress(JSON.stringify(state)), state);
});
test("attempt history stays bounded", () => {
  let state = emptyProgress();
  for (let i = 0; i < 80; i++)
    state = recordAttempt(state, "quick-click", i, `attempt-${i}`);
  assert.equal(state.recentAttempts.length, 50);
  assert.equal(totalXp(state), 100);
});
test("migrated target geometry includes the edge and excludes outside hits", () => {
  const target = { x: 10, y: 10, radius: 5, expiresAt: 1000 };
  assert.equal(isHit(target, 13, 14), true);
  assert.equal(isHit(target, 16, 10), false);
  assert.equal(clamp(-3, 0, 100), 0);
  assert.equal(defaultTargetLifetimeMs(), 850);
  assert.equal(
    nextSpawnDelayMs(() => 0),
    250,
  );
  assert.ok(nextSpawnDelayMs(() => 0.999) < 900);
});
test("quiz data has unique ids and valid answer references", () => {
  assert.equal(questions.length, 10);
  assert.equal(new Set(questions.map((q) => q.id)).size, questions.length);
  for (const question of questions) {
    assert.equal(question.choices.length, 4);
    assert.ok(
      question.answerIndex >= 0 &&
        question.answerIndex < question.choices.length,
    );
    assert.ok(question.reference && question.explanation);
  }
});
