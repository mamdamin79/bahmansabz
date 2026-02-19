import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";

export default function ProductsLoading() {
  return (
    <main>
      <Container maxW="7xl" py={8} px={4}>
        <Heading as="h1" size="xl" mb={6}>
          Products
        </Heading>
        <Flex direction="column" minW={0} w="full">
          <Flex
            mb={6}
            gap={4}
            flex={1}
            minW={0}
            direction={{ base: "column", sm: "row" }}
            align={{ base: "stretch", sm: "center" }}
          >
            <Skeleton flex={1} minW={0} maxW="xs" h="10" borderRadius="md" />
            <Skeleton h="10" w="36" borderRadius="md" />
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4} flex={1}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="gray.50"
                borderColor="gray.200"
                _dark={{ bg: "gray.800", borderColor: "gray.700" }}
              >
                <Skeleton
                  width="100%"
                  paddingBottom="100%"
                  borderBottomRadius={0}
                />
                <Box p={4}>
                  <Skeleton h="4" w="full" mb={2} />
                  <Skeleton h="5" w="20" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          <Flex mt={4} justifyContent="center" gap={2}>
            <Skeleton h="8" w="24" />
            <Skeleton h="8" w="8" />
            <Skeleton h="8" w="8" />
            <Skeleton h="8" w="24" />
          </Flex>
        </Flex>
      </Container>
    </main>
  );
}
