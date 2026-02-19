import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

export default function ProductDetailLoading() {
  return (
    <main>
      <Container maxW="6xl" py={8} px={4}>
        <Box mb={6}>
          <Skeleton h="8" w="36" borderRadius="md" />
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={8}
          align="flex-start"
        >
          <Box flex={1} maxW={{ md: "50%" }}>
            <Skeleton width="100%" paddingBottom="75%" borderRadius="lg" />
          </Box>

          <VStack flex={1} align="stretch" gap={5}>
            <Skeleton h="7" w="3/4" />
            <Flex gap={2}>
              <Skeleton h="5" w="16" />
              <Skeleton h="5" w="14" />
            </Flex>

            <Skeleton h="8" w="24" />
            <Flex gap={2}>
              <Skeleton h="4" w="12" />
              <Skeleton h="4" w="16" />
            </Flex>

            <SkeletonText noOfLines={4} gap={2} />

            <Flex gap={2} flexWrap="wrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} h="5" w="16" borderRadius="md" />
              ))}
            </Flex>

            <VStack align="stretch" gap={2}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Flex key={i} gap={2}>
                  <Skeleton h="4" w="24" flexShrink={0} />
                  <Skeleton h="4" flex={1} />
                </Flex>
              ))}
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </main>
  );
}
