import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { accountsConfigured } from "../../../lib/account-config";
export default function SignUpPage() {
  return <div className="container page narrow"><h1>Join our learning community</h1>{accountsConfigured() ? <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" fallbackRedirectUrl="/account" /> : <><p>Registration is not open yet. Our lessons and guest games remain free to explore.</p><Link className="text-link" href="/bible-study">Explore Bible studies →</Link></>}</div>;
}
