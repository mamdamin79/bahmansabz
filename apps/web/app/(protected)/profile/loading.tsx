import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

export default function ProfileLoading() {
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
            {Array.from({ length: 6 }).map((_, i) => (
              <Box key={i}>
                <Skeleton h="3" w="16" mb={1} />
                <Skeleton h="5" w="full" />
              </Box>
            ))}
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
            <Skeleton h="5" w="16" mb={2} />
            <SkeletonText noOfLines={3} gap={2} />
          </VStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
}
