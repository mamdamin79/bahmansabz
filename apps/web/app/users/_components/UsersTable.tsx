import { Badge, Box, Table, Text } from "@chakra-ui/react";
import { FilterableTableHeader } from "@/app/_components/FilterableTableHeader";
import { TableSortHeader } from "@/app/_components/TableSortHeader";
import type { User } from "@/app/_types/users.types";
import type { UsersSortBy, UsersSortOrder } from "@/app/_utils/users";
import { UserTableRow } from "./UserTableRow";

const ROLE_FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "user", label: "User" },
];

interface UsersTableProps {
  users: User[];
  basePath: string;
  sortBy?: UsersSortBy;
  order?: UsersSortOrder;
  params?: Record<string, string>;
}

export function UsersTable({
  users,
  basePath,
  sortBy,
  order,
  params,
}: UsersTableProps) {
  return (
    <Box overflowX="auto">
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>Avatar</Table.ColumnHeader>
            <TableSortHeader
              label="Name"
              sortKey="firstName"
              currentSortBy={sortBy}
              currentOrder={order}
              basePath={basePath}
              params={params}
            />
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Phone</Table.ColumnHeader>
            <TableSortHeader
              label="Age"
              sortKey="age"
              currentSortBy={sortBy}
              currentOrder={order}
              basePath={basePath}
              params={params}
            />
            <FilterableTableHeader
              label="Role"
              filterKey="role"
              options={ROLE_FILTER_OPTIONS}
              currentValue={params?.role}
              basePath={basePath}
              params={params}
            />
            <Table.ColumnHeader>Company</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user}>
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
            </UserTableRow>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
