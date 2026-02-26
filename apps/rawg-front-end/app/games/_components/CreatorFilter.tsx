"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
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
import type { Person } from "@/lib/api/model";

interface CreatorFilterProps {
  creators: Person[];
}

function getCreatorId(p: Person): string {
  return String(p.id ?? p.slug ?? p.name);
}

/** Slug for URL searchParams (API accepts slugs e.g. cris-velasco,mike-morasky) */
function getCreatorSlug(p: Person): string {
  return p.slug ?? String(p.id ?? p.name);
}

export function CreatorFilter({ creators }: CreatorFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const anchorRef = useComboboxAnchor();

  const creatorsParam = searchParams.get("creators") ?? "";
  const selectedSlugs = creatorsParam
    ? creatorsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const selectedCreators = creators.filter((p) =>
    selectedSlugs.includes(getCreatorSlug(p))
  );

  const handleValueChange = (value: Person[] | null) => {
    const next = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      next.set("creators", value.map((p) => getCreatorSlug(p)).join(","));
    } else {
      next.delete("creators");
    }
    next.delete("page");
    startTransition(() => {
      router.push(`/games?${next.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Filter by creator</Label>
      <Combobox<Person, true>
        items={creators}
        multiple
        value={selectedCreators}
        onValueChange={handleValueChange}
        itemToStringLabel={(p) => p.name}
        itemToStringValue={getCreatorId}
        isItemEqualToValue={(a, b) => getCreatorId(a) === getCreatorId(b)}
        autoHighlight={true}
      >
        <div
          ref={anchorRef}
          className="w-full max-w-md data-pending:pointer-events-none data-pending:opacity-70"
          data-pending={isPending ? "" : undefined}
        >
          <ComboboxChips>
            <ComboboxValue placeholder="All creators">
              {(selected: Person[]) =>
                selected.map((p) => (
                  <ComboboxChip key={getCreatorSlug(p)}>{p.name}</ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxChipsInput placeholder="Search creators…" />
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No creator found.</ComboboxEmpty>
          <ComboboxList>
            {(creator) => (
              <ComboboxItem key={getCreatorSlug(creator)} value={creator}>
                {creator.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
