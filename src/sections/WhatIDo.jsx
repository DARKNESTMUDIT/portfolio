import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { whatIDo } from '../data/site.js'

export default function WhatIDo() {
  const rootRef = useRef(null)
  const bigRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Big heading eases in as the section arrives
      gsap.fromTo(
        bigRef.current,
        { x: '3vw', opacity: 0 },
        {
          x: '0vw',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 60%',
            end: 'top 5%',
            scrub: true,
          },
        },
      )
      // Bracket cards rise in with stagger
      gsap.from('.card-bracket', {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 55%',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="section whatido" id="whatido">
      <div className="whatido__pin">
        <div className="glow glow--tl" />
        <div ref={bigRef} className="whatido__big" aria-hidden="true">
          WHAT I DO
        </div>
        <div className="whatido__inner">
          {/* left column is open stage space — the shared canvas robot sits here */}
          <div className="whatido__stage-space" aria-hidden="true" />
          <div className="whatido__cards">
            {whatIDo.map((card) => (
              <article key={card.title} className="card-bracket">
                <span className="corner" aria-hidden="true" />
                <h3>{card.title}</h3>
                <p className="sub">{card.subtitle}</p>
                <p className="desc">{card.description}</p>
                <span className="expand" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
