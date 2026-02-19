import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";

export default function ProfileLoading() {
  return (
    <Flex
      minH="calc(100vh - 56px)"
      py={10}
      px={4}
    >
      <Container maxW="3xl">
        <Box mb={8}>
          <Skeleton h="8" w="24" mb={2} />
          <Skeleton h="4" w="48" />
        </Box>
        <Box
          bg="white"
          borderRadius="2xl"
          shadow="lg"
          borderWidth="1px"
          borderColor="gray.200"
          overflow="hidden"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Box px={{ base: 5, sm: 6 }} py={5} borderBottomWidth="1px" borderColor="gray.200" _dark={{ borderColor: "gray.700" }}>
            <Skeleton h="4" w="36" />
          </Box>
          <Box px={{ base: 5, sm: 6 }} py={6}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
              {Array.from({ length: 3 }).map((_, i) => (
                <Box key={i}>
                  <Skeleton h="3" w="20" mb={2} />
                  <Skeleton h="5" w="full" />
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
    </Flex>
  );
}
