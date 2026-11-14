import { GuestAccount } from "../../components/GuestAccount";
import Link from "next/link";
import { accountsConfigured } from "../../lib/account-config";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
export default async function Account() {
  const enabled = accountsConfigured();
  const userId = enabled ? (await auth()).userId : null;
  return (
    <div className="container page">
      <p className="eyebrow">YOUR JOURNEY</p>
      <h1>Your learning journey</h1>
      <p className="lede">Explore Scripture, save your progress, and grow with the community.</p>
      {enabled ? <section className="section">
        {userId ? <><h2>Your account</h2><UserButton /><p>You’re signed in. Guest game results below remain on this device until verified progress syncing is enabled.</p></> : <><h2>Join the community</h2><p>Sign in or create an account to begin your ministry profile.</p><div className="actions"><Link className="text-link" href="/sign-in">Log in →</Link><Link className="text-link" href="/sign-up">Create an account →</Link></div></>}
      </section> : <section className="section"><h2>Keep exploring as a guest</h2><p>Member registration is not open yet. Bible studies, quizzes, and your local notes are available now.</p></section>}
      <GuestAccount />
      <section className="section"><h2>Community sharing</h2><p>Photo and video submissions are not open yet. When available, submissions will require an account and moderator approval before appearing publicly.</p></section>
    </div>
  );
}
