"use client";

import type { Platform } from "@/lib/api/model";
import { FilterCombobox } from "./FilterCombobox";

function getPlatformId(p: Platform): string {
  return String(p.id ?? p.slug ?? p.name);
}

const platformFilterConfig = {
  paramKey: "platforms",
  label: "Filter by platform",
  placeholderAll: "All platforms",
  placeholderSearch: "Search platforms…",
  emptyMessage: "No platform found.",
  getItemId: getPlatformId,
  getItemParamValue: getPlatformId,
  getItemLabel: (p: Platform) => p.name,
} as const;

interface PlatformFilterProps {
  platforms: Platform[];
}

export function PlatformFilter({ platforms }: PlatformFilterProps) {
  return (
    <FilterCombobox items={platforms} config={platformFilterConfig} />
  );
}
