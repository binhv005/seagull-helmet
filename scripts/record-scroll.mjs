// Records a smooth scroll-through video of the built site.
// Usage: npm run build && npm run video [-- --mobile] [-- --path=/san-pham]
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { preview } from 'vite'
import puppeteer from 'puppeteer-core'
import ffmpegPath from 'ffmpeg-static'

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)

const mobile = Boolean(args.mobile)
const path = args.path || '/'
const fps = 60
const speed = Number(args.speed) || (mobile ? 260 : 420) // CSS px per second
const holdTop = 2.5 // seconds to stay on the hero before scrolling
const holdBottom = 1.5
const viewport = mobile
  ? { width: 390, height: 693, deviceScaleFactor: 1080 / 390, isMobile: true, hasTouch: true }
  : { width: 1920, height: 1080, deviceScaleFactor: 1 }

const chromeCandidates = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
]
const executablePath = args.chrome || chromeCandidates.find(existsSync)
if (!executablePath) throw new Error('Chrome not found – pass --chrome=<path>')

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const server = await preview({ preview: { port: 4174, strictPort: false } })
const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '')

const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--hide-scrollbars'] })
const page = await browser.newPage()
await page.setViewport(viewport)
await page.goto(baseUrl + path, { waitUntil: 'networkidle0' })

// Warm up lazy images, then return to the top without smooth scrolling.
await page.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto'
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 40))
  }
  window.scrollTo(0, 0)
})
await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))))
await new Promise((r) => setTimeout(r, 800))

const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)
const scrollFrames = Math.round((maxScroll / speed) * fps)
const totalFrames = Math.round(holdTop * fps) + scrollFrames + Math.round(holdBottom * fps)

mkdirSync('video', { recursive: true })
const name = (path === '/' ? 'trang-chu' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-')) + (mobile ? '-mobile' : '-desktop')
const output = `video/${name}.mp4`

const ffmpeg = spawn(ffmpegPath, [
  '-y', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
  '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-movflags', '+faststart', output,
], { stdio: ['pipe', 'ignore', 'inherit'] })

console.log(`Recording ${baseUrl + path} → ${output} (${totalFrames} frames, ${(totalFrames / fps).toFixed(1)}s)`)

const holdTopFrames = Math.round(holdTop * fps)
for (let f = 0; f < totalFrames; f++) {
  const t = Math.min(1, Math.max(0, (f - holdTopFrames) / scrollFrames))
  const y = Math.round(ease(t) * maxScroll)
  await page.evaluate((top) => window.scrollTo(0, top), y)
  const frame = await page.screenshot({ type: 'jpeg', quality: 92 })
  if (!ffmpeg.stdin.write(frame)) await new Promise((r) => ffmpeg.stdin.once('drain', r))
  if (f % fps === 0) process.stdout.write(`\r  ${Math.round((f / totalFrames) * 100)}%`)
}

ffmpeg.stdin.end()
await new Promise((r) => ffmpeg.on('close', r))
await browser.close()
await new Promise((r) => server.httpServer.close(r))
console.log(`\r  100% – saved ${output}`)
