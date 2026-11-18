// Shared game helper utilities
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function isHit(targetX: number, targetY: number, clickX: number, clickY: number, radius: number): boolean {
  const dx = targetX - clickX;
  const dy = targetY - clickY;
  return Math.sqrt(dx * dx + dy * dy) <= radius;
}
