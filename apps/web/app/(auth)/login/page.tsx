import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { LoginForm } from "./_components/LoginForm";

export default function LoginPage() {
  return (
    <Flex
      minH="calc(100vh - 56px)"
      align="center"
      justify="center"
      px={4}
      py={10}
    >
      <Center w="full" maxW="md">
        <Box
          w="full"
          borderRadius="2xl"
          shadow="xl"
          borderWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
          p={{ base: 6, sm: 8 }}
        >
          <Box mb={6} textAlign="center">
            <Text
              as="h1"
              fontSize="2xl"
              fontWeight="bold"
              color="gray.800"
              _dark={{ color: "white" }}
              letterSpacing="tight"
            >
              Welcome back
            </Text>
            <Text
              mt={1}
              fontSize="sm"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Sign in to your account
            </Text>
          </Box>
          <Suspense
            fallback={
              <Center py={10}>
                <Spinner size="lg" colorScheme="emerald" />
              </Center>
            }
          >
            <LoginForm />
          </Suspense>
        </Box>
      </Center>
    </Flex>
  );
}
