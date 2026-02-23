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
import type { Platform } from "@/lib/api/model";

interface PlatformFilterProps {
  platforms: Platform[];
}

/** ID for URL and API (e.g. `4,5`). */
function getPlatformId(p: Platform): string {
  return String(p.id ?? p.slug ?? p.name);
}

export function PlatformFilter({ platforms }: PlatformFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const anchorRef = useComboboxAnchor();

  const platformsParam = searchParams.get("platforms") ?? "";
  const selectedIds = platformsParam
    ? platformsParam
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const selectedPlatforms = platforms.filter((p) =>
    selectedIds.includes(getPlatformId(p))
  );

  const handleValueChange = (value: Platform[] | null) => {
    const next = new URLSearchParams(searchParams);
    if (value && value.length > 0) {
      next.set("platforms", value.map((p) => getPlatformId(p)).join(","));
    } else {
      next.delete("platforms");
    }
    next.delete("page");
    startTransition(() => {
      router.push(`/games?${next.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Filter by platform</Label>
      <Combobox<Platform, true>
        items={platforms}
        multiple
        value={selectedPlatforms}
        onValueChange={handleValueChange}
        itemToStringLabel={(p) => p.name}
        itemToStringValue={getPlatformId}
        isItemEqualToValue={(a, b) => getPlatformId(a) === getPlatformId(b)}
        autoHighlight={true}
      >
        <div
          ref={anchorRef}
          className="w-full max-w-md data-pending:pointer-events-none data-pending:opacity-70"
          data-pending={isPending ? "" : undefined}
        >
          <ComboboxChips>
            <ComboboxValue placeholder="All platforms">
              {(selected: Platform[]) =>
                selected.map((p) => (
                  <ComboboxChip key={getPlatformId(p)}>{p.name}</ComboboxChip>
                ))
              }
            </ComboboxValue>
            <ComboboxChipsInput placeholder="Search platforms…" />
          </ComboboxChips>
        </div>
        <ComboboxContent anchor={anchorRef}>
          <ComboboxEmpty>No platform found.</ComboboxEmpty>
          <ComboboxList>
            {(platform) => (
              <ComboboxItem key={getPlatformId(platform)} value={platform}>
                {platform.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
