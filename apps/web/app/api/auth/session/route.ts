import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decryptSession } from "../../../utils/session";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("bahmansabz-session")?.value;
  if (!session) {
    return NextResponse.json({ error: "No session found" }, { status: 401 });
  }
  try {
    const payload = await decryptSession(session);
    return NextResponse.json(payload);
  } catch (e: unknown) {
    // Invalid or malformed token → 401 so client can refresh or redirect to login
    return NextResponse.json(
      { error: "Invalid or expired session" },
      { status: 401 }
    );
  }
}