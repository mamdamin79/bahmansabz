import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

export default function UserDetailLoading() {
  return (
    <main>
      <Container maxW="6xl" py={8} px={4}>
        <Box mb={6}>
          <Skeleton h="8" w="32" borderRadius="md" />
        </Box>

        <Flex direction="column" gap={6}>
          <Flex gap={4} align="center" flexWrap="wrap">
            <Skeleton borderRadius="full" boxSize="20" flexShrink={0} />
            <VStack align="start" gap={2} flex={1} minW={0}>
              <Skeleton h="6" w="48" />
              <Skeleton h="4" w="32" />
              <Skeleton h="4" w="24" />
            </VStack>
          </Flex>

          <VStack align="stretch" gap={4}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Box key={i}>
                <Skeleton h="3" w="16" mb={1} />
                <SkeletonText noOfLines={1} gap={0} />
              </Box>
            ))}
          </VStack>
        </Flex>
      </Container>
    </main>
  );
}
