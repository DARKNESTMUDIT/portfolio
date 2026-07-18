import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { career } from '../data/site.js'

export default function Career() {
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glowing line grows and its dot rides the scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 65%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        dotRef.current,
        { top: '0%' },
        {
          top: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 65%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )
      // Rows drift in from the sides
      gsap.utils.toArray('.career-row').forEach((row) => {
        gsap.from(row.querySelectorAll(':scope > *'), {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 78%' },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section career" id="career">
      <h2 className="section__heading">
        My <span className="grad">Career</span> &amp; Experience
      </h2>
      <div ref={rootRef} className="career__rows">
        <div ref={lineRef} className="career__line" aria-hidden="true" />
        <div ref={dotRef} className="career__dot" aria-hidden="true" />
        {career.map((item, i) => (
          <div key={i} className="career-row">
            <div className="career-row__role">
              <h3>{item.role}</h3>
              <p>{item.kind}</p>
            </div>
            <div className="career-row__year">{item.year}</div>
            <div className="career-row__desc">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
