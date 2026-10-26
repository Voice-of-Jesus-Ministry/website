import Link from "next/link";
import { BibleQuiz } from "../../../components/BibleQuiz";
export default function QuizPage() {
  return (
    <div className="container page narrow">
      <Link className="text-link" href="/arcade">
        ← All games
      </Link>
      <p className="eyebrow">LEARN AT YOUR OWN PACE</p>
      <h1>A closer look at Scripture.</h1>
      <BibleQuiz />
    </div>
  );
}
