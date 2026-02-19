"use client";

import { Menu, Table } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

const ALL_OPTION_SENTINEL = "__all__";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterableTableHeaderProps {
  label: string;
  filterKey: string;
  options: FilterOption[];
  currentValue: string | undefined;
  basePath: string;
  params?: Record<string, string>;
}

function buildFilterHref(
  basePath: string,
  filterKey: string,
  value: string,
  params?: Record<string, string>
): string {
  const search = new URLSearchParams();
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (key !== filterKey && val) search.set(key, val);
    }
  }
  if (value) search.set(filterKey, value);
  const query = search.toString();
  return query ? `${basePath}?${query}` : basePath;
}

const triggerButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  whiteSpace: "nowrap" as const,
  textAlign: "left" as const,
};

export function FilterableTableHeader({
  label,
  filterKey,
  options,
  currentValue,
  basePath,
  params,
}: FilterableTableHeaderProps) {
  const router = useRouter();

  const handleSelect = (menuValue: string) => {
    const urlValue = menuValue === ALL_OPTION_SENTINEL ? "" : menuValue;
    router.push(buildFilterHref(basePath, filterKey, urlValue, params));
  };

  return (
    <Table.ColumnHeader>
      <Menu.Root
        size="sm"
        variant="subtle"
        closeOnSelect
        aria-label={`Filter by ${label}`}
        id={filterKey}
      >
        <Menu.Trigger
          asChild
          cursor="pointer"
          fontWeight="inherit"
          fontSize="inherit"
          _hover={{ opacity: 0.8 }}
          py={1}
          px={0}
          minW="auto"
          h="auto"
          bg="transparent"
          border="none"
          color="inherit"
        >
          <button type="button" style={triggerButtonStyle}>
            {label}
            <ChevronDown size={14} strokeWidth={2} aria-hidden />
          </button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            {options.map((opt) => {
              const menuValue = opt.value === "" ? ALL_OPTION_SENTINEL : opt.value;
              const isSelected =
                (opt.value === "" && !currentValue) || opt.value === currentValue;
              return (
                <Menu.Item
                  key={menuValue}
                  value={menuValue}
                  onSelect={() => handleSelect(menuValue)}
                >
                  {opt.label}
                  {isSelected && " ✓"}
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </Table.ColumnHeader>
  );
}
