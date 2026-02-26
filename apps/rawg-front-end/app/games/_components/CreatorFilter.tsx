"use client";

import type { Person } from "@/lib/api/model";
import { FilterCombobox } from "./FilterCombobox";

function getCreatorId(p: Person): string {
  return String(p.id ?? p.slug ?? p.name);
}

function getCreatorSlug(p: Person): string {
  return p.slug ?? String(p.id ?? p.name);
}

const creatorFilterConfig = {
  paramKey: "creators",
  label: "Filter by creator",
  placeholderAll: "All creators",
  placeholderSearch: "Search creators…",
  emptyMessage: "No creator found.",
  getItemId: getCreatorId,
  getItemParamValue: getCreatorSlug,
  getItemLabel: (p: Person) => p.name,
} as const;

interface CreatorFilterProps {
  creators: Person[];
}

export function CreatorFilter({ creators }: CreatorFilterProps) {
  return (
    <FilterCombobox items={creators} config={creatorFilterConfig} />
  );
}
