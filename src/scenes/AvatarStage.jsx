import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useGraph } from '@react-three/fiber'
import { useAnimations, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { ScrollTrigger } from '../lib/gsap.js'
import { useRobot } from './useRobot.js'

// One continuous scene across Hero + What-I-Do (like the reference):
// scroll progress p goes 0 → 1 over the stage wrapper. The robot starts
// centered facing the camera, glides left while turning to face right,
// and settles onto a chair as the desk slides in.

const smooth = (p, a, b) => THREE.MathUtils.smoothstep(p, a, b)

function StageRobot({ progressRef }) {
  const group = useRef(null)
  const { cloned, animations } = useRobot()
  const { nodes } = useGraph(cloned)
  const { actions } = useAnimations(animations, group)
  const camBase = useRef(null)

  // Both clips frozen on clean frames; scroll blends their weights.
  useEffect(() => {
    const idle = actions.Idle
    const sit = actions.Sitting
    if (idle) {
      idle.reset().play()
      idle.paused = true
      idle.time = 0
    }
    if (sit) {
      sit.reset().play()
      sit.paused = true
      sit.time = sit.getClip().duration * 0.5
      sit.setEffectiveWeight(0)
    }
  }, [actions])

  useFrame(({ pointer, clock, camera }) => {
    const t = clock.getElapsedTime()
    const p = progressRef.current
    // Three-phase journey (matching the reference recording):
    // hero: centered full-body, facing viewer
    // about: zoomed close-up bust on the left, 3/4 turn, still tracking
    // what-i-do: back to full-body, seated at the centered desk
    const moveLeft = smooth(p, 0.2, 0.38)
    const moveCenter = smooth(p, 0.76, 0.9)
    const sitW = smooth(p, 0.8, 0.95)

    actions.Idle?.setEffectiveWeight(1 - sitW)
    actions.Sitting?.setEffectiveWeight(sitW)

    // two-phase interpolation helper: hero → about value, then → desk value
    const phase = (hero, about, desk) =>
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(hero, about, moveLeft),
        desk,
        moveCenter,
      )

    if (group.current) {
      group.current.position.x = phase(0, -1.5, -1.0)
      const scaleNow = phase(0.62, 0.9, 0.62)
      group.current.scale.setScalar(scaleNow)
      const standY = phase(-1.75, -3.4, -1.75) + Math.sin(t * 1.1) * 0.045
      const sitY = -1.06 + Math.sin(t * 0.9) * 0.02
      group.current.position.y = THREE.MathUtils.lerp(standY, sitY, sitW)
      // facing: viewer → slight 3/4 right turn (about) → profile right (desk)
      group.current.rotation.y = phase(pointer.x * 0.12, 0.35, 1.35)
      group.current.rotation.z = Math.sin(t * 0.55) * 0.015 * (1 - sitW)
    }

    // Desk phase: pull the camera back so the whole seated diorama —
    // robot, desk, chair, floor glow — fits like the reference vista.
    if (!camBase.current) camBase.current = camera.position.z
    camera.position.z = camBase.current + 3.2 * moveCenter
    camera.position.x = -0.15 * moveCenter

    // Head keeps tracking the cursor through hero AND about (like the
    // reference), then relaxes toward the monitor as it sits.
    const head = nodes.Head
    if (head) {
      const track = 1 - moveCenter
      const targetY = pointer.x * 0.5 * track + 0.1 * sitW
      const targetX =
        -pointer.y * 0.3 * track + Math.sin(t * 1.1) * 0.03 - 0.12 * sitW
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetY, 0.06)
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetX, 0.06)
    }
  })

  return (
    <group ref={group} scale={0.62}>
      <primitive object={cloned} />
    </group>
  )
}

// Desk + monitor + keyboard + chair. Slides in from the right as the
// robot arrives; the chair lands under the robot's seat position.
function DeskChair({ progressRef }) {
  const ref = useRef(null)
  const screenRef = useRef(null)

  useFrame(({ clock }) => {
    const p = progressRef.current
    // enters only once the About section is gone
    const enter = smooth(p, 0.76, 0.92)
    if (ref.current) {
      ref.current.visible = enter > 0.01
      // settles at +0.2 → chair under the robot (-1.0), desk center-right
      ref.current.position.x = THREE.MathUtils.lerp(8.5, 0.2, enter)
    }
    if (screenRef.current) {
      // gentle monitor glow pulse
      screenRef.current.material.emissiveIntensity =
        0.5 + Math.sin(clock.getElapsedTime() * 1.6) * 0.08
    }
  })

  const frame = '#d8d4de'
  return (
    <group ref={ref}>
      {/* chair under the robot's final position, backrest behind its back */}
      <group position={[-1.35, -1.75, -0.05]} rotation={[0, 1.35, 0]}>
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[0.95, 0.09, 0.95]} />
          <meshStandardMaterial color="#241a31" roughness={0.55} />
        </mesh>
        <mesh position={[0, 1.25, -0.48]}>
          <boxGeometry args={[0.95, 1.15, 0.09]} />
          <meshStandardMaterial color="#241a31" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.62, 12]} />
          <meshStandardMaterial color="#8d86a0" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.05, 24]} />
          <meshStandardMaterial color="#241a31" roughness={0.5} />
        </mesh>
      </group>
      {/* desk to the robot's right, monitor facing the robot */}
      <group position={[-0.55, -1.75, 0.05]}>
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[1.9, 0.07, 1.15]} />
          <meshStandardMaterial color={frame} roughness={0.5} />
        </mesh>
        {[
          [-0.85, 0.5, 0.45],
          [0.85, 0.5, 0.45],
          [-0.85, 0.5, -0.45],
          [0.85, 0.5, -0.45],
        ].map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.08, 1.05, 0.08]} />
            <meshStandardMaterial color={frame} roughness={0.5} />
          </mesh>
        ))}
        {/* monitor turned toward the robot on the left */}
        <group position={[0.2, 1.62, 0]} rotation={[0, Math.PI / 2 - 0.35, 0]}>
          <mesh>
            <boxGeometry args={[1.25, 0.8, 0.05]} />
            <meshStandardMaterial color="#1b1424" roughness={0.4} />
          </mesh>
          <mesh ref={screenRef} position={[0, 0, 0.03]}>
            <planeGeometry args={[1.12, 0.67]} />
            <meshStandardMaterial
              color="#d16ba5"
              emissive="#c0447e"
              emissiveIntensity={0.55}
            />
          </mesh>
          <mesh position={[0, -0.52, 0]}>
            <boxGeometry args={[0.12, 0.26, 0.08]} />
            <meshStandardMaterial color="#c9c4d2" />
          </mesh>
        </group>
        {/* keyboard near the robot edge */}
        <mesh position={[-0.55, 1.1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.75, 0.04, 0.28]} />
          <meshStandardMaterial color="#efecf3" roughness={0.6} />
        </mesh>
      </group>
    </group>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 4, 5]} intensity={1.3} />
      <pointLight position={[-4, 2, -2]} intensity={30} color="#a855f7" />
      <pointLight position={[4, -1, -3]} intensity={24} color="#7c3aed" />
      <pointLight position={[0, -2, 3]} intensity={9} color="#e879f9" />
    </>
  )
}

export default function AvatarStage() {
  const progressRef = useRef(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: '.stage-wrap',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
        if (import.meta.env.DEV) window.__stageP = self.progress
      },
    })
    return () => st.kill()
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.2], fov: 38 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Lights />
        <StageRobot progressRef={progressRef} />
        <DeskChair progressRef={progressRef} />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.55}
          scale={11}
          blur={2.6}
          color="#4c1d95"
        />
      </Suspense>
    </Canvas>
  )
}
