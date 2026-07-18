import { chromium } from 'playwright-core'
const OUT = process.env.OUT_DIR
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1470, height: 920 } })
page.on('pageerror', (e) => console.log('PAGEERROR:', String(e).slice(0, 200)))
await page.goto('http://localhost:5199', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000)
await page.evaluate(() => document.querySelector('#tech')?.scrollIntoView({ behavior: 'instant' }))
await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/t_tech.png` })
const wrap = await page.evaluate(() => {
  const w = document.querySelector('.stage-wrap')
  window.scrollTo({ top: 0.95 * (w.offsetHeight - innerHeight), behavior: 'instant' })
})
await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/t_seated.png` })
console.log('done')
await browser.close()
