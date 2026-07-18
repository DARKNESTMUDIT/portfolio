import { chromium } from 'playwright-core'
const OUT = process.env.OUT_DIR
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
page.on('pageerror', (e) => console.log('PAGEERROR:', String(e).slice(0, 200)))
await page.goto('http://localhost:5199', { waitUntil: 'domcontentloaded' })
await page.waitForTimeout(6000)
await page.screenshot({ path: `${OUT}/m_hero.png` })
await page.evaluate(() => document.querySelector('#about')?.scrollIntoView({ behavior: 'instant' }))
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/m_about.png` })
console.log('mobile shots done')
await browser.close()
