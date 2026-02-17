import { Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <main>
      <Container maxW="4xl" py={16}>
        <VStack gap={4} align="center" textAlign="center">
          <Heading as="h1" size="2xl">
            Welcome to Bahmansabz
          </Heading>
          <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.400" }}>
            Your Turbo Repo monorepo with Next.js and Biome is ready!
          </Text>
        </VStack>
      </Container>
    </main>
  );
}
