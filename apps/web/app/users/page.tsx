import { Badge, Box, Container, Flex, Heading, Table, Text } from "@chakra-ui/react";
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import { SearchInput } from "@/app/_components/SearchInput";
import { getUsers, USERS_PAGE_SIZE } from "@/app/_utils/users";

function getStringParam(
  value: string | string[] | undefined
): string | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = getStringParam(params.q);
  const pageParam = getStringParam(params.page);
  const pageNum = Math.max(1, Number(pageParam) || 1);
  const { users, total } = await getUsers(pageNum, q);

  return (
    <main>
      <Container maxW="7xl" py={8} px={4}>
        <Heading as="h1" size="xl" mb={2}>
          Users
        </Heading>
        <Flex mb={6} gap={4} align="center">
          <SearchInput
            basePath="/users"
            defaultValue={q ?? ""}
            placeholder="Search users…"
          />
          <Text
            fontSize="sm"
            color="gray.500"
            _dark={{ color: "gray.400" }}
            flexShrink={0}
          >
            {total} users
          </Text>
        </Flex>

        {users.length === 0 ? (
          <Text color="gray.500">
            {q?.trim() ? "No users match your search." : "No users found."}
          </Text>
        ) : (
          <>
            <Box overflowX="auto">
              <Table.Root size="sm" variant="outline">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>#</Table.ColumnHeader>
                    <Table.ColumnHeader>Avatar</Table.ColumnHeader>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Email</Table.ColumnHeader>
                    <Table.ColumnHeader>Phone</Table.ColumnHeader>
                    <Table.ColumnHeader>Age</Table.ColumnHeader>
                    <Table.ColumnHeader>Role</Table.ColumnHeader>
                    <Table.ColumnHeader>Company</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {users.map((user) => (
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>
                        <img
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          width={32}
                          height={32}
                          style={{ borderRadius: "50%" }}
                        />
                      </Table.Cell>
                      <Table.Cell fontWeight="medium">
                        {user.firstName} {user.lastName}
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="sm">{user.email}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="sm">{user.phone}</Text>
                      </Table.Cell>
                      <Table.Cell>{user.age}</Table.Cell>
                      <Table.Cell>
                        <Badge
                          colorPalette={
                            user.role === "admin"
                              ? "red"
                              : user.role === "moderator"
                                ? "yellow"
                                : "green"
                          }
                          size="sm"
                        >
                          {user.role}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Text fontSize="sm">{user.company.name}</Text>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                          _dark={{ color: "gray.400" }}
                        >
                          {user.company.title}
                        </Text>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
            <Box mt={4} display="flex" justifyContent="center">
              <PaginationComponent
                page={pageNum}
                total={total}
                pageSize={USERS_PAGE_SIZE}
                basePath="/users"
                params={{
                  ...(q ? { q } : {}),
                }}
              />
            </Box>
          </>
        )}
      </Container>
    </main>
  );
}
