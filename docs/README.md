# hotel — Documentation

> Nuxt 2 legacy app. Serves hotel parking management under `/hotel/*`. Loaded by remix-host — does not own the layout or auth.

---

## Scope

Parking management portal for hotel facilities. Features include guest parking management, valet integration, room-linked parking, and reporting for hotel parking operators.

---

## How It Runs

### Dev
```bash
cd legacy/hotel
npm install
npm run dev
# → http://localhost:8004
```

Access via remix-host at `http://localhost:5173/hotel/...` (iframe mode).  
Or directly at `http://localhost:8004/hotel/...`.

### Build (Production)
```bash
# From repo root — do not build manually
bash bin/build-legacy.sh
# Select "hotel" when prompted
```

Output: `legacy/hotel/dist/hotel/__legacy/`

---

## Nuxt Config Key Points

```js
generate: {
  dir: "dist/hotel/__legacy",
  fallback: "index.html",
}
router: {
  base: "/hotel/",
}
build: {
  publicPath: "/__legacy/_nuxt/",
}
```

---

## Session / Auth

Reads from the shared browser cookie set by remix-host. No separate login flow.

---

## What to Touch / Not Touch

| Touch | Not Touch |
|-------|-----------|
| `pages/` — add/edit pages | `nuxt.config.js` — router base must stay `/hotel/` |
| `components/` — UI components | Build output config — mixer expects specific paths |
| `store/` — Vuex store | `.env.dev` / `.env.production` — set by DevOps |
| `assets/`, `static/` | Auth/cookie logic — owned by remix-host |

---

See [parent docs](../../docs/README.md) for full architecture and build pipeline.
