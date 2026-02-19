import { Box, Button, Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserById } from "@/app/_utils/users";
import { UserAvatar } from "./_components/UserAvatar";
import { UserHeader } from "./_components/UserHeader";
import { UserInfo } from "./_components/UserInfo";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <main>
      <Container maxW="6xl" py={8} px={4}>
        <Box mb={6}>
          <Button asChild variant="ghost" size="sm">
            <Link href="/users">← Back to users</Link>
          </Button>
        </Box>

        <Flex direction="column" gap={6}>
          <Flex gap={4} align="center" flexWrap="wrap">
            <UserAvatar
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <UserHeader
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              role={user.role}
            />
          </Flex>

          <UserInfo
            email={user.email}
            phone={user.phone}
            age={user.age}
            gender={user.gender}
            company={user.company}
            address={user.address}
            university={user.university}
          />
        </Flex>
      </Container>
    </main>
  );
}
