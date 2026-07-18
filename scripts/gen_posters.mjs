// Generate themed AI poster images via pollinations.ai (free, keyless).
// Varied color palettes per project — all on dark backgrounds so they sit
// with the site, without everything reading purple.
import { writeFile, mkdir } from 'node:fs/promises'

const OUT = 'public/assets/projects'
await mkdir(OUT, { recursive: true })

const STYLE =
  ', dark near-black background, cinematic lighting, high detail digital art, moody, no text, no watermark'

const wants = [
  {
    file: 'eyedropper.jpg',
    p: 'floating translucent iridescent glass slabs and color swatch chips, teal cyan and warm amber accents, abstract design system',
  },
  {
    file: 'sift.jpg',
    p: 'glowing crystal prism splitting white light into a full rainbow spectrum over a faint grid of tiny photographs, cyan highlights',
  },
  {
    file: 'wisprlocal.jpg',
    p: 'flowing luminous audio waveform ribbons in emerald green and mint, sleek microphone silhouette',
  },
  {
    file: 'idea-miner.jpg',
    p: 'glowing neural network constellation of interconnected nodes, electric blue and cyan wires',
  },
  {
    file: 'dish2cart.jpg',
    p: 'fresh vegetables spices and herbs floating in mid-air, vivid natural reds greens and oranges, dramatic studio light',
  },
  {
    file: 'goldbot.jpg',
    p: 'holographic candlestick trading chart floating in dark space, warm golden amber glow, bars of light',
  },
]

for (const w of wants) {
  try {
    const prompt = encodeURIComponent(w.p + STYLE)
    const url = `https://image.pollinations.ai/prompt/${prompt}?width=1408&height=1056&nologo=true&model=flux&seed=11`
    const res = await fetch(url, { signal: AbortSignal.timeout(120000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 20000) throw new Error(`too small (${buf.length}b)`)
    await writeFile(`${OUT}/${w.file}`, buf)
    console.log(`OK ${w.file} ${(buf.length / 1024).toFixed(0)}KB`)
  } catch (e) {
    console.log(`FAIL ${w.file}: ${e.message}`)
  }
}
