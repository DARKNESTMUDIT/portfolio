import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export const MODEL_URL = '/assets/models/RobotExpressive.glb'

// Clone the GLB (so multiple scenes can mount it) and re-tint the body
// to the light lavender-white look of the reference character.
export function useRobot() {
  const { scene, animations } = useGLTF(MODEL_URL)
  const cloned = useMemo(() => {
    const c = SkeletonUtils.clone(scene)
    c.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material = o.material.clone()
        const name = o.material.name || ''
        if (name === 'Main') o.material.color.set('#e9e5f2')
        if (name === 'Grey') o.material.color.set('#b9b3c6')
      }
    })
    return c
  }, [scene])
  return { cloned, animations }
}

useGLTF.preload(MODEL_URL)
