import { ReactNode } from "react"

export function MetricCard({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-soft backdrop-blur">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-400">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
      {hint ? <p className="mt-1 text-xs leading-5 text-neutral-400">{hint}</p> : null}
    </div>
  )
}
