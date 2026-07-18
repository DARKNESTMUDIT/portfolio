// Drive the dev site in headless Chrome: real-time waits, per-section
// screenshots, console error capture.
import { chromium } from 'playwright-core'

const OUT = process.env.OUT_DIR
const URL = 'http://localhost:5199'

const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1470, height: 920 } })

const errors = []
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text().slice(0, 300))
})
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e).slice(0, 300)))

await page.goto(URL, { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000) // preloader + hero entrance
await page.screenshot({ path: `${OUT}/v_hero.png` })

// scroll through sections with Lenis-friendly wheel events
const sections = ['#about', '#career', '#work', '#tech', '#contact']
for (const sel of sections) {
  await page.evaluate((s) => {
    document.querySelector(s)?.scrollIntoView({ behavior: 'instant' })
  }, sel)
  await page.waitForTimeout(1800)
  await page.screenshot({ path: `${OUT}/v_${sel.slice(1)}.png` })
}

// mid-scroll inside the pinned work gallery
await page.evaluate(() => {
  const el = document.querySelector('#work')
  window.scrollTo(0, el.offsetTop + window.innerHeight * 1.2)
})
await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/v_work_mid.png` })

console.log('CONSOLE ERRORS (' + errors.length + '):')
for (const e of [...new Set(errors)].slice(0, 12)) console.log(' -', e)
await browser.close()
