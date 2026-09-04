const fs = require('fs')
const path = require('path')

const cachePath = path.join(__dirname, '.cache/instagram', 'media_list.json')
if (fs.existsSync(cachePath)) {
  const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
  const data = cache.payload
  console.log("Total reels:", data.length)
  // Find the one with 19.6k views or 160k views
  for (const m of data) {
    if (m.insights?.plays > 15000 || m.insights?.plays > 100000) {
      console.log(`Reel ${m.id} - Date: ${m.timestamp} - Plays: ${m.insights?.plays}`)
    }
  }
}
