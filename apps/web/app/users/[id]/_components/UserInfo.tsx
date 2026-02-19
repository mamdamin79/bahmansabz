import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { UserDetail } from "@/app/_types/users.types";

type UserInfoProps = Pick<
  UserDetail,
  "email" | "phone" | "age" | "gender" | "company" | "address" | "university"
>;

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <>
      <Text
        fontSize="sm"
        color="gray.500"
        _dark={{ color: "gray.400" }}
      >
        {label}
      </Text>
      <Text fontSize="sm">{value}</Text>
    </>
  );
}

export function UserInfo({
  email,
  phone,
  age,
  gender,
  company,
  address,
  university,
}: UserInfoProps) {
  const hasMain = email || phone || age != null || gender;
  const hasCompany = company?.name;
  const hasAddress = address?.address ?? address?.city;
  const hasUniversity = university;

  if (!hasMain && !hasCompany && !hasAddress && !hasUniversity) return null;

  return (
    <>
      {hasMain && (
        <SimpleGrid
          columns={2}
          gap={3}
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          _dark={{ borderColor: "gray.700" }}
        >
          {email && <InfoRow label="Email" value={email} />}
          {phone && <InfoRow label="Phone" value={phone} />}
          {age != null && <InfoRow label="Age" value={String(age)} />}
          {gender && (
            <InfoRow label="Gender" value={gender} />
          )}
        </SimpleGrid>
      )}

      {(hasCompany || hasAddress || hasUniversity) && (
        <VStack align="stretch" gap={3}>
          {hasCompany && (
            <SimpleGrid
              columns={2}
              gap={3}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
            >
              <InfoRow label="Company" value={company!.name} />
              <InfoRow
                label="Title"
                value={[company!.title, company!.department].filter(Boolean).join(" · ") || "—"}
              />
            </SimpleGrid>
          )}
          {hasAddress && (
            <SimpleGrid
              columns={2}
              gap={3}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
            >
              <InfoRow label="Address" value={address!.address} />
              <InfoRow
                label="City"
                value={`${address!.city}, ${address!.stateCode} ${address!.postalCode}`}
              />
              <InfoRow label="Country" value={address!.country} />
            </SimpleGrid>
          )}
          {hasUniversity && (
            <SimpleGrid
              columns={2}
              gap={3}
              p={4}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
              _dark={{ borderColor: "gray.700" }}
            >
              <InfoRow label="University" value={university!} />
            </SimpleGrid>
          )}
        </VStack>
      )}
    </>
  );
}
