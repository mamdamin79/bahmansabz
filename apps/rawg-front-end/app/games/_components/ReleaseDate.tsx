"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { format, parse } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { type DateRange } from "react-day-picker";

const DATE_FORMAT = "yyyy-MM-dd";
const DISPLAY_FORMAT = "MMM dd, yyyy";
const PARAM_KEY = "dates";

function parseDateParam(value: string | null): DateRange | undefined {
  if (!value) return undefined;
  const [fromStr, toStr] = value.split(",");
  try {
    const from = parse(fromStr, DATE_FORMAT, new Date());
    const to = toStr ? parse(toStr, DATE_FORMAT, new Date()) : undefined;
    if (isNaN(from.getTime())) return undefined;
    if (to && isNaN(to.getTime())) return { from };
    if (to && from > to) return undefined;
    return { from, to };
  } catch {
    return undefined;
  }
}

function formatDateParam(range: DateRange | undefined): string | null {
  if (!range?.from || !range?.to) return null;
  const from = format(range.from, DATE_FORMAT);
  const to = format(range.to, DATE_FORMAT);
  return `${from},${to}`;
}

function formatDisplay(range: DateRange | undefined): string {
  if (!range?.from) return "Pick a date range";
  if (!range.to) return format(range.from, DISPLAY_FORMAT);
  return `${format(range.from, DISPLAY_FORMAT)} – ${format(range.to, DISPLAY_FORMAT)}`;
}

export function ReleaseDate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>(
    undefined,
  );

  const dateRange = parseDateParam(searchParams.get(PARAM_KEY));

  // Sync draft with URL when opening the popover
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      setDraftRange(dateRange);
    } else {
      setDraftRange(undefined);
    }
  };

  const handleSelect = (range: DateRange | undefined) => {
    // Single-day click: treat as "start only", keep popover open for end date
    if (
      range?.from &&
      range?.to &&
      range.from.getTime() === range.to.getTime()
    ) {
      setDraftRange({ from: range.from, to: undefined });
      return;
    }

    if (!range?.from) {
      setDraftRange(undefined);
      const next = new URLSearchParams(searchParams);
      next.delete(PARAM_KEY);
      next.delete("page");
      startTransition(() => router.push(`/games?${next.toString()}`));
      return;
    }

    const paramValue = formatDateParam(range);
    if (paramValue) {
      const next = new URLSearchParams(searchParams);
      next.set(PARAM_KEY, paramValue);
      next.delete("page");
      startTransition(() => {
        router.push(`/games?${next.toString()}`);
      });
      setDraftRange(range);
    }
  };

  const handleClearInCalendar = () => {
    setDraftRange(undefined);
    const next = new URLSearchParams(searchParams);
    next.delete(PARAM_KEY);
    next.delete("page");
    startTransition(() => router.push(`/games?${next.toString()}`));
  };

  return (
    <div className="mt-3 flex flex-col gap-2">
      <Label>Filter by release date</Label>
      <div className="flex w-full max-w-md">
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 justify-start text-left font-normal"
              data-pending={isPending ? "true" : undefined}
              disabled={isPending}
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              <span className="min-w-0 truncate">
                {formatDisplay(dateRange)}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={
                (open ? draftRange : dateRange)?.from ?? dateRange?.from
              }
              selected={open ? (draftRange ?? dateRange) : dateRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              captionLayout="dropdown"
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
            <div className="flex items-center justify-between border-t p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearInCalendar}
                className="text-muted-foreground"
              >
                <X className="mr-1.5 size-3.5" />
                Clear
              </Button>
              <Button type="button" size="sm" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
