"use client";

import type { Publisher } from "@/lib/api/model";
import { FilterCombobox } from "./FilterCombobox";

function getPublisherId(p: Publisher): string {
  return String(p.id ?? p.slug ?? p.name);
}

function getPublisherSlug(p: Publisher): string {
  return p.slug ?? String(p.id ?? p.name);
}

const publisherFilterConfig = {
  paramKey: "publishers",
  label: "Filter by publisher",
  placeholderAll: "All publishers",
  placeholderSearch: "Search publishers…",
  emptyMessage: "No publisher found.",
  getItemId: getPublisherId,
  getItemParamValue: getPublisherSlug,
  getItemLabel: (p: Publisher) => p.name,
} as const;

interface PublisherFilterProps {
  publishers: Publisher[];
}

export function PublisherFilter({ publishers }: PublisherFilterProps) {
  return <FilterCombobox items={publishers} config={publisherFilterConfig} />;
}
