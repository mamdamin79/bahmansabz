import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import { SearchInput } from "@/app/_components/SearchInput";
import { getUsers, USERS_PAGE_SIZE } from "@/app/_utils/users";
import { UsersTable } from "./_components/UsersTable";

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
            <UsersTable users={users} />
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
