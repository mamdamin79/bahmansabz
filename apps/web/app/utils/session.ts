import { jwtDecode } from "jwt-decode";
import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import type { JWT, UserSession } from "../_types/auth.types";

const secret = process.env.JWT_SECRET;
const encodedSecret = new TextEncoder().encode(secret);

/** Builds encrypted session string from auth API response (login or refresh). Use in auth-actions and middleware. */
export async function getEncryptedSessionFromAuthResponse(user: {
  accessToken: string;
  refreshToken: string;
}): Promise<string> {
  const decodedAccess = jwtDecode<JWT>(user.accessToken);
  const decodedRefresh = jwtDecode<JWT>(user.refreshToken);
  const session: UserSession = {
    ...decodedAccess,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    exp: decodedAccess.exp * 1000,
    refreshTokenExpiry: decodedRefresh.exp * 1000,
  };
  return encryptSession(session);
}

export const encryptSession = async (session: UserSession) => {
  return new SignJWT(session as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecret);
};

export const decryptSession = async (session: string) => {
  if (typeof session !== "string" || !session.trim()) {
    throw new Error("Session must be a non-empty string");
  }
  const { payload } = await jwtVerify(session, encodedSecret, {
    algorithms: ["HS256"],
  });
  return payload;
};
