import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { cookies } from "next/headers";
import { decryptSession } from "@/app/utils/session";

const getProfileData = async () => {
  const cookieStore = await cookies();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://dummyjson.com";
  const session = cookieStore.get("bahmansabz-session")?.value;
  if (!session) {
    return { error: "No session found" };
  }
  const decodedSession = await decryptSession(session);
  const response = await fetch(`${apiUrl}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${decodedSession.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return response.json();
  }
  return { error: "Failed to fetch profile data" };
};

export default async function ProfilePage() {
  const profileData = await getProfileData();
  if (profileData.error) {
    return (
      <Container maxW="4xl" py={10}>
        <Text color="red.500">{profileData.error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="4xl" py={10}>
      <Heading as="h1" size="xl" mb={6}>
        Profile
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
        <Box
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          bg="gray.50"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <VStack align="stretch" gap={3}>
            <Text
              fontWeight="semibold"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Name
            </Text>
            <Text fontSize="lg">
              {profileData.firstName} {profileData.lastName}
            </Text>
            <Text
              fontWeight="semibold"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Email
            </Text>
            <Text fontSize="lg">{profileData.email}</Text>
            <Text
              fontWeight="semibold"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Username
            </Text>
            <Text fontSize="lg">{profileData.username}</Text>
          </VStack>
        </Box>
        <Box
          p={6}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          bg="gray.50"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <VStack align="stretch" gap={3}>
            <Heading as="h2" size="md">
              Details
            </Heading>
            <Text>
              Name: {profileData.firstName} {profileData.lastName}
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
