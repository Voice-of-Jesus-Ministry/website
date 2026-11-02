import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import { accountsConfigured } from "./lib/account-config";
const withClerk = clerkMiddleware();
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  return accountsConfigured() ? withClerk(request, event) : NextResponse.next();
}
export const config = { matcher: ["/account", "/sign-in(.*)", "/sign-up(.*)", "/api/(.*)"] };
