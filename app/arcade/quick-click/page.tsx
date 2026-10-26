import Link from "next/link";
import { QuickClick } from "../../../components/QuickClick";
export default function QuickClickPage() {
  return (
    <div className="container page narrow">
      <Link className="text-link" href="/arcade">
        ← All games
      </Link>
      <p className="eyebrow">A LITTLE PLAY. A LITTLE FOCUS.</p>
      <h1>Catch a little light.</h1>
      <QuickClick />
    </div>
  );
}
