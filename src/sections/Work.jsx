import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { projects, workCategories } from '../data/site.js'

// Vertical scroll pins the section and drives the card track horizontally.
export default function Work() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const getDistance = () => track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="section work" id="work">
      <h2 className="section__heading">
        My <span className="grad">Work</span>
      </h2>
      <div className="work__viewport">
        <div ref={trackRef} className="work__track">
          {projects.map((p, i) => (
            <article key={p.slug} className="work-card">
              <div className="work-card__poster">
                <img src={p.image} alt={`${p.title} poster`} loading="lazy" />
                <span className="work-card__poster-title">{p.title}</span>
                <em>{p.status.toUpperCase()}</em>
              </div>
              <div className="work-card__head">
                <div className="work-card__num">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="work-card__title">
                  <h3>{p.title}</h3>
                  <p>{workCategories[p.slug]}</p>
                </div>
              </div>
              <div className="work-card__tools">
                <h4>Tools and features</h4>
                <p>{p.tech.join(', ')}</p>
              </div>
              <p className="work-card__tools" style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                {p.description}
              </p>
              <div className="work-card__links">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer">
                    LIVE ↗
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer">
                    CODE ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
