"use client";

import {
  Box,
  Button,
  Link as ChakraLink,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
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
    <Box>
      {status === "authenticated" && session ? (
        <HStack gap={3} align="center">
          <Text fontSize="sm" lineClamp={1} maxW="120px">
            {session.username}
          </Text>
          <Link href="/profile">
            <ChakraLink
              as="span"
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Profile
            </ChakraLink>
          </Link>
          <Button
            type="button"
            size="sm"
            variant="outline"
            colorScheme="whiteAlpha"
            borderColor="whiteAlpha.500"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      ) : status === "unauthenticated" ? (
        <Link href="/login">
          <ChakraLink
            as="span"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Login
          </ChakraLink>
        </Link>
      ) : (
        <Spinner size="sm" />
      )}
    </Box>
  );
};
