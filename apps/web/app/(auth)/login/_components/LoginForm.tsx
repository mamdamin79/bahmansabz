"use client";

import { Box, Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "@/app/_actions/auth-actions";
import { useAuthStore } from "@/app/_stores/auth.store";

type LoginFormValues = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const { updateSession } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError: setFormError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (values: LoginFormValues) => {
    startTransition(async () => {
      const response = await loginAction({
        username: values.username,
        password: values.password,
      });
      if (response.isSuccess) {
        updateSession();
        router.push("/profile");
      } else {
        setFormError("root", {
          type: "manual",
          message: response.error ?? "Login failed",
        });
      }
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Field.Root invalid={!!errors.username}>
            <Field.Label>Username</Field.Label>
            <Input
              type="text"
              placeholder="Enter username"
              autoComplete="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Field.ErrorText>{errors.password.message}</Field.ErrorText>
            )}
          </Field.Root>
          {errors.root && (
            <Text color="red.500" fontSize="sm">
              {errors.root.message}
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
