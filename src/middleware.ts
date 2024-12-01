import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);
const publicRoutes = ["/", "/login", "/register"];
const startsRoutes = ['/api/auth/callback/google']
export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;
  
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)

  const isStartsRoutes = startsRoutes.some(prefix =>
    nextUrl.pathname.startsWith(prefix)
  )
console.log({isPublicRoutes, isStartsRoutes, isLoggedIn})

  if (!isPublicRoutes && !isStartsRoutes && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
  return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
