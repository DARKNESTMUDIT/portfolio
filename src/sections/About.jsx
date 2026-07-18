import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { aboutStatement } from '../data/site.js'

// About section — the robot (shared stage canvas) stands on the left;
// one bold statement on the right under a purple ABOUT ME heading.
export default function About() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about__ghost', {
        opacity: 0,
        letterSpacing: '0.6em',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
      })
      gsap.from('.about__statement', {
        opacity: 0,
        y: 44,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 55%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="section about" id="about">
      <div className="about__body">
        <p className="about__ghost">ABOUT ME</p>
        <p className="about__statement">{aboutStatement}</p>
      </div>
    </section>
  )
}
