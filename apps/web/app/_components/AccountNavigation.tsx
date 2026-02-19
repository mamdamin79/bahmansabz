"use client";

import {
  Avatar,
  Box,
  Flex,
  Link as ChakraLink,
  Menu,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../_stores/auth.store";

function displayName(session: { firstName?: string; lastName?: string; username: string }) {
  const name = [session.firstName, session.lastName].filter(Boolean).join(" ");
  return name.trim() || session.username;
}

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
        <Menu.Root positioning={{ placement: "bottom-end" }}>
          <Menu.Trigger
            asChild
            cursor="pointer"
            _hover={{ opacity: 0.9 }}
            borderRadius="full"
            outline="none"
            _focusVisible={{ ring: 2, ringColor: "whiteAlpha.500" }}
          >
            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "4px 8px 4px 4px",
                background: "transparent",
                border: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <Avatar.Root size="sm" borderRadius="full">
                <Avatar.Image src={session.image} alt="" />
                <Avatar.Fallback
                  bg="whiteAlpha.300"
                  color="white"
                  fontSize="xs"
                  fontWeight="semibold"
                >
                  {displayName(session).slice(0, 2).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color="white"
                lineClamp={1}
                maxW={{ base: "80px", sm: "140px" }}
              >
                {displayName(session)}
              </Text>
            </button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content
              minW="200px"
              py={2}
              px={1}
              borderWidth="1px"
              shadow="xl"
              borderRadius="xl"
            >
              <Menu.Item value="profile">
                <ChakraLink
                  as={Link}
                  href="/profile"
                  display="flex"
                  alignItems="center"
                  gap={3}
                  px={3}
                  py={2.5}
                  fontSize="sm"
                  fontWeight="medium"
                  color="gray.500"
                  border="none"
                  outline="none"
                  width="full"
                  
                >
                  <Box color="gray.500" _dark={{ color: "gray.400" }}>
                    <User size={18} strokeWidth={2} />
                  </Box>
                  Profile
                </ChakraLink>
              </Menu.Item>
              <Menu.Separator
                my={1}
                color="gray.200"
                _dark={{ color: "gray.600" }}
              />
              <Menu.Item
                value="logout"
                onClick={handleLogout}
                display="flex"
                alignItems="center"
                gap={3}
                px={3}
                py={2.5}
                fontSize="sm"
                fontWeight="medium"
                color="red.600"
                borderRadius="lg"
                cursor="pointer"
                _hover={{ bg: "red.50" }}
                _dark={{
                  color: "red.400",
                  _hover: { bg: "red.900/30" },
                }}
              >
                <Box color="red.500" _dark={{ color: "red.400" }}>
                  <LogOut size={18} strokeWidth={2} />
                </Box>
                Log out
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
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
        <Spinner size="sm" color="white" />
      )}
    </Box>
  );
};
