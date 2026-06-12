# Codex Task Prompt

You are working inside a Next.js + Three.js project called `palm-leather-3d-simulator`.

Objective:
Improve the interactive biomaterials simulator for leather-like materials made from date palm branch/frond waste.

Key rules:
1. Do not create one generic 3D model reused for all materials.
2. Each methodology must have its own model behavior:
   - layered laminate: visible stacked layers and particles
   - nonwoven fiber composite: dense random fiber mat
   - natural rubber composite: elastic flexible wavy sheet
   - pectin/starch film: translucent orange film with embedded fibers
   - bio-resin composite: glossy compact slab
   - PU-free coated mat: fibrous mat with transparent coating
   - nanocellulose: thin translucent sheet with fibril network
   - mycelium: porous organic foam-like sheet
   - bacterial cellulose: translucent gel-like pellicle with palm microfibers
3. Keep all methodology data in `src/data/methods.ts`.
4. Use procedural Three.js geometry; do not require external GLB/OBJ files unless added intentionally later.
5. Preserve performance ranges as hypothetical unless replaced by measured lab data.

Requested improvements:
- Add a comparison mode where two selected materials appear side-by-side in 3D.
- Add CSV import for real lab test data.
- Add export of selected method report as PDF.
- Add material cross-section toggle.
- Add DOE planner with variables, levels, and replicates.
- Add Monte Carlo sensitivity chart for cost/yield.

Before committing:
- Run `npm run typecheck`.
- Run `npm run build`.
- Confirm no hydration errors in the browser.
