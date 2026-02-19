import {
  Alert,
  Box,
  Container,
  Flex,
  SimpleGrid,
  Text,
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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="medium"
        color="gray.500"
        _dark={{ color: "gray.400" }}
        textTransform="uppercase"
        letterSpacing="wider"
        mb={1}
      >
        {label}
      </Text>
      <Text
        fontSize="md"
        fontWeight="medium"
        color="gray.800"
        _dark={{ color: "gray.100" }}
      >
        {value}
      </Text>
    </Box>
  );
}

export default async function ProfilePage() {
  const profileData = await getProfileData();
  if (profileData.error) {
    return (
      <Container maxW="2xl" py={10} px={4}>
        <Alert.Root status="error" variant="subtle" borderRadius="xl">
          <Alert.Indicator />
          <Alert.Title>{profileData.error}</Alert.Title>
        </Alert.Root>
      </Container>
    );
  }

  const fullName =
    [profileData.firstName, profileData.lastName].filter(Boolean).join(" ") ||
    "—";

  return (
    <Flex minH="calc(100vh - 56px)" py={10} px={4}>
      <Container maxW="3xl">
        <Box mb={8}>
          <Text
            as="h1"
            fontSize="2xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
            letterSpacing="tight"
          >
            Profile
          </Text>
          <Text
            mt={1}
            fontSize="sm"
            color="gray.600"
            _dark={{ color: "gray.400" }}
          >
            Your account information
          </Text>
        </Box>

        <Box
          borderRadius="2xl"
          shadow="lg"
          borderWidth="1px"
          borderColor="gray.200"
          overflow="hidden"
        >
          <Box
            px={{ base: 5, sm: 6 }}
            py={5}
            borderBottomWidth="1px"
            borderColor="gray.200"
            _dark={{ borderColor: "gray.700" }}
          >
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="gray.600"
              _dark={{ color: "gray.400" }}
            >
              Personal information
            </Text>
          </Box>
          <Box px={{ base: 5, sm: 6 }} py={6}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
              <InfoRow label="Full name" value={fullName} />
              <InfoRow label="Username" value={profileData.username ?? "—"} />
              <InfoRow label="Email" value={profileData.email ?? "—"} />
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
}
