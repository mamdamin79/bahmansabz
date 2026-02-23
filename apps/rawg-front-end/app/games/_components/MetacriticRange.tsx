"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const PARAM_KEY = "metacritic"
const DEFAULT_RANGE: [number, number] = [1, 100]

function parseMetacriticParam(param: string | undefined): [number, number] {
  if (!param?.trim()) return DEFAULT_RANGE
  const parts = param.split(",").map((s) => parseInt(s.trim(), 10))
  const a = Number.isNaN(parts[0]) ? 1 : Math.max(1, Math.min(100, parts[0]))
  const b = Number.isNaN(parts[1]) ? 100 : Math.max(1, Math.min(100, parts[1]))
  return [Math.min(a, b), Math.max(a, b)]
}

export function MetacriticRange({
  metacriticParam,
}: {
  metacriticParam?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState<[number, number]>(() =>
    parseMetacriticParam(metacriticParam)
  )

  useEffect(() => {
    setValue(parseMetacriticParam(metacriticParam))
  }, [metacriticParam])

  const handleValueCommit = (next: number[]) => {
    const [min, max] = next as [number, number]
    const nextParams = new URLSearchParams(searchParams)
    if (min === DEFAULT_RANGE[0] && max === DEFAULT_RANGE[1]) {
      nextParams.delete(PARAM_KEY)
    } else {
      nextParams.set(PARAM_KEY, `${min},${max}`)
    }
    nextParams.delete("page")
    startTransition(() => {
      router.push(`/games?${nextParams.toString()}`)
    })
  }

  return (
    <div
      className="flex w-full max-w-md flex-col gap-2 data-pending:pointer-events-none data-pending:opacity-70"
      data-pending={isPending ? "" : undefined}
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="metacritic-slider">Metacritic range</Label>
        <span className="text-muted-foreground text-sm">
          {value[0]} – {value[1]}
        </span>
      </div>
      <Slider
        id="metacritic-slider"
        max={100}
        min={1}
        value={value}
        onValueChange={(v) => setValue(v as [number, number])}
        onValueCommit={handleValueCommit}
      />
    </div>
  )
}
