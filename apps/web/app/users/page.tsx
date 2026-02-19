import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { PaginationComponent } from "@/app/_components/PaginationComponent";
import { SearchInput } from "@/app/_components/SearchInput";
import { getUsers, USERS_PAGE_SIZE } from "@/app/_utils/users";
import { UsersTable } from "./_components/UsersTable";

function getStringParam(
  value: string | string[] | undefined
): string | undefined {
  return value == null ? undefined : Array.isArray(value) ? value[0] : value;
}

const VALID_SORT_BY = new Set(["firstName", "age"]);
const VALID_ORDER = new Set(["asc", "desc"]);
const VALID_ROLES = new Set(["admin", "moderator", "user"]);

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const q = getStringParam(raw.q);
  const pageNum = Math.max(1, Number(getStringParam(raw.page)) || 1);
  const sortByParam = getStringParam(raw.sortBy);
  const orderParam = getStringParam(raw.order);
  const roleParam = getStringParam(raw.role);
  const sortBy =
    sortByParam && VALID_SORT_BY.has(sortByParam) ?
      (sortByParam as "firstName" | "age")
    : undefined;
  const order =
    orderParam && VALID_ORDER.has(orderParam) ?
      (orderParam as "asc" | "desc")
    : undefined;
  const roleFilter =
    roleParam && VALID_ROLES.has(roleParam) ?
      { key: "role" as const, value: roleParam }
    : undefined;

  const { users, total } = await getUsers(
    pageNum,
    q,
    sortBy,
    order,
    roleFilter
  );

  const linkParams = {
    ...(q ? { q } : {}),
    ...(sortBy ? { sortBy } : {}),
    ...(order ? { order } : {}),
    ...(roleFilter ? { role: roleFilter.value } : {}),
  };
  const tableParams = {
    ...linkParams,
    ...(pageNum > 1 ? { page: String(pageNum) } : {}),
  };

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
            <UsersTable
              users={users}
              basePath="/users"
              sortBy={sortBy}
              order={order}
              params={tableParams}
            />
            <Box mt={4} display="flex" justifyContent="center">
              <PaginationComponent
                page={pageNum}
                total={total}
                pageSize={USERS_PAGE_SIZE}
                basePath="/users"
                params={linkParams}
              />
            </Box>
          </>
        )}
      </Container>
    </main>
  );
}
