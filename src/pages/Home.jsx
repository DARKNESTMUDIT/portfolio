import { useState, useCallback } from 'react'
import Preloader from '../components/Preloader.jsx'
import CustomCursor from '../components/CustomCursor.jsx'
import Navbar from '../components/Navbar.jsx'
import SocialRail from '../components/SocialRail.jsx'
import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import WhatIDo from '../sections/WhatIDo.jsx'
import AvatarStage from '../scenes/AvatarStage.jsx'
import Career from '../sections/Career.jsx'
import Work from '../sections/Work.jsx'
import TechStack from '../sections/TechStack.jsx'
import Footer from '../sections/Footer.jsx'
import { ScrollTrigger } from '../lib/gsap.js'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleDone = useCallback(() => {
    setLoaded(true)
    // Layout shifts once the overlay leaves — recalc pinned sections.
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  return (
    <div className="site">
      {!loaded && <Preloader onDone={handleDone} />}
      <CustomCursor />
      <Navbar />
      <SocialRail />
      <main>
        <div className="stage-wrap">
          <div className="stage-canvas" aria-hidden="true">
            <div className="stage-sticky">
              <AvatarStage />
            </div>
          </div>
          <Hero started={loaded} />
          <About />
          <WhatIDo />
        </div>
        <Career />
        <Work />
        <TechStack />
        <Footer />
      </main>
    </div>
  )
}
