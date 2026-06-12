"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { Method, ModelType } from "@/data/methods"

type SceneProps = {
  method: Method
}

function hex(color: string) {
  return new THREE.Color(color)
}

function makeNoiseTexture(primary: string, secondary: string, texture: Method["texture"]) {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")!
  ctx.fillStyle = primary
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < 1600; i++) {
    const alpha = Math.random() * 0.16
    ctx.fillStyle = secondary + Math.floor(alpha * 255).toString(16).padStart(2, "0")
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = texture === "porous" ? Math.random() * 4 + 1 : Math.random() * 1.8
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  if (["fibrous", "layered", "coated", "rough"].includes(texture)) {
    for (let i = 0; i < 130; i++) {
      ctx.strokeStyle = i % 2 ? "rgba(255,255,255,0.18)" : "rgba(20,16,8,0.28)"
      ctx.lineWidth = Math.random() * 2 + 0.35
      const y = Math.random() * canvas.height
      ctx.beginPath()
      ctx.moveTo(-30, y)
      for (let x = 0; x < canvas.width + 30; x += 60) {
        ctx.lineTo(x, y + Math.sin(x * 0.02 + i) * (Math.random() * 8))
      }
      ctx.stroke()
    }
  }

  if (texture === "gel" || texture === "translucent") {
    const gradient = ctx.createRadialGradient(240, 200, 10, 240, 200, 350)
    gradient.addColorStop(0, "rgba(255,255,255,0.45)")
    gradient.addColorStop(1, "rgba(255,255,255,0.03)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const textureMap = new THREE.CanvasTexture(canvas)
  textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping
  textureMap.repeat.set(2, 2)
  textureMap.anisotropy = 4
  return textureMap
}

function makeBentPlane(width: number, depth: number, amp: number, color: string, textureMap: THREE.Texture, transparent = false) {
  const geometry = new THREE.PlaneGeometry(width, depth, 96, 48)
  const position = geometry.attributes.position
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const y = position.getY(i)
    const z = Math.sin(x * 1.8) * amp + Math.cos(y * 1.2) * amp * 0.45
    position.setZ(i, z)
  }
  geometry.computeVertexNormals()
  const material = new THREE.MeshStandardMaterial({
    color: hex(color),
    map: textureMap,
    roughness: transparent ? 0.36 : 0.82,
    metalness: 0.03,
    transparent,
    opacity: transparent ? 0.72 : 1,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -Math.PI / 2.6
  return mesh
}

function createFiberLines(count: number, color: string, y = 0.08, width = 5, depth = 3) {
  const group = new THREE.Group()
  const mat = new THREE.LineBasicMaterial({ color: hex(color), transparent: true, opacity: 0.75 })
  for (let i = 0; i < count; i++) {
    const points: THREE.Vector3[] = []
    const z = (Math.random() - 0.5) * depth
    const startX = -width / 2 + Math.random() * 0.6
    const segments = 6
    for (let s = 0; s <= segments; s++) {
      const x = startX + (s / segments) * (width * (0.45 + Math.random() * 0.55))
      points.push(new THREE.Vector3(x, y + Math.random() * 0.035, z + Math.sin(s + i) * 0.06 + (Math.random() - 0.5) * 0.08))
    }
    const curve = new THREE.CatmullRomCurve3(points)
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(18))
    const line = new THREE.Line(geometry, mat)
    group.add(line)
  }
  return group
}

function createParticles(count: number, color: string, radius = 0.035, y = 0.12) {
  const group = new THREE.Group()
  const geometry = new THREE.SphereGeometry(radius, 10, 10)
  const material = new THREE.MeshStandardMaterial({ color: hex(color), roughness: 0.92 })
  for (let i = 0; i < count; i++) {
    const particle = new THREE.Mesh(geometry, material)
    particle.position.set((Math.random() - 0.5) * 4.7, y + Math.random() * 0.08, (Math.random() - 0.5) * 2.6)
    group.add(particle)
  }
  return group
}

function createLayeredLaminate(method: Method, textureMap: THREE.Texture) {
  const group = new THREE.Group()
  let y = 0
  const total = method.layers.reduce((sum, layer) => sum + layer.thickness, 0)
  method.layers.forEach((layer, index) => {
    const h = (layer.thickness / total) * 0.65
    const geometry = new THREE.BoxGeometry(5.2, h, 3.1)
    const material = new THREE.MeshStandardMaterial({
      color: hex(layer.color),
      map: index === 1 ? textureMap : undefined,
      roughness: index === 0 ? 0.28 : 0.72,
      metalness: 0.02
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = y + h / 2
    mesh.position.x = index * 0.035
    group.add(mesh)
    y += h
  })
  const fiberLines = createFiberLines(90, "#f0d084", y + 0.05, 5.1, 3)
  group.add(fiberLines)
  const particles = createParticles(55, "#4a2f18", 0.028, y + 0.03)
  group.add(particles)
  group.rotation.x = -0.18
  group.rotation.z = -0.04
  return group
}

function createPorousMycelium(method: Method, textureMap: THREE.Texture) {
  const group = new THREE.Group()
  const mesh = makeBentPlane(5, 3, 0.12, method.color, textureMap, false)
  mesh.scale.y = 1.05
  group.add(mesh)

  const poreMaterial = new THREE.MeshStandardMaterial({ color: "#6d5d45", roughness: 1 })
  for (let i = 0; i < 85; i++) {
    const pore = new THREE.Mesh(new THREE.SphereGeometry(Math.random() * 0.06 + 0.02, 12, 12), poreMaterial)
    pore.position.set((Math.random() - 0.5) * 4.6, 0.07 + Math.random() * 0.06, (Math.random() - 0.5) * 2.5)
    pore.scale.y = 0.25
    group.add(pore)
  }
  group.add(createFiberLines(45, "#ffffff", 0.12, 4.8, 2.8))
  return group
}

function createModel(method: Method) {
  const group = new THREE.Group()
  const textureMap = makeNoiseTexture(method.color, method.secondaryColor, method.texture)

  const addLabelMarker = (x: number, y: number, z: number, color: string) => {
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshStandardMaterial({ color: hex(color), emissive: hex(color), emissiveIntensity: 0.2 })
    )
    marker.position.set(x, y, z)
    group.add(marker)
  }

  if (method.modelType === "laminate") {
    group.add(createLayeredLaminate(method, textureMap))
    addLabelMarker(-2.8, 0.9, -1.7, method.accentColor)
  } else if (method.modelType === "mycelium") {
    group.add(createPorousMycelium(method, textureMap))
  } else if (method.modelType === "bioresin") {
    const geometry = new THREE.BoxGeometry(5.1, 0.35, 3.0, 24, 2, 16)
    const material = new THREE.MeshPhysicalMaterial({
      color: hex(method.color),
      map: textureMap,
      roughness: 0.18,
      transmission: 0.05,
      thickness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.25
    })
    const slab = new THREE.Mesh(geometry, material)
    group.add(slab)
    group.add(createFiberLines(70, method.accentColor, 0.24, 4.7, 2.7))
  } else if (method.modelType === "rubber") {
    const sheet = makeBentPlane(5.2, 3.0, 0.16, method.color, textureMap, false)
    sheet.material = new THREE.MeshStandardMaterial({
      color: hex(method.color),
      map: textureMap,
      roughness: 0.46,
      metalness: 0.02,
      side: THREE.DoubleSide
    })
    group.add(sheet)
    group.add(createFiberLines(60, method.accentColor, 0.08, 4.8, 2.7))
  } else if (method.modelType === "nanocellulose" || method.modelType === "bacterialCellulose" || method.modelType === "biopolymer") {
    const transparent = true
    const sheet = makeBentPlane(5.0, 3.0, method.modelType === "bacterialCellulose" ? 0.08 : 0.05, method.color, textureMap, transparent)
    group.add(sheet)
    group.add(createFiberLines(method.modelType === "bacterialCellulose" ? 38 : 55, method.secondaryColor, 0.07, 4.7, 2.7))
    if (method.modelType === "bacterialCellulose") group.add(createParticles(35, method.accentColor, 0.02, 0.08))
  } else if (method.modelType === "bioCoated") {
    const base = makeBentPlane(5.0, 3.0, 0.06, method.secondaryColor, textureMap, false)
    group.add(base)
    const top = makeBentPlane(5.05, 3.05, 0.04, method.color, textureMap, true)
    top.position.y += 0.09
    group.add(top)
    group.add(createFiberLines(95, method.accentColor, 0.11, 4.9, 2.8))
  } else {
    const sheet = makeBentPlane(5.0, 3.0, 0.12, method.color, textureMap, false)
    group.add(sheet)
    group.add(createFiberLines(110, method.accentColor, 0.1, 4.9, 2.8))
    if (method.modelType === "nonwoven") group.add(createParticles(32, method.secondaryColor, 0.025, 0.09))
  }

  group.scale.set(0.9, 0.9, 0.9)
  return group
}

export function MaterialScene({ method }: SceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hint, setHint] = useState(true)

  useEffect(() => {
    if (!mountRef.current) return
    const mount = mountRef.current
    const rect = mount.getBoundingClientRect()
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0a0d0b, 8, 22)

    const camera = new THREE.PerspectiveCamera(55, rect.width / rect.height, 0.1, 1000)
    camera.position.set(4.6, 3.0, 6.0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xffffff, 0.62)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 1.8)
    key.position.set(5, 6, 6)
    scene.add(key)

    const fill = new THREE.PointLight(method.accentColor, 1.2, 20)
    fill.position.set(-4, 2, -3)
    scene.add(fill)

    const model = createModel(method)
    scene.add(model)

    const grid = new THREE.GridHelper(9, 16, new THREE.Color(method.color), new THREE.Color("#23261f"))
    grid.position.y = -0.55
    scene.add(grid)

    const processParticles = createParticles(95, method.accentColor, 0.015, 1.15)
    processParticles.position.z = -2.7
    scene.add(processParticles)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.rotateSpeed = 0.62
    controls.enablePan = false
    controls.minDistance = 4.2
    controls.maxDistance = 11

    let frame = 0
    let raf = 0
    const animate = () => {
      frame += 1
      raf = requestAnimationFrame(animate)
      model.rotation.y += 0.0025
      model.rotation.x = Math.sin(frame * 0.008) * 0.035
      processParticles.rotation.y += 0.006
      processParticles.children.forEach((child, i) => {
        child.position.x += Math.sin(frame * 0.025 + i) * 0.0018
        child.position.y += Math.cos(frame * 0.018 + i) * 0.0009
      })
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const nextRect = mount.getBoundingClientRect()
      camera.aspect = nextRect.width / nextRect.height
      camera.updateProjectionMatrix()
      renderer.setSize(nextRect.width, nextRect.height)
    }
    window.addEventListener("resize", handleResize)
    const timer = window.setTimeout(() => setHint(false), 3600)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
      controls.dispose()
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry?.dispose()
          const material = object.material
          if (Array.isArray(material)) material.forEach((m) => m.dispose())
          else material?.dispose()
        }
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [method])

  return (
    <div ref={mountRef} className="relative h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-radial shadow-2xl">
      <div className="pointer-events-none absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur">
        <div className="text-xs uppercase tracking-[0.22em] text-neutral-400">3D material object</div>
        <div className="mt-1 text-sm font-semibold text-white">{method.shortName}</div>
      </div>
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 grid gap-2 md:grid-cols-3">
        {method.layers.slice(0, 3).map((layer) => (
          <div key={layer.name} className="rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: layer.color }} />
              <span className="text-xs font-semibold text-white">{layer.name}</span>
            </div>
            <p className="mt-1 text-[11px] leading-4 text-neutral-400">{layer.note}</p>
          </div>
        ))}
      </div>
      {hint ? (
        <div className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
          Drag to rotate · scroll to zoom
        </div>
      ) : null}
    </div>
  )
}
