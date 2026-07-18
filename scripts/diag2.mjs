import { chromium } from 'playwright-core'
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 1470, height: 920 } })
await page.goto('http://localhost:5199', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000)
await page.evaluate(() => {
  const wrap = document.querySelector('.stage-wrap')
  window.scrollTo({ top: 0.99 * (wrap.offsetHeight - innerHeight), behavior: 'instant' })
})
await page.waitForTimeout(1800)
const d = await page.evaluate(() => ({ p: window.__stageP, scrollY: Math.round(scrollY) }))
console.log(JSON.stringify(d))
await browser.close()
