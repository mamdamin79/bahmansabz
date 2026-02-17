import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <Container maxW="2xl" py={16}>
        <VStack gap={6} align="center" textAlign="center">
          <Heading as="h1" size="2xl">
            404
          </Heading>
          <Heading as="h2" size="lg" fontWeight="semibold">
            Page not found
          </Heading>
          <Text fontSize="md" color="gray.600" _dark={{ color: "gray.400" }}>
            The page you’re looking for doesn’t exist or has been moved.
          </Text>
          <Box>
            <Button asChild colorScheme="emerald" size="md">
              <Link href="/">Go home</Link>
            </Button>
          </Box>
        </VStack>
      </Container>
    </main>
  );
}
