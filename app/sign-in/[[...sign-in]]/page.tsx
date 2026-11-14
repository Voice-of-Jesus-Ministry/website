import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { accountsConfigured } from "../../../lib/account-config";
export default function SignInPage() {
  return <div className="container page narrow"><h1>Welcome back</h1>{accountsConfigured() ? <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/account" /> : <><p>Member sign-in is not open yet. You can continue exploring as a guest.</p><Link className="text-link" href="/account">Continue as a guest →</Link></>}</div>;
}
