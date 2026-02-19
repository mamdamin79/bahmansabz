import { Badge, Box, Table, Text } from "@chakra-ui/react";
import type { User } from "@/app/_types/users.types";
import { UserTableRow } from "./UserTableRow";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
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
