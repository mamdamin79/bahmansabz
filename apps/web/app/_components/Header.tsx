import {
  Box,
  Link as ChakraLink,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { AccountNavigation } from "./AccountNavigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/users", label: "Users" },
] as const;

export const Header = () => {
  return (
    <Box as="header" bg="emerald.700" color="white" px={4} py={3} shadow="md">
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto" gap={4}>
        <Link href="/">
          <ChakraLink
            as="span"
            fontSize="xl"
            fontWeight="bold"
            letterSpacing="tight"
            color="white"
            _hover={{ opacity: 0.9 }}
            textDecoration="none"
          >
            Bahmansabz
          </ChakraLink>
        </Link>
        <nav>
          <HStack as="ul" listStyleType="none" gap={6} align="center">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>
                  <ChakraLink
                    as="span"
                    display="block"
                    py={1.5}
                    px={0}
                    fontSize="sm"
                    fontWeight="medium"
                    color="whiteAlpha.900"
                    _hover={{ color: "white", textDecoration: "underline" }}
                    textDecoration="none"
                  >
                    {label}
                  </ChakraLink>
                </Link>
              </li>
            ))}
            <li>
              <AccountNavigation />
            </li>
          </HStack>
        </nav>
      </Flex>
    </Box>
  );
};
