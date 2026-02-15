import { Suspense } from "react";
import { Box, Center, Heading, Spinner, VStack } from "@chakra-ui/react";
import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <Box py={10} px={4}>
      <Center>
        <VStack gap={8} align="stretch" w="full" maxW="md">
          <Heading as="h1" size="xl" textAlign="center">
            Login
          </Heading>
          <Suspense
            fallback={
              <Center py={10}>
                <Spinner size="lg" />
              </Center>
            }
          >
            <LoginForm />
          </Suspense>
        </VStack>
      </Center>
    </Box>
  );
}
