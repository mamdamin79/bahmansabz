"use client"

import { useEffect, useState } from "react";
import { UserSession } from "../_types/auth.types";
import Link from "next/link";

export const AccountNavigation = () => {
  const [session, setSession] = useState<UserSession | null>(null);
    useEffect(() => {
        async function getSession() {
          try {
            const response = await fetch("/api/auth/session", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // Only set session when we got a successful response with no error
            if (response.ok && !("error" in data)) {
              setSession(data as UserSession);
            } else {
              setSession(null);
            }
          } catch (error) {
            console.error("Error getting session:", error);
            setSession(null);
          }
    }
    getSession();
  }, []);
  return <div>{session ? <div>
      <p>Username: {session.username}</p>
      <p>Email: {session.email}</p>
    </div> : <Link href="/login">Login</Link>}</div>;
};