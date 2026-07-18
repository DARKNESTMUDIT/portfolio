import { useEffect, useRef } from 'react'
import {
  siPython,
  siKotlin,
  siTypescript,
  siJavascript,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siClerk,
  siVercel,
  siJetpackcompose,
  siMaterialdesign,
  siAndroid,
  siOllama,
  siClaude,
  siApple,
  siGit,
  siGithub,
  siTailwindcss,
} from 'simple-icons'
import { gsap } from '../lib/gsap.js'
import { techStack } from '../data/site.js'
import TechBackdrop from '../scenes/TechBackdrop.jsx'

const ICONS = {
  python: siPython,
  kotlin: siKotlin,
  typescript: siTypescript,
  javascript: siJavascript,
  react: siReact,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  clerk: siClerk,
  vercel: siVercel,
  jetpackcompose: siJetpackcompose,
  materialdesign: siMaterialdesign,
  android: siAndroid,
  ollama: siOllama,
  claude: siClaude,
  apple: siApple,
  git: siGit,
  github: siGithub,
  tailwindcss: siTailwindcss,
}

function iconFor(slug) {
  if (!slug) return null
  return ICONS[slug]?.path ?? null
}

// Pyramid rows like the reference: wide rows tapering toward the bottom.
function buildRows(items) {
  const sizes = [12, 11, 9, 6, 4, 2]
  const rows = []
  let idx = 0
  for (const size of sizes) {
    if (idx >= items.length) break
    rows.push(items.slice(idx, idx + size))
    idx += size
  }
  if (idx < items.length) rows.push(items.slice(idx))
  return rows
}

export default function TechStack() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tech-tile', {
        opacity: 0,
        y: 34,
        scale: 0.9,
        duration: 0.55,
        stagger: { each: 0.03, from: 'center' },
        ease: 'power2.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 60%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const rows = buildRows(techStack)

  return (
    <section ref={rootRef} className="section tech" id="tech">
      <div className="tech__backdrop" aria-hidden="true">
        <TechBackdrop />
        <span className="tech__star tech__star--1" />
        <span className="tech__star tech__star--2" />
      </div>
      <h2 className="section__heading">TECH STACK</h2>
      <div className="tech__rows">
        {rows.map((row, r) => (
          <div key={r} className="tech__row">
            {row.map((t) => {
              const path = iconFor(t.slug)
              return (
                <div key={t.name} className="tech-tile" title={t.name}>
                  {path ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={path} />
                    </svg>
                  ) : (
                    <span className="txt">
                      {t.name
                        .split(/[\s/·]+/)
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                  <b>{t.name}</b>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
