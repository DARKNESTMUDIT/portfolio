import { chromium } from 'playwright-core'
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1470, height: 920 } })
await page.goto('http://localhost:5199', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000)
const out = await page.evaluate(() => {
  const wrap = document.querySelector('.stage-wrap')
  const y = 0.99 * (wrap.offsetHeight - innerHeight)
  window.scrollTo({ top: y, behavior: 'instant' })
  return { targetY: y }
})
await page.waitForTimeout(1800)
const diag = await page.evaluate(() => {
  const wrap = document.querySelector('.stage-wrap')
  const sticky = document.querySelector('.stage-sticky')
  const canvas = document.querySelector('.stage-sticky canvas')
  const whatido = document.querySelector('.whatido')
  const pin = document.querySelector('.whatido__pin')
  const r = (el) => { const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height) } }
  return {
    scrollY: Math.round(scrollY),
    vh: innerHeight,
    wrapH: wrap.offsetHeight,
    wrapRect: r(wrap),
    stickyRect: r(sticky),
    canvasRect: r(canvas),
    whatidoH: whatido.offsetHeight,
    pinRect: r(pin),
    heroH: document.querySelector('.hero').offsetHeight,
    aboutH: document.querySelector('.about').offsetHeight,
  }
})
console.log(JSON.stringify(diag, null, 1))
await browser.close()
