# WC26 Streams — World Cup 2026 IPTV web app (full version)

Static app, no build step. Files: index.html, manifest.json, sw.js, icons.
Streams come from the full open-source iptv-org index (~10,000 channels):
https://iptv-org.github.io/iptv/index.m3u

## Features
- Full channel index with category + country filters, search, quick pills
- Live scores & match schedule board (World Cup 2026): Live/Today, Upcoming,
  and Results tabs with themed match cards, auto-refresh, and local kick-off times
- Favorites (star any channel) and Recently Watched — stored in your
  browser's localStorage, per device
- PWA: installable on phone/desktop home screen with app icon; the app
  shell loads offline (streams themselves always need a connection)
- HLS playback (hls.js), failed-stream marking, auto-skip, random channel
- Default channel (TVRI Sport HD) auto-loads muted on open

## Match data source & honest limitations
- Schedule + results come from the public-domain **openfootball/worldcup.json**
  dataset, served via the jsDelivr CDN (no API key, CORS-friendly, works from a
  static site). Falls back to raw.githubusercontent if the CDN is unreachable.
- This is a schedule-and-results feed, NOT a real-time in-play ticker. "LIVE"
  status is *inferred* from kick-off time (kickoff → ~2.5h window). Scores
  appear/refresh as the community updates the dataset, which can lag a match
  in progress. Tap Refresh for the latest; the board also auto-refreshes.
- A true second-by-second feed only comes from paid/authenticated football APIs
  (Sportmonks, TheStatsAPI, etc.), which require a server-side key and are not
  wired in (a key cannot be safely embedded in static client code).
- To change the data source, edit the SRC array in the MatchBoard module.

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
