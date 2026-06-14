// Vercel serverless function — reports the visitor's country using Vercel's
// edge geolocation header. No API key, no external service, same-origin.
// On non-Vercel hosts (localhost, static preview) the header is absent and
// this returns an empty country, so the client falls back to browser language.
export default function handler(req, res) {
  const country =
    req.headers["x-vercel-ip-country"] ||
    req.headers["x-country"] ||
    "";
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ country: String(country).toUpperCase() });
}
