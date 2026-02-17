"use client";

import { Box, Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { loginAction } from "@/app/_actions/auth-actions";
import { useAuthStore } from "@/app/_stores/auth.store";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { updateSession } = useAuthStore();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const response = await loginAction({ username, password });
      if (response.isSuccess) {
        updateSession();
        router.push("/profile");
      } else {
        setError(response.error ?? "Login failed");
      }
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </Field.Root>
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Button
            type="submit"
            colorScheme="emerald"
            loading={isPending}
            loadingText="Logging in..."
            width="full"
          >
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
