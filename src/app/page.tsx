"use client"

import { useMemo, useState } from "react"
import { Download, Github, FlaskConical, Layers3, Factory, Sparkles } from "lucide-react"
import { methods } from "@/data/methods"
import { MaterialScene } from "@/components/MaterialScene"
import { MethodSelector } from "@/components/MethodSelector"
import { MethodDetail } from "@/components/MethodDetail"
import { ProcessTimeline } from "@/components/ProcessTimeline"
import { SimulationPanel } from "@/components/SimulationPanel"
import { ScoringMatrix } from "@/components/ScoringMatrix"

export default function Home() {
  const [selectedId, setSelectedId] = useState(methods[1].id)
  const selected = useMemo(() => methods.find((m) => m.id === selectedId) ?? methods[1], [selectedId])

  return (
    <main className="min-h-screen px-4 py-6 md:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur md:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-emerald-100">
              <Sparkles size={14} /> Palm waste biomaterials simulator
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Interactive 3D simulator for leather-like materials from date palm waste.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-300 md:text-lg">
              Explore each methodology as a distinct material object: layered laminate, nonwoven fiber mat, natural-rubber composite, biopolymer film, nanocellulose sheet, mycelium leather, bacterial cellulose hybrid, and more.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#simulator" className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-200">
                <FlaskConical size={16} /> Open simulator
              </a>
              <a href="#github" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.09]">
                <Github size={16} /> GitHub-ready structure
              </a>
            </div>
          </div>

          <MaterialScene method={selected} />
        </div>
      </section>

      <section id="simulator" className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[380px_1fr]">
        <aside className="space-y-5 lg:sticky lg:top-5 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">Choose material method</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-400">Each method changes the 3D object, layer structure, texture simulation, performance profile, and process steps.</p>
            <div className="mt-4">
              <MethodSelector selected={selected} onSelect={(m) => setSelectedId(m.id)} />
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <MethodDetail method={selected} />
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <MaterialScene method={selected} />
            <SimulationPanel method={selected} />
          </div>
          <ProcessTimeline method={selected} />
          <ScoringMatrix />
        </div>
      </section>

      <section id="github" className="mx-auto mt-8 max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"><Github size={18} /></div>
            <h2 className="text-xl font-semibold text-white">Codex/GitHub workflow</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-400">Use this project as a complete codebase. Push it to GitHub, connect it to Vercel, then ask Codex to add new methods, charts, or validated lab-test data.</p>
          </div>
          <div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"><Layers3 size={18} /></div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">Data-driven design</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-400">All materials live in <code>src/data/methods.ts</code>. Changing a method updates the model, layers, metrics, risks, patent angle, timeline, and scoring.</p>
          </div>
          <div>
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"><Factory size={18} /></div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-300">Deployment</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-400">Run <code>npm install</code>, <code>npm run dev</code>, then deploy to Vercel or any Next.js host connected to your GitHub repository.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
