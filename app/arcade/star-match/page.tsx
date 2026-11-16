import type { Metadata } from "next";
import Link from "next/link";
import StarMatch from "./StarMatch";

export const metadata: Metadata = {
  title: "Star Match | Voice of Jesus Ministry",
  description: "Swap neighboring tiles and line up matching shapes in this untimed arcade puzzle.",
};

export default function StarMatchPage() {
  return (
    <div className="container page narrow">
      <Link className="text-link" href="/arcade">← All games</Link>
      <h1>Star Match</h1>
      <p className="lede">Swap neighboring tiles to line up three or more matching shapes. Clear as many tiles as you can in 12 moves.</p>
      <StarMatch />
    </div>
  );
}
