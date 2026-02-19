"use client";

import { Table } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/_types/users.types";

type UserTableRowProps = {
  user: User;
  children: React.ReactNode;
};

export function UserTableRow({ user, children }: UserTableRowProps) {
  const router = useRouter();

  return (
    <Table.Row
      cursor="pointer"
      onClick={() => router.push(`/users/${user.id}`)}
      _hover={{ bg: "gray.50", _dark: { bg: "whiteAlpha.100" } }}
      transition="background 0.15s"
    >
      {children}
    </Table.Row>
  );
}
