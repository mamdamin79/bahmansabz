"use client";
import { useState, useTransition } from "react";
import { loginAction } from "@/app/_actions/auth-actions";
import { useAuthStore } from "@/app/_stores/auth.store";
import { useRouter } from "next/navigation";
export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const { updateSession } = useAuthStore();
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);
    startTransition(async () => {
      const response = await loginAction({ username, password });
      if (response.isSuccess) {
        updateSession();
        router.push("/profile");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
