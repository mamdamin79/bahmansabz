"use client";

import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <Container maxW="2xl" py={16}>
        <VStack gap={6} align="center" textAlign="center">
          <Heading as="h1" size="xl" color="red.600" _dark={{ color: "red.400" }}>
            Something went wrong
          </Heading>
          <Text fontSize="md" color="gray.600" _dark={{ color: "gray.400" }}>
            {error.message ?? "An unexpected error occurred."}
          </Text>
          <Box>
            <Button
              colorScheme="emerald"
              onClick={reset}
              size="md"
            >
              Try again
            </Button>
          </Box>
        </VStack>
      </Container>
    </main>
  );
}
