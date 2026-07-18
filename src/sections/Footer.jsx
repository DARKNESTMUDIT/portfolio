import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { profile, footer } from '../data/site.js'

export default function Footer() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer__name', {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
      })
      gsap.from('.footer__grid > *', {
        opacity: 0,
        y: 34,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: rootRef.current, start: 'top 60%' },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={rootRef} className="footer" id="contact">
      <div className="glow glow--br" />
      <div className="footer__cta">
        <a className="btn-ghost" href={footer.playWithMe.url} target="_blank" rel="noreferrer">
          {footer.playWithMe.label} →
        </a>
        <a className="btn-solid" href={footer.hireMe.url}>
          {footer.hireMe.label} →
        </a>
      </div>
      <h2 className="footer__name">{profile.name.toUpperCase()}</h2>
      <div className="footer__grid">
        <div>
          <h4>Email</h4>
          <p className="val">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
          <h4>Location</h4>
          <p className="val">{footer.location}</p>
        </div>
        <div className="footer__social">
          <h4>Social</h4>
          {footer.socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') || s.url.startsWith('/') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {s.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div>
          <p className="footer__credit">
            Designed and Developed
            <br />
            by <span className="who">{profile.name}</span>
          </p>
          <p className="footer__copy">
            <span aria-hidden="true">©</span> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
