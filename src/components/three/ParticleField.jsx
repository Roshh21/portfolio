import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 140
const CONNECTION_DISTANCE = 1.6

function NeuralNodes() {
  const pointsRef = useRef(null)
  const linesRef = useRef(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      velocities.push({
        x: (Math.random() - 0.5) * 0.0006,
        y: (Math.random() - 0.5) * 0.0006,
        z: (Math.random() - 0.5) * 0.0004,
      })
    }
    return { positions, velocities }
  }, [])

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), [])

  useFrame(() => {
    const posAttr = pointsRef.current?.geometry.attributes.position
    if (!posAttr) return

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posAttr.array[i * 3] += velocities[i].x
      posAttr.array[i * 3 + 1] += velocities[i].y
      posAttr.array[i * 3 + 2] += velocities[i].z

      if (Math.abs(posAttr.array[i * 3]) > 5) velocities[i].x *= -1
      if (Math.abs(posAttr.array[i * 3 + 1]) > 3) velocities[i].y *= -1
      if (Math.abs(posAttr.array[i * 3 + 2]) > 2) velocities[i].z *= -1
    }
    posAttr.needsUpdate = true

    const linePositions = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = posAttr.array[i * 3] - posAttr.array[j * 3]
        const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1]
        const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < CONNECTION_DISTANCE) {
          linePositions.push(
            posAttr.array[i * 3], posAttr.array[i * 3 + 1], posAttr.array[i * 3 + 2],
            posAttr.array[j * 3], posAttr.array[j * 3 + 1], posAttr.array[j * 3 + 2]
          )
        }
      }
    }
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    )
  })

  return (
    <group rotation={[0, 0, 0.15]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#EFE976" transparent opacity={0.7} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#E4DA1B" transparent opacity={0.12} />
      </lineSegments>
    </group>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <NeuralNodes />
    </Canvas>
  )
}
