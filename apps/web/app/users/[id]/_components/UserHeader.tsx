import { Box, Heading, Text } from "@chakra-ui/react";

interface UserHeaderProps {
  firstName: string;
  lastName: string;
  username: string;
  role?: string;
}

export function UserHeader({
  firstName,
  lastName,
  username,
  role,
}: UserHeaderProps) {
  return (
    <Box>
      <Text
        fontSize="sm"
        color="gray.500"
        _dark={{ color: "gray.400" }}
        textTransform="capitalize"
        mb={1}
      >
        {role ?? "User"}
      </Text>
      <Heading as="h1" size="2xl">
        {firstName} {lastName}
      </Heading>
      <Text fontSize="md" color="gray.500" _dark={{ color: "gray.400" }} mt={1}>
        @{username}
      </Text>
    </Box>
  );
}
