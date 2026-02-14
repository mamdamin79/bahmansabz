
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function authMiddleware(request: NextRequest) {
    const session = request.cookies.get("bahmansabz-session")?.value;
    const authRoutes = ["/login"];
    const protectedRoutes = ["/profile"];
    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));
    const {nextUrl} = request
    const nextResponse = NextResponse.next();
    if (!session) {
        if (isProtectedRoute) {
            const callbackUrl = encodeURIComponent(nextUrl.pathname);
            const loginUrl = request.nextUrl.clone();
            loginUrl.pathname = "/login";
            return NextResponse.redirect(loginUrl+`?callbackUrl=${callbackUrl}`);
        }
        return nextResponse;
    }
    return nextResponse;
}   