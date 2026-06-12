"use client"

import { useEffect, useState } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Method } from "@/data/methods"

export function ProcessTimeline({ method }: { method: Method }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    setActive(0)
    setPlaying(true)
  }, [method.id])

  useEffect(() => {
    if (!playing) return
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % method.steps.length)
    }, 1400)
    return () => window.clearInterval(interval)
  }, [playing, method.steps.length])

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">Animated process simulation</h3>
          <p className="mt-1 text-sm text-neutral-400">Step {active + 1} of {method.steps.length}: {method.steps[active]}</p>
        </div>
        <div className="flex gap-2">
          <button className="icon-button" onClick={() => setPlaying((v) => !v)} aria-label="Play or pause timeline">
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <button className="icon-button" onClick={() => setActive(0)} aria-label="Reset timeline">
            <RotateCcw size={17} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {method.steps.map((step, i) => (
          <button
            key={step}
            onClick={() => setActive(i)}
            className={`rounded-2xl border p-3 text-left transition-all ${
              i === active ? "border-emerald-300/70 bg-emerald-300/15" : "border-white/10 bg-black/20 hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i === active ? "bg-emerald-300 text-neutral-950" : "bg-white/10 text-neutral-300"
                }`}
              >
                {i + 1}
              </span>
              <span className="text-xs leading-5 text-neutral-300">{step}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
