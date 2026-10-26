// Adapted from AmazingGrace src/arcade/quick-click/gameLogic.ts.
// Source commit c39e707f940225b1b76c555741abee217326a3c7; GPL-3.0. See THIRD_PARTY_NOTICES.md.
export type QuickClickTarget = {
  x: number;
  y: number;
  radius: number;
  expiresAt: number;
};

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function isHit(target: QuickClickTarget, x: number, y: number): boolean {
  const dx = x - target.x;
  const dy = y - target.y;
  return dx * dx + dy * dy <= target.radius * target.radius;
}

export function nextSpawnDelayMs(rng = Math.random): number {
  // Random interval (ms) to satisfy "targets appear at random intervals".
  // Keep it snappy but not flickery.
  const min = 250;
  const max = 900;
  return Math.floor(min + (max - min) * rng());
}

export function defaultTargetLifetimeMs(): number {
  return 850;
}
