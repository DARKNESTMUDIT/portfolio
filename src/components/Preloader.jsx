import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap.js'
import { preloaderMarquee, profile } from '../data/site.js'

// Lavender intro screen: giant marquee text behind a dark pill that counts
// 0 → 100, then the whole overlay wipes away to reveal the dark hero.
export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const pillRef = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        onDone?.()
      },
    })
    tl.to(counter, {
      v: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    })
      .to(pillRef.current, { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15')
      .to(rootRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
      })
    // spin the gradient ring on the pill
    const spin = gsap.to(pillRef.current, {
      '--pill-angle': '360deg',
      duration: 2,
      repeat: -1,
      ease: 'none',
    })
    return () => {
      tl.kill()
      spin.kill()
    }
  }, [onDone])

  const marquee = preloaderMarquee.repeat(4)

  return (
    <div ref={rootRef} className="preloader">
      <div className="preloader__brand">{profile.name.replace(' ', '')}</div>
      <div className="preloader__eq" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <div className="preloader__marquee" aria-hidden="true">
        <div className="preloader__marquee-track">
          {marquee}{marquee}
        </div>
      </div>
      <div ref={pillRef} className="preloader__pill">
        <span className="preloader__label">LOADING</span>
        <span className="preloader__pct">{pct}%</span>
      </div>
    </div>
  )
}
