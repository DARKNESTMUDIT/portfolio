import { siGithub, siX } from 'simple-icons'
import { socials, profile } from '../data/site.js'

// simple-icons dropped LinkedIn/email brands; inline paths for those.
const ICON_PATHS = {
  GitHub: siGithub.path,
  X: siX.path,
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z',
  Email:
    'M12 12.713L.015 3h23.97L12 12.713zM12 15.287L0 5.562V21h24V5.562l-12 9.725z',
}

export default function SocialRail() {
  return (
    <>
      <aside className="rail">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target={s.url.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={s.label}
          >
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d={ICON_PATHS[s.label] ?? ''} />
            </svg>
          </a>
        ))}
      </aside>
      <a
        className="resume-tag"
        href={profile.resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        RESUME ▤
      </a>
    </>
  )
}
