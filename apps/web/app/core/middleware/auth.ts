import { SetAuthCookieAction } from "@/app/_actions/auth-actions";
import { UserSession } from "@/app/_types/auth.types";
import { decryptSession } from "@/app/utils/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function authMiddleware(request: NextRequest) {
  const session = request.cookies.get("bahmansabz-session")?.value;
  const authRoutes = ["/login"];
  const protectedRoutes = ["/profile"];
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const { nextUrl } = request;
  const nextResponse = NextResponse.next();
  // if user is not authenticated and trying to access protected routes, redirect to login
  if (!session) {
    if (isProtectedRoute) {
      const callbackUrl = encodeURIComponent(nextUrl.pathname);
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl + `?callbackUrl=${callbackUrl}`);
    }
    // No session and not on protected route (e.g. /login) → allow
    return nextResponse;
  }
  try {
    const decodedSession = (await decryptSession(
      session,
    )) as unknown as UserSession;
    const now = Date.now();
    const accessTokenExpired = decodedSession.exp < now;
    const bufferTime = 1000 * 30; // 30 seconds
    const refreshTokenExpired =
      decodedSession.refreshTokenExpiry < now + bufferTime;
    // if user is authenticated and trying to access auth routes, redirect to home
    if (!accessTokenExpired && !refreshTokenExpired && isAuthRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // if access token is expired and refresh token is not expired, refresh the access token and set the new access token in the cookie - SILENT RENEW
    if (accessTokenExpired && !refreshTokenExpired) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ refreshToken: decodedSession.refreshToken ,expiresInMins: 1}),
          },
        );
        if (response.ok) {
          const data = await response.json();
          await SetAuthCookieAction(data);
          // Redirect to same URL so the next request has the new cookie in the
          // request. Otherwise the current request continues with old cookies
          // and protected API calls (e.g. /auth/me) get 401.
          return NextResponse.redirect(nextUrl);
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
    if (refreshTokenExpired) {
      const cookieStore = await cookies();
      cookieStore.delete("bahmansabz-session");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Error decrypting session:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return nextResponse;
}
