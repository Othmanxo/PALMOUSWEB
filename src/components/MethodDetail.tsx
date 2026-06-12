"use client"

import { Method } from "@/data/methods"

export function MethodDetail({ method }: { method: Method }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">Selected methodology</p>
          <h2 className="mt-2 max-w-4xl text-2xl font-semibold text-white md:text-3xl">{method.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-400">{method.tagline}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 lg:min-w-[260px]">
          <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Material base</div>
          <div className="mt-2 text-sm font-medium text-white">{method.materialBase}</div>
          <div className="mt-4 text-xs uppercase tracking-[0.18em] text-neutral-500">Best use</div>
          <div className="mt-2 text-sm leading-5 text-neutral-300">{method.bestUse}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4">
          <h3 className="text-sm font-semibold text-emerald-200">Strengths</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            {method.strengths.map((s) => <li key={s}>• {s}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4">
          <h3 className="text-sm font-semibold text-amber-200">Risks</h3>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            {method.risks.map((s) => <li key={s}>• {s}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-4">
          <h3 className="text-sm font-semibold text-sky-200">Patent angle</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-300">{method.patentAngle}</p>
        </div>
      </div>
    </div>
  )
}
