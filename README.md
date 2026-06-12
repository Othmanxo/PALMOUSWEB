# Palm Leather 3D Simulator

Interactive Next.js + Three.js interface for comparing leather-like material methodologies made from date palm branch/frond waste and related bio-based systems.

## What this app does

- Shows each methodology as a different movable 3D object, not a generic repeated model.
- Uses procedural Three.js geometry and textures; no external 3D files are required.
- Displays material layers, animated process steps, simulated performance ranges, mass-balance yield, cost estimates, risks, strengths, and patent angle.
- Designed for deployment through GitHub + Vercel.

## Methods included

1. Alkali-treated date palm fiber nonwoven composite
2. Layered date palm fiber laminate
3. Date palm fiber + natural rubber latex composite
4. Pectin/starch/glycerol film reinforced with palm fibers
5. Bio-resin / palm fiber composite sheet
6. Polyurethane-free bio-coated palm fiber mat
7. Palm cellulose micro/nanofiber sheet
8. Mycelium-assisted palm substrate leather
9. Bacterial cellulose hybrid palm leather

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to Vercel.
3. Import the GitHub repo.
4. Framework preset: Next.js.
5. Build command: `npm run build`.
6. Output: default Next.js.

## Where to edit the materials

All methodology data is in:

```text
src/data/methods.ts
```

Changing a method object updates:

- 3D model type
- layer colors and structure
- process animation steps
- simulated metrics
- risk/strength cards
- patent angle
- scoring matrix

## Important scientific note

The performance ranges are hypothetical engineering estimates for planning. Replace them with measured lab data after tensile, tear, water absorption, flex, abrasion, and peel tests.

## Recommended Codex task

Use the prompt in `docs/codex_task.md` to ask Codex to extend, refactor, test, or connect this app to a backend database.
