"use client"

import { useEffect, useState } from "react";
import { UserSession } from "../_types/auth.types";
import Link from "next/link";
import { useAuthStore } from "../_stores/auth.store";

export const AccountNavigation = () => {
  const { status, session } = useAuthStore();
  return <div>{status === "authenticated" && session ? <div>
      <p>Username: {session.username}</p>
      <p>Email: {session.email}</p>
    </div> : status === "unauthenticated" ? <Link href="/login">Login</Link> : <div>Loading...</div>}</div>;
};