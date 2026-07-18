import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Cosmic backdrop behind the tech grid: slow-rotating wireframe sphere
// plus a drifting star field, like the reference's nebula scene.
function WireSphere() {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.05
      ref.current.rotation.x = Math.sin(t * 0.11) * 0.18
    }
  })
  return (
    <mesh ref={ref} position={[0, -1.2, -4]}>
      <icosahedronGeometry args={[4.4, 2]} />
      <meshBasicMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.14}
      />
    </mesh>
  )
}

function Stars({ count = 340 }) {
  const ref = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16
      arr[i * 3 + 2] = -2 - Math.random() * 10
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.z = t * 0.008
      ref.current.material.opacity = 0.55 + Math.sin(t * 0.8) * 0.15
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c4b5fd"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  )
}

export default function TechBackdrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.3]}
      gl={{ antialias: false, alpha: true }}
    >
      <Suspense fallback={null}>
        <WireSphere />
        <Stars />
      </Suspense>
    </Canvas>
  )
}
