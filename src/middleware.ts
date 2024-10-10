import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let locales = ["en-US", "ar"];

function getLocale(request: Request) {
  // Use the request's headers to get the accept-language
  let headers = {
    "accept-language":
      request.headers.get("accept-language") || "en-US,en;q=0.5",
  };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "en-US";

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export default withAuth(
  function middleware(request) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/api/')) return; // Skip locale middleware for API routes
    
    const pathnameHasLocale = locales.some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl);
  },
  {
    pages: {
      signIn: "/login", // Redirect unauthenticated users to /login
    },
  }
);

export const config = {
  matcher: ["/api/tasks/:path*", "/tasks/:path*", "/api/team/:path*"],
};
