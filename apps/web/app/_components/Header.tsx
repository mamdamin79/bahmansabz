import {
  Box,
  Link as ChakraLink,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AccountNavigation } from "./AccountNavigation";

export const Header = () => {
  return (
    <Box as="header" bg="emerald.700" color="white" px={4} py={3} shadow="md">
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        <Heading as="h1" size="lg" fontWeight="bold">
          Bahmansabz
        </Heading>
        <nav>
          <HStack as="ul" listStyleType="none" gap={4} align="center">
            <li>
              <Link href="/">
                <ChakraLink
                  as="span"
                  color="white"
                  _hover={{ textDecoration: "underline" }}
                >
                  Home
                </ChakraLink>
              </Link>
            </li>
            <li>
              <Link href="/products">
                <ChakraLink
                  as="span"
                  color="white"
                  _hover={{ textDecoration: "underline" }}
                >
                  Products
                </ChakraLink>
              </Link>
            </li>
            <li>
              <AccountNavigation />
            </li>
          </HStack>
        </nav>
      </Flex>
    </Box>
  );
};
