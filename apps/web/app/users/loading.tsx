import {
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Table,
} from "@chakra-ui/react";

export default function UsersLoading() {
  return (
    <main>
      <Container maxW="7xl" py={8} px={4}>
        <Heading as="h1" size="xl" mb={2}>
          Users
        </Heading>
        <Flex mb={6} gap={4} align="center">
          <Skeleton flex={1} minW={0} maxW="xs" h="10" borderRadius="md" />
          <Skeleton h="4" w="16" />
        </Flex>

        <Box overflowX="auto">
          <Table.Root size="sm" variant="outline">
            <Table.Header>
              <Table.Row>
                {Array.from({ length: 8 }).map((_, i) => (
                  <Table.ColumnHeader key={i}>
                    <Skeleton h="4" w={i === 1 ? "12" : "16"} />
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {Array.from({ length: 8 }).map((_, cellIndex) => (
                    <Table.Cell key={cellIndex}>
                      {cellIndex === 1 ? (
                        <Skeleton borderRadius="full" boxSize="8" />
                      ) : (
                        <SkeletonText noOfLines={1} gap={0} />
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <Flex mt={4} justifyContent="center" gap={2}>
          <Skeleton h="8" w="24" />
          <Skeleton h="8" w="8" />
          <Skeleton h="8" w="8" />
          <Skeleton h="8" w="24" />
        </Flex>
      </Container>
    </main>
  );
}
