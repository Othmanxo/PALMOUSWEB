"use client"

import clsx from "clsx"
import { Method, methods } from "@/data/methods"

export function MethodSelector({ selected, onSelect }: { selected: Method; onSelect: (m: Method) => void }) {
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      {methods.map((method) => {
        const active = method.id === selected.id
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method)}
            className={clsx(
              "group rounded-2xl border p-3 text-left transition-all",
              active
                ? "border-emerald-300/60 bg-emerald-300/10 shadow-glow"
                : "border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.07]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">{method.shortName}</span>
              <span
                className="h-3 w-3 rounded-full ring-2 ring-white/15"
                style={{ background: method.color }}
              />
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-400">{method.tagline}</p>
          </button>
        )
      })}
    </div>
  )
}
