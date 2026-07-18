// Capture the scroll-driven avatar transition at several progress points.
import { chromium } from 'playwright-core'

const OUT = process.env.OUT_DIR
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1470, height: 920 } })
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)))
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e).slice(0, 200)))

await page.goto(process.env.SITE_URL || 'http://localhost:5199', {
  waitUntil: 'domcontentloaded',
})
await page.waitForTimeout(6000)

const fracs = (process.env.FRACS || '0,0.4,0.7,0.85,0.99').split(',').map(Number)
for (const frac of fracs) {
  await page.evaluate((f) => {
    const wrap = document.querySelector('.stage-wrap')
    const y = f * (wrap.offsetHeight - window.innerHeight)
    window.scrollTo({ top: y, behavior: 'instant' })
  }, frac)
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `${OUT}/s_${String(frac).replace('.', '')}.png` })
}

console.log('ERRORS(' + errors.length + '):')
for (const e of [...new Set(errors)].slice(0, 8)) console.log(' -', e)
await browser.close()
