import { type JWTPayload, jwtVerify, SignJWT } from "jose";
import type { UserSession } from "../_types/auth.types";

const secret = process.env.JWT_SECRET;
const encodedSecret = new TextEncoder().encode(secret);

export const encryptSession = async (session: UserSession) => {
  return new SignJWT(session as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedSecret);
};

export const decryptSession = async (session: string) => {
  const { payload } = await jwtVerify(session, encodedSecret,{
    algorithms: ["HS256"],
  });
  return payload;
};
