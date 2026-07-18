import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { profile, heroTitle } from '../data/site.js'

export default function Hero({ started }) {
  const rootRef = useRef(null)

  // Entrance reveal once the preloader is gone
  useEffect(() => {
    if (!started) return
    const ctx = gsap.context(() => {
      gsap.from('.hero__hello, .hero__name', {
        opacity: 0,
        filter: 'blur(14px)',
        y: 24,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
      })
      gsap.from('.hero__an, .hero__title-wrap', {
        opacity: 0,
        filter: 'blur(14px)',
        y: 24,
        duration: 1.1,
        delay: 0.35,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, rootRef)
    return () => ctx.revert()
  }, [started])

  return (
    <section ref={rootRef} className="hero" id="top">
      <div className="glow glow--tl" />
      <div className="glow glow--tr" />
      <div className="glow glow--br" />
      <div className="hero__left">
        <p className="hero__hello">Hello! I'm</p>
        <h1 className="hero__name">{profile.name.toUpperCase()}</h1>
      </div>
      <div className="hero__right">
        <p className="hero__an">An</p>
        <h2 className="hero__title-wrap">
          <span className="hero__title hero__title--top">{heroTitle.top}</span>
          <span className="hero__title hero__title--bottom">
            {heroTitle.bottom}
          </span>
        </h2>
      </div>
    </section>
  )
}
