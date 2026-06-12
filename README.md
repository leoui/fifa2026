# WC26 Streams — World Cup 2026 IPTV web app (full version)

Static app, no build step. Files: index.html, manifest.json, sw.js, icons.
Streams come from the full open-source iptv-org index (~10,000 channels):
https://iptv-org.github.io/iptv/index.m3u

## Features
- Full channel index with category + country filters, search, quick pills
- Favorites (star any channel) and Recently Watched — stored in your
  browser's localStorage, per device
- PWA: installable on phone/desktop home screen with app icon; the app
  shell loads offline (streams themselves always need a connection)
- HLS playback (hls.js), failed-stream marking, auto-skip, random channel

## Deploy to Vercel (~2 minutes)

### Option A — Vercel CLI (fastest)
    npm i -g vercel
    cd fifa2026
    vercel --prod
Project name: `fifa2026`. If the name is free you get
https://fifa2026.vercel.app — if taken, Vercel assigns a variant.

### Option B — Git import
Push this folder to a GitHub repo, then on vercel.com: Add New -> Project ->
import. Framework preset "Other", no build command, output dir = root.

## Install as an app (after deploying)
- Android/Chrome: open the site -> browser menu -> "Install app" /
  "Add to Home screen"
- iOS/Safari: Share -> "Add to Home Screen"
- Desktop Chrome/Edge: install icon in the address bar

## Known limitations (data source, not bugs)
- Many public streams are offline, geo-blocked, or refuse browser playback
  (CORS). The app marks failures and can skip to the next channel.
- http:// streams cannot play on an HTTPS site (mixed-content block);
  filtered out by default.
- Favorites are keyed to channel IDs/URLs from the playlist; if iptv-org
  changes an entry, that favorite may stop matching.
- Favorites/recents do NOT persist in sandboxed previews (e.g. the Claude
  chat preview) — they persist normally on the deployed site and localhost.
- Broadcast rights for World Cup matches are licensed per country; whether a
  stream is authorized in your region varies by source. The app hosts no
  video content and uses no official FIFA marks.

## Updating the service worker
If you edit index.html later, bump the CACHE name in sw.js (wc26-v1 ->
wc26-v2) so installed clients pick up the new version.
