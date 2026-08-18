# Deploy Traveler To Vercel (Fast Path)

This guide is tailored for this repository and gets you from local repo to live URL quickly.

## 1) Prerequisites

- GitHub repo connected and push access to `main`
- Vercel account
- Firebase project (only required if you want auth + Firestore instead of sample fallback data)

## 2) Import The Repo In Vercel

1. Open Vercel dashboard.
2. Click **Add New... -> Project**.
3. Import `Osamariyad2003/travler`.
4. Keep defaults:
   - Framework Preset: **Next.js**
   - Root Directory: repository root
   - Build Command: `next build`
   - Output Directory: blank/default

## 3) Add Environment Variables

In **Project -> Settings -> Environment Variables**, add these keys.

### Required For Full Production Features

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### Optional (Recommended)

- `UNSPLASH_ACCESS_KEY`
- `PEXELS_API_KEY`
- `OSRM_BASE_URL` (optional custom router, otherwise public OSRM is used)

Add each variable to **Production**, **Preview**, and **Development** for consistency.

## 4) Firebase Checklist (If Using Firebase)

1. In Firebase Console, enable **Authentication** providers you plan to use.
2. Create Firestore database.
3. Deploy rules and indexes from this repo:

```bash
npm install
npm run deploy:rules
```

4. Ensure your web app config values match the six `NEXT_PUBLIC_FIREBASE_*` variables exactly.

## 5) Trigger Deploy

1. In Vercel, click **Deploy** for initial deployment.
2. For later updates, push to `main` and Vercel auto-deploys.

## 6) Post-Deploy Smoke Test (2 Minutes)

Open your Vercel URL and verify:

1. Home page loads without 500 errors.
2. `/cities` renders map and city list.
3. `/templates` renders trip templates.
4. `/explore` loads and can open place details.
5. `/api/generate` responds for a city query (OSM-based, no key required).

Quick API check:

```bash
curl -X POST https://<your-domain>/api/generate \
  -H "Content-Type: application/json" \
  -d '{"query":"Amman","days":2,"travelStyle":"budget"}'
```

## 7) Common Fixes

### 404 on GitHub Pages

This app uses dynamic Next.js routes and API handlers. Deploy on Vercel, not GitHub Pages.

### Firebase Missing / Permission Errors

- Re-check all `NEXT_PUBLIC_FIREBASE_*` values.
- Confirm rules were deployed (`npm run deploy:rules`).
- Confirm authenticated user documents exist in `/users` if testing admin-only flows.

### No Photos / Hero Video

- Add `UNSPLASH_ACCESS_KEY` and `PEXELS_API_KEY`.
- Redeploy.

## 8) Security Notes

- Do not copy secrets from committed files. Use Vercel environment variables only.
- Rotate any key that has ever appeared in logs or chat transcripts.
- `NEXT_PUBLIC_*` values are public by design in browser bundles; security should rely on Firebase Auth + Firestore Rules.
