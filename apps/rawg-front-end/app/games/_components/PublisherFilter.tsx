"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Publisher } from "@/lib/api/model";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";

interface PublisherFilterProps {
  publishers: Publisher[];
}

function getPublisherId(p: Publisher): string {
  return String(p.id ?? p.slug ?? p.name);
}

/** Slug for URL searchParams (API accepts slugs e.g. electronic-arts,microsoft-studios) */
function getPublisherSlug(p: Publisher): string {
  return p.slug ?? String(p.id ?? p.name);
}

export function PublisherFilter({ publishers }: PublisherFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const anchorRef = useComboboxAnchor();

  const publishersParam = searchParams.get("publishers") ?? "";
  const selectedSlugs = publishersParam
    ? publishersParam.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const selectedPublishers = publishers.filter((p) =>
    selectedSlugs.includes(getPublisherSlug(p))
  );

  const handleValueChange = (value: Publisher[] | null) => {
    const next = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      next.set(
        "publishers",
        value.map((p) => getPublisherSlug(p)).join(",")
      );
    } else {
      next.delete("publishers");
    }
    next.delete("page");
    startTransition(() => {
      router.push(`/games?${next.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Filter by publisher</Label>
      <Combobox<Publisher, true>
        items={publishers}
        multiple
        value={selectedPublishers}
        onValueChange={handleValueChange}
        itemToStringLabel={(p) => p.name}
        itemToStringValue={getPublisherId}
        isItemEqualToValue={(a, b) => getPublisherId(a) === getPublisherId(b)}
        autoHighlight={true}
      >
        <div
          ref={anchorRef}
          className="w-full max-w-md data-pending:pointer-events-none data-pending:opacity-70"
          data-pending={isPending ? "" : undefined}
        >
          <ComboboxChips>
            <ComboboxValue placeholder="All publishers">
              {(selected: Publisher[]) =>
                selected.map((p) => (
                  <ComboboxChip key={getPublisherSlug(p)}>
                    {p.name}
                  </ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxChipsInput placeholder="Search publishers…" />
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No publisher found.</ComboboxEmpty>
          <ComboboxList>
            {(publisher) => (
              <ComboboxItem
                key={getPublisherSlug(publisher)}
                value={publisher}
              >
                {publisher.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
