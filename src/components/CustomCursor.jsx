import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

// Purple glow blob that trails the pointer; grows over interactive elements.
export default function CustomCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    document.body.classList.add('custom-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, .tech-tile, .card-bracket'))
        el.classList.add('is-hover')
      else el.classList.remove('is-hover')
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div ref={ref} className="cursor-blob" aria-hidden="true" />
}
