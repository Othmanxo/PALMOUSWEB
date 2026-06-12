"use client"

import { methods } from "@/data/methods"

export function ScoringMatrix() {
  const ranked = [...methods].sort((a, b) => b.simulation.score - a.simulation.score)
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">Weighted ranking</h3>
          <p className="mt-1 text-sm text-neutral-400">Interactive project-level comparison of all material routes.</p>
        </div>
        <span className="hidden rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400 md:inline">Mechanical 20% · Lab 15% · Scale 15% · Cost 15% · Sustainability 15% · Patent 10% · Market 10%</span>
      </div>
      <div className="space-y-3">
        {ranked.map((method, index) => (
          <div key={method.id} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">{index + 1}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: method.color }} />
                <span className="text-sm font-medium text-white">{method.title}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${method.simulation.score}%`, background: method.color }} />
              </div>
            </div>
            <div className="text-right text-sm font-semibold text-white">{method.simulation.score.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
