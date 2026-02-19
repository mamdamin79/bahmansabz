"use client";

import {
  Alert,
  Box,
  Button,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={5}>
        <Field.Root invalid={!!errors.username}>
          <Field.Label fontWeight="medium" color="gray.600" _dark={{ color: "gray.400" }}>
            Username
          </Field.Label>
          <Input
            size="lg"
            type="text"
            placeholder="Enter your username"
            autoComplete="username"
            borderRadius="lg"
            _focusVisible={{ ringColor: "emerald.500" }}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <Field.Label fontWeight="medium" color="gray.600" _dark={{ color: "gray.400" }}>
            Password
          </Field.Label>
          <Input
            size="lg"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            borderRadius="lg"
            _focusVisible={{ ringColor: "emerald.500" }}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
          )}
        </Field.Root>
        {errors.root && (
          <Alert.Root status="error" variant="subtle" borderRadius="lg">
            <Alert.Indicator />
            <Alert.Title fontSize="sm">{errors.root.message}</Alert.Title>
          </Alert.Root>
        )}
        <Button
          type="submit"
          colorScheme="emerald"
          size="lg"
          loading={isPending}
          loadingText="Signing in..."
          width="full"
          borderRadius="lg"
          fontWeight="semibold"
          mt={1}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  );
};
