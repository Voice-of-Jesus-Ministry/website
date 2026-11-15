"use client";
import { useProgress } from "./ProgressProvider";
import { PracticeSummary } from "./PracticeSummary";
export function GuestAccount() {
  const { reset, ready } = useProgress();
  return (
    <>
      <PracticeSummary />
      <section className="game-panel">
        <h2>Manage practice results</h2>
        <p>
          Resetting removes only your game progress. Your workspace notes are
          managed separately.
        </p>
        <button
          className="button secondary"
          disabled={!ready}
          onClick={() => {
            if (confirm("Reset your practice results on this browser?"))
              reset();
          }}
        >
          Reset practice progress
        </button>
      </section>
    </>
  );
}
