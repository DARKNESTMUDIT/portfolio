// Download free-licensed (Unsplash License) poster images per project,
// themed to the site's dark/purple aesthetic.
import { writeFile, mkdir } from 'node:fs/promises'

const OUT = 'public/assets/projects'
await mkdir(OUT, { recursive: true })

const wants = [
  { file: 'eyedropper.jpg', q: 'abstract 3d render purple gradient shapes dark' },
  { file: 'sift.jpg', q: 'prism light refraction dark purple crystal' },
  { file: 'wisprlocal.jpg', q: 'sound wave visualization dark purple audio' },
  { file: 'idea-miner.jpg', q: 'neural network nodes dark visualization glowing' },
  { file: 'dish2cart.jpg', q: 'neon glow dark futuristic grid abstract' },
  { file: 'goldbot.jpg', q: 'stock market chart dark screen trading glow' },
]

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
  Accept: 'application/json',
}

for (const w of wants) {
  try {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(w.q)}&per_page=10&orientation=landscape`
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) throw new Error(`search ${res.status}`)
    const data = await res.json()
    const results = (data.results ?? []).filter((r) => !r.premium && r.urls?.regular)
    if (!results.length) throw new Error('no results')
    // prefer darker images via listed dominant color
    results.sort((a, b) => {
      const lum = (hex) => {
        const h = (hex || '#888888').slice(1)
        return (
          parseInt(h.slice(0, 2), 16) * 0.3 +
          parseInt(h.slice(2, 4), 16) * 0.6 +
          parseInt(h.slice(4, 6), 16) * 0.1
        )
      }
      return lum(a.color) - lum(b.color)
    })
    const pick = results[0]
    const imgUrl = pick.urls.regular.replace('w=1080', 'w=1400')
    const img = await fetch(imgUrl, { headers: HEADERS })
    if (!img.ok) throw new Error(`img ${img.status}`)
    const buf = Buffer.from(await img.arrayBuffer())
    await writeFile(`${OUT}/${w.file}`, buf)
    console.log(`OK ${w.file}  ${(buf.length / 1024).toFixed(0)}KB  color=${pick.color}  by ${pick.user?.name ?? '?'}`)
  } catch (e) {
    console.log(`FAIL ${w.file}: ${e.message}`)
  }
}
