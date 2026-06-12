"use client"

import { BarChart3, Beaker, CircleDollarSign, Droplets, Gauge, Layers, ShieldCheck } from "lucide-react"
import { Method } from "@/data/methods"
import { defaultYieldForMethod, formatRange } from "@/lib/math"
import { MetricCard } from "./MetricCard"

export function SimulationPanel({ method }: { method: Method }) {
  const yieldEstimate = defaultYieldForMethod(method)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Score" value={`${method.simulation.score.toFixed(1)}/100`} hint="Weighted research-screening score" icon={<Gauge size={14} />} />
        <MetricCard label="Tensile" value={formatRange(method.simulation.tensileMPa, " MPa")} hint="Hypothetical planning range" icon={<BarChart3 size={14} />} />
        <MetricCard label="Tear" value={formatRange(method.simulation.tearN, " N")} hint="Higher is better for stitching" icon={<ShieldCheck size={14} />} />
        <MetricCard label="Cost" value={formatRange(method.simulation.costUsdM2, " USD/m²")} hint="Early scale-up estimate" icon={<CircleDollarSign size={14} />} />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <MetricCard label="Elongation" value={formatRange(method.simulation.elongationPct, "%")} hint="Flexibility before break" icon={<Layers size={14} />} />
        <MetricCard label="Water absorption" value={formatRange(method.simulation.waterAbsorptionPct, "%")} hint="Lower means better water resistance" icon={<Droplets size={14} />} />
        <MetricCard label="TRL" value={`${method.simulation.trlNow} → ${method.simulation.projectedTrl}`} hint="Current to post-prototype validation" icon={<Beaker size={14} />} />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">Mass-balance preview</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          From 10 kg wet palm waste, this model estimates <span className="text-white">{yieldEstimate.areaYield.toFixed(1)} m²</span> of finished sheet under default assumptions. This is not measured data; it is a planning calculator for prototype design.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="mini-stat"><span>Dry mass</span><b>{yieldEstimate.dryMass.toFixed(1)} kg</b></div>
          <div className="mini-stat"><span>Usable fiber</span><b>{yieldEstimate.usableFiber.toFixed(1)} kg</b></div>
          <div className="mini-stat"><span>Sheet mass</span><b>{yieldEstimate.sheetMassPerM2.toFixed(2)} kg/m²</b></div>
          <div className="mini-stat"><span>Fiber need</span><b>{yieldEstimate.fiberMassPerM2.toFixed(2)} kg/m²</b></div>
        </div>
      </div>
    </div>
  )
}
