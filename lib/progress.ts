export const GAME_IDS = ["bible-quiz", "quick-click"] as const;
export type GameId = (typeof GAME_IDS)[number];
export type Progress = {
  version: 1;
  best: Record<GameId, number>;
  recentAttempts: string[];
};
export const PROGRESS_KEY = "voj-practice-v1";
export const emptyProgress = (): Progress => ({
  version: 1,
  best: { "bible-quiz": 0, "quick-click": 0 },
  recentAttempts: [],
});

// Untrusted local data never grants a server entitlement or a paid allowance.
export function parseProgress(raw: string | null): Progress {
  if (!raw) return emptyProgress();
  try {
    const value = JSON.parse(raw);
    if (
      value?.version !== 1 ||
      !value.best ||
      !Array.isArray(value.recentAttempts)
    )
      return emptyProgress();
    const result = emptyProgress();
    for (const id of GAME_IDS) {
      const score = value.best[id];
      if (!Number.isInteger(score) || score < 0 || score > 100)
        return emptyProgress();
      result.best[id] = score;
    }
    result.recentAttempts = value.recentAttempts
      .filter(
        (id: unknown): id is string =>
          typeof id === "string" && id.length <= 100,
      )
      .slice(-50);
    return result;
  } catch {
    return emptyProgress();
  }
}

export function normalizeScore(game: GameId, rawScore: number): number {
  if (!Number.isFinite(rawScore) || rawScore < 0) return 0;
  // Quiz: 10 questions. Quick Click: a practice benchmark of 20 hits.
  return Math.min(100, Math.floor(rawScore * (game === "bible-quiz" ? 10 : 5)));
}

export function recordAttempt(
  progress: Progress,
  game: GameId,
  rawScore: number,
  attemptId: string,
): Progress {
  if (
    !GAME_IDS.includes(game) ||
    !attemptId ||
    attemptId.length > 100 ||
    !Number.isFinite(rawScore) ||
    rawScore < 0 ||
    !Number.isInteger(rawScore) ||
    progress.recentAttempts.includes(attemptId)
  )
    return progress;
  return {
    version: 1,
    best: {
      ...progress.best,
      [game]: Math.max(progress.best[game], normalizeScore(game, rawScore)),
    },
    recentAttempts: [...progress.recentAttempts.slice(-49), attemptId],
  };
}
export const totalXp = (progress: Progress): number =>
  GAME_IDS.reduce((sum, game) => sum + progress.best[game], 0);
