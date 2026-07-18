import { nav, profile } from '../data/site.js'

export default function Navbar() {
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <header className="navbar">
      <a href="#top" className="navbar__logo">
        {initials}
      </a>
      <a href={`mailto:${profile.email}`} className="navbar__email">
        {profile.email}
      </a>
      <nav className="navbar__links">
        {nav.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
