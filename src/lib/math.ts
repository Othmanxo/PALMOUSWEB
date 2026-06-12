import { Method } from "@/data/methods"

export function midpoint(range: [number, number]) {
  return (range[0] + range[1]) / 2
}

export function formatRange(range: [number, number], unit = "") {
  return `${range[0]}–${range[1]}${unit}`
}

export function estimateAreaYieldM2(params: {
  wetWasteKg: number
  dryFraction: number
  fiberRecovery: number
  thicknessMm: number
  densityGcm3: number
  fiberFraction: number
}) {
  const dryMass = params.wetWasteKg * params.dryFraction
  const usableFiber = dryMass * params.fiberRecovery
  const thicknessM = params.thicknessMm / 1000
  const densityKgM3 = params.densityGcm3 * 1000
  const sheetMassPerM2 = thicknessM * densityKgM3
  const fiberMassPerM2 = sheetMassPerM2 * params.fiberFraction
  const areaYield = usableFiber / Math.max(fiberMassPerM2, 0.0001)

  return {
    dryMass,
    usableFiber,
    sheetMassPerM2,
    fiberMassPerM2,
    areaYield
  }
}

export function defaultYieldForMethod(method: Method) {
  return estimateAreaYieldM2({
    wetWasteKg: 10,
    dryFraction: 0.5,
    fiberRecovery: 0.5,
    thicknessMm: midpoint(method.simulation.thicknessMm),
    densityGcm3: midpoint(method.simulation.densityGcm3),
    fiberFraction: method.modelType === "laminate" ? 0.45 : method.modelType === "rubber" ? 0.35 : 0.4
  })
}
