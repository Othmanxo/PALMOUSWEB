export type ModelType =
  | "nonwoven"
  | "laminate"
  | "rubber"
  | "biopolymer"
  | "bioresin"
  | "bioCoated"
  | "nanocellulose"
  | "mycelium"
  | "bacterialCellulose"

export type Method = {
  id: string
  shortName: string
  title: string
  materialBase: string
  modelType: ModelType
  tagline: string
  color: string
  secondaryColor: string
  accentColor: string
  texture: "fibrous" | "layered" | "elastic" | "translucent" | "glossy" | "porous" | "gel" | "coated" | "rough"
  layers: Array<{ name: string; color: string; thickness: number; note: string }>
  steps: string[]
  simulation: {
    tensileMPa: [number, number]
    elongationPct: [number, number]
    tearN: [number, number]
    waterAbsorptionPct: [number, number]
    densityGcm3: [number, number]
    thicknessMm: [number, number]
    trlNow: number
    projectedTrl: number
    costUsdM2: [number, number]
    score: number
  }
  strengths: string[]
  risks: string[]
  bestUse: string
  patentAngle: string
}

export const methods: Method[] = [
  {
    id: "m1-nonwoven-palm-fiber",
    shortName: "Alkali Palm Fiber",
    title: "Alkali-Treated Date Palm Fiber Nonwoven Composite",
    materialBase: "Date palm branch/frond fibers",
    modelType: "nonwoven",
    tagline: "Baseline university-lab route: treated fibers + binder + pressing.",
    color: "#7a8f38",
    secondaryColor: "#d9c89b",
    accentColor: "#e6f3c8",
    texture: "fibrous",
    layers: [
      { name: "Protective wax/oil finish", color: "#f2df9b", thickness: 0.08, note: "Reduces water uptake." },
      { name: "Palm fiber nonwoven core", color: "#9b8b54", thickness: 0.86, note: "Main structural layer." },
      { name: "Binder-rich underside", color: "#73643c", thickness: 0.16, note: "Improves cohesion." }
    ],
    steps: [
      "Collect palm frond or branch pruning waste",
      "Wash and dry until constant weight",
      "Shred into medium/fine fibers",
      "Optional 1–3% NaOH treatment",
      "Rinse to neutral pH and dry",
      "Form nonwoven fiber mat",
      "Impregnate with binder",
      "Press and dry/cure",
      "Apply wax/oil/topcoat"
    ],
    simulation: {
      tensileMPa: [6, 14],
      elongationPct: [10, 35],
      tearN: [15, 40],
      waterAbsorptionPct: [25, 70],
      densityGcm3: [0.65, 0.95],
      thicknessMm: [0.8, 1.8],
      trlNow: 3,
      projectedTrl: 5,
      costUsdM2: [6, 16],
      score: 75.8
    },
    strengths: ["Accessible raw material", "Good baseline for experiments", "Strong waste valorization story"],
    risks: ["Stiffness", "Rough surface", "Water absorption"],
    bestUse: "Prototype swatches, notebooks, packaging panels.",
    patentAngle: "Specific fiber softening, mat forming, binder impregnation, and finishing sequence."
  },
  {
    id: "m2-layered-laminate",
    shortName: "Layered Laminate",
    title: "Layered Date Palm Fiber Laminate",
    materialBase: "Treated palm fiber layer + backing + protective topcoat",
    modelType: "laminate",
    tagline: "Best commercial route: a synthetic-leather-like multilayer architecture.",
    color: "#8f6f3c",
    secondaryColor: "#2f2c23",
    accentColor: "#f0d084",
    texture: "layered",
    layers: [
      { name: "Protective bio-coating", color: "#e8c66c", thickness: 0.12, note: "Abrasion and water resistance." },
      { name: "Fine palm fiber/date-powder surface", color: "#9a6a35", thickness: 0.24, note: "Leather-like grain and local identity." },
      { name: "Treated palm fiber composite core", color: "#755f32", thickness: 0.64, note: "Strength and structure." },
      { name: "Textile or palm backing", color: "#2c2a24", thickness: 0.28, note: "Tear strength and stitchability." }
    ],
    steps: [
      "Prepare backing layer",
      "Treat and size palm fibers",
      "Prepare palm composite paste",
      "Coat composite onto backing",
      "Press/laminate under heat",
      "Dry and cure",
      "Apply fine surface layer",
      "Emboss leather grain",
      "Apply protective topcoat"
    ],
    simulation: {
      tensileMPa: [10, 22],
      elongationPct: [15, 45],
      tearN: [30, 80],
      waterAbsorptionPct: [10, 40],
      densityGcm3: [0.75, 1.1],
      thicknessMm: [0.9, 1.6],
      trlNow: 3,
      projectedTrl: 5,
      costUsdM2: [10, 24],
      score: 79.8
    },
    strengths: ["Closest to industry leather construction", "Good tear resistance", "Strong patent architecture"],
    risks: ["Layer delamination", "Topcoat cracking", "More variables to optimize"],
    bestUse: "Wallets, bags, notebook covers, interior panels.",
    patentAngle: "Multilayer palm-waste leather architecture with treated fiber core, surface layer, and PU-free topcoat."
  },
  {
    id: "m3-natural-rubber-palm",
    shortName: "Rubber Fiber",
    title: "Date Palm Fiber + Natural Rubber Latex Composite",
    materialBase: "Palm fibers dispersed in natural rubber latex",
    modelType: "rubber",
    tagline: "Flexibility-focused route: rubber matrix prevents brittle palm-fiber behavior.",
    color: "#4d3b25",
    secondaryColor: "#c58a42",
    accentColor: "#f3d7a1",
    texture: "elastic",
    layers: [
      { name: "Elastic rubber-rich skin", color: "#5a3a21", thickness: 0.18, note: "Soft hand feel." },
      { name: "Palm fiber-rubber body", color: "#8a612d", thickness: 0.82, note: "Flexible reinforcement." },
      { name: "Optional fabric backing", color: "#29231c", thickness: 0.18, note: "Improves stitch tear." }
    ],
    steps: [
      "Dry and treat palm fibers",
      "Cut fibers to controlled length",
      "Prepare natural rubber latex mix",
      "Disperse fibers slowly",
      "Cast or coat onto backing",
      "Press to remove voids",
      "Dry/cure rubber matrix",
      "Emboss surface texture",
      "Apply anti-tack finish"
    ],
    simulation: {
      tensileMPa: [8, 18],
      elongationPct: [40, 150],
      tearN: [20, 60],
      waterAbsorptionPct: [10, 35],
      densityGcm3: [0.8, 1.05],
      thicknessMm: [0.8, 1.8],
      trlNow: 3,
      projectedTrl: 5,
      costUsdM2: [8, 20],
      score: 77.2
    },
    strengths: ["Best flexibility", "Good bending resistance", "Practical university-lab prototype"],
    risks: ["Rubber odor", "Tackiness", "Latex allergy and aging"],
    bestUse: "Flexible accessories, soft covers, bendable panels.",
    patentAngle: "Optimized palm fiber length, latex ratio, curing and anti-tack finishing system."
  },
  {
    id: "m4-pectin-starch-film",
    shortName: "Pectin/Starch Film",
    title: "Pectin/Starch/Glycerol Film Reinforced with Palm Fibers",
    materialBase: "Biopolymer film + palm fiber reinforcement",
    modelType: "biopolymer",
    tagline: "Highly bio-based route, useful as a binder layer but weak alone.",
    color: "#d47b36",
    secondaryColor: "#ffd99d",
    accentColor: "#fff2d4",
    texture: "translucent",
    layers: [
      { name: "Wax or shellac finish", color: "#ffd28a", thickness: 0.08, note: "Reduces moisture sensitivity." },
      { name: "Pectin/starch/glycerol matrix", color: "#d98b43", thickness: 0.70, note: "Film-forming phase." },
      { name: "Palm microfiber reinforcement", color: "#8f7b4a", thickness: 0.18, note: "Limits tearing." }
    ],
    steps: [
      "Prepare pectin/starch solution",
      "Add glycerol plasticizer",
      "Disperse fine palm fibers",
      "Optional calcium crosslinking",
      "Cast into thin sheet",
      "Dry slowly to prevent cracking",
      "Condition at stable humidity",
      "Apply hydrophobic finish",
      "Test water and bending behavior"
    ],
    simulation: {
      tensileMPa: [2, 8],
      elongationPct: [20, 80],
      tearN: [5, 20],
      waterAbsorptionPct: [50, 150],
      densityGcm3: [0.85, 1.2],
      thicknessMm: [0.5, 1.3],
      trlNow: 3,
      projectedTrl: 4,
      costUsdM2: [5, 14],
      score: 71.2
    },
    strengths: ["Low toxicity", "High bio-based content", "Easy lab casting"],
    risks: ["Water sensitivity", "Low tear strength", "Cracking during drying"],
    bestUse: "Binder layer, decorative sheets, low-stress packaging.",
    patentAngle: "Palm-fiber-reinforced biopolymer film with crosslinking and hydrophobic finish."
  },
  {
    id: "m5-bioresin-fiber",
    shortName: "Bio-Resin Fiber",
    title: "Bio-Resin / Palm Fiber Composite Sheet",
    materialBase: "Palm fibers embedded in bio-resin or partially bio-based resin",
    modelType: "bioresin",
    tagline: "Higher-performance composite route if resin lab access exists.",
    color: "#6f4a2f",
    secondaryColor: "#c4a16c",
    accentColor: "#ffe1a8",
    texture: "glossy",
    layers: [
      { name: "Gloss bio-resin top layer", color: "#c48b45", thickness: 0.14, note: "Polished surface and protection." },
      { name: "Palm-fiber resin composite", color: "#6b4e32", thickness: 0.86, note: "Mechanical body." }
    ],
    steps: [
      "Prepare dried palm fibers",
      "Surface treat fibers",
      "Mix bio-resin and additives",
      "Disperse fibers into resin",
      "Degas mixture",
      "Compression mold sheet",
      "Cure at controlled temperature",
      "Sand/calender surface",
      "Apply finish or embossing"
    ],
    simulation: {
      tensileMPa: [8, 20],
      elongationPct: [10, 50],
      tearN: [20, 60],
      waterAbsorptionPct: [10, 40],
      densityGcm3: [0.85, 1.2],
      thicknessMm: [0.8, 2.0],
      trlNow: 3,
      projectedTrl: 5,
      costUsdM2: [12, 30],
      score: 73.2
    },
    strengths: ["Good water resistance", "High industrial compatibility", "Smooth finish potential"],
    risks: ["Stiffness", "Resin cost", "Sustainability claim depends on resin"],
    bestUse: "Rigid accessories, panels, luxury packaging.",
    patentAngle: "Bio-resin chemistry and treated palm-fiber dispersion for flexible leather-like sheet."
  },
  {
    id: "m6-pu-free-coated-mat",
    shortName: "PU-Free Coated Mat",
    title: "Polyurethane-Free Bio-Coated Palm Fiber Mat",
    materialBase: "Palm fiber mat with natural coating system",
    modelType: "bioCoated",
    tagline: "Sustainability-first route avoiding PU-heavy plant leather criticism.",
    color: "#5d7c3a",
    secondaryColor: "#d2b66b",
    accentColor: "#edf4d2",
    texture: "coated",
    layers: [
      { name: "Natural wax/shellac/bio-coat", color: "#e0c36e", thickness: 0.12, note: "PU-free water and abrasion layer." },
      { name: "Dense palm fiber mat", color: "#7c6d3b", thickness: 0.88, note: "Sustainable structural layer." }
    ],
    steps: [
      "Form dense palm fiber mat",
      "Pre-press to compact structure",
      "Apply natural binder",
      "Dry and press again",
      "Apply wax/shellac/bio-resin coat",
      "Buff surface",
      "Repeat coating if needed",
      "Emboss grain",
      "Run rub/water tests"
    ],
    simulation: {
      tensileMPa: [7, 16],
      elongationPct: [15, 55],
      tearN: [20, 55],
      waterAbsorptionPct: [8, 35],
      densityGcm3: [0.7, 1.0],
      thicknessMm: [0.8, 1.8],
      trlNow: 3,
      projectedTrl: 5,
      costUsdM2: [8, 22],
      score: 76.0
    },
    strengths: ["Strong sustainability story", "PU-free positioning", "Good circularity"],
    risks: ["Coating wear", "Heat softening", "May not match PU durability"],
    bestUse: "Eco accessories, stationery, low-moisture luxury packaging.",
    patentAngle: "PU-free natural coating stack on date palm fiber substrate."
  },
  {
    id: "m7-nanocellulose",
    shortName: "Palm Nanocellulose",
    title: "Palm Cellulose Micro/Nanofiber Sheet",
    materialBase: "Microfibrillated or nanocellulose from palm branch waste",
    modelType: "nanocellulose",
    tagline: "Advanced research route: high novelty but chemically complex.",
    color: "#dbeeea",
    secondaryColor: "#8bb9ad",
    accentColor: "#ffffff",
    texture: "translucent",
    layers: [
      { name: "Nanocellulose film", color: "#dbeeea", thickness: 0.78, note: "Dense fibril network." },
      { name: "Crosslinked surface", color: "#ffffff", thickness: 0.10, note: "Improves moisture resistance." }
    ],
    steps: [
      "Grind palm waste",
      "Alkali treatment",
      "Bleaching/purification",
      "Mechanical fibrillation or acid hydrolysis",
      "Neutralize and wash",
      "Prepare nanocellulose suspension",
      "Blend with film-forming polymer",
      "Cast and dry",
      "Crosslink/topcoat"
    ],
    simulation: {
      tensileMPa: [12, 30],
      elongationPct: [5, 25],
      tearN: [10, 35],
      waterAbsorptionPct: [40, 120],
      densityGcm3: [0.9, 1.3],
      thicknessMm: [0.2, 1.0],
      trlNow: 2,
      projectedTrl: 4,
      costUsdM2: [20, 60],
      score: 64.6
    },
    strengths: ["High novelty", "Smooth high-tech film", "Potential publication value"],
    risks: ["Chemicals", "Scaling difficulty", "Brittleness/water sensitivity"],
    bestUse: "Academic research samples, coatings, thin films.",
    patentAngle: "Palm-derived nanocellulose leather-like film with novel crosslinking and lamination."
  },
  {
    id: "m8-mycelium-palm",
    shortName: "Mycelium Palm",
    title: "Mycelium-Assisted Palm Substrate Leather",
    materialBase: "Fungal mycelium grown on palm waste substrate",
    modelType: "mycelium",
    tagline: "Biofabrication route: high sustainability, high contamination risk.",
    color: "#eee5d2",
    secondaryColor: "#7d6f58",
    accentColor: "#ffffff",
    texture: "porous",
    layers: [
      { name: "Finished mycelium skin", color: "#e7dcc8", thickness: 0.70, note: "Fungal biomass network." },
      { name: "Palm substrate residues", color: "#7d6f58", thickness: 0.20, note: "Nutrient/reinforcement phase." },
      { name: "Bio-finish", color: "#fff7e5", thickness: 0.10, note: "Controls water and abrasion." }
    ],
    steps: [
      "Prepare palm waste substrate",
      "Sterilize or pasteurize substrate",
      "Inoculate with fungal culture",
      "Incubate at controlled humidity",
      "Grow mycelium mat",
      "Stop growth by drying/heat",
      "Plasticize/condition",
      "Press into sheet",
      "Finish and test"
    ],
    simulation: {
      tensileMPa: [5, 15],
      elongationPct: [10, 40],
      tearN: [10, 40],
      waterAbsorptionPct: [20, 80],
      densityGcm3: [0.2, 0.7],
      thicknessMm: [1.0, 3.0],
      trlNow: 3,
      projectedTrl: 4,
      costUsdM2: [18, 70],
      score: 66.5
    },
    strengths: ["Powerful sustainability narrative", "Biofabricated texture", "High uniqueness"],
    risks: ["Contamination", "Growth inconsistency", "Long cycle time"],
    bestUse: "Concept luxury biomaterial, acoustic/decorative panels, research prototypes.",
    patentAngle: "Palm waste as optimized fungal substrate and post-treated mycelium leather laminate."
  },
  {
    id: "m9-bacterial-cellulose-hybrid",
    shortName: "Bacterial Cellulose",
    title: "Bacterial Cellulose Hybrid Palm Leather",
    materialBase: "Bacterial cellulose pellicle laminated with palm fibers",
    modelType: "bacterialCellulose",
    tagline: "Advanced biofilm route: beautiful material, difficult first-stage scaling.",
    color: "#c9e9e3",
    secondaryColor: "#f9ffff",
    accentColor: "#6faeac",
    texture: "gel",
    layers: [
      { name: "Bacterial cellulose pellicle", color: "#dff6f1", thickness: 0.72, note: "Pure cellulose network." },
      { name: "Palm microfiber laminate", color: "#978b57", thickness: 0.20, note: "Adds tear strength." },
      { name: "Conditioned surface", color: "#f9ffff", thickness: 0.08, note: "Reduces brittleness." }
    ],
    steps: [
      "Prepare fermentation medium",
      "Grow bacterial cellulose pellicle",
      "Wash and purify pellicle",
      "Plasticize with glycerol/sorbitol",
      "Lay palm microfibers into pellicle",
      "Laminate under pressure",
      "Dry slowly",
      "Condition humidity",
      "Apply hydrophobic finish"
    ],
    simulation: {
      tensileMPa: [10, 25],
      elongationPct: [5, 30],
      tearN: [10, 40],
      waterAbsorptionPct: [60, 200],
      densityGcm3: [0.9, 1.3],
      thicknessMm: [0.3, 1.5],
      trlNow: 2,
      projectedTrl: 4,
      costUsdM2: [30, 100],
      score: 63.9
    },
    strengths: ["High-purity cellulose", "Strong visual novelty", "Good patent potential"],
    risks: ["Slow/expensive production", "Water sensitivity", "Drying brittleness"],
    bestUse: "Advanced R&D film, luxury concept material, academic demonstrator.",
    patentAngle: "Bacterial cellulose-palm microfiber hybrid laminate with controlled plasticization and drying."
  }
]

export const criteria = [
  { key: "mechanical", label: "Mechanical performance", weight: 20 },
  { key: "lab", label: "Lab feasibility", weight: 15 },
  { key: "scale", label: "Industrial scalability", weight: 15 },
  { key: "cost", label: "Cost competitiveness", weight: 15 },
  { key: "sustainability", label: "Sustainability", weight: 15 },
  { key: "patent", label: "Patentability", weight: 10 },
  { key: "market", label: "Market potential", weight: 10 }
]
