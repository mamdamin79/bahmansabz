"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../_stores/auth.store";

export const AccountNavigation = () => {
  const { status, session, clearSession } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      clearSession();
      router.push("/");
    }
  };

  return (
    <div>
      {status === "authenticated" && session ? (
        <div>
          <p>Username: {session.username}</p>
          <p>Email: {session.email}</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : status === "unauthenticated" ? (
        <Link href="/login">Login</Link>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
