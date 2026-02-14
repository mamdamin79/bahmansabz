import type { NextRequest } from "next/server";
import { authMiddleware } from "./app/core/middleware/auth";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware");
  return authMiddleware(request);
}

export const config = {
  matcher: ["/profile", "/login"],
};
