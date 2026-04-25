# DMCU Frontend

A cinematic landing-page frontend for DMCU built with Next.js App Router, Tailwind CSS, and Framer Motion.

## Stack

- Next.js App Router
- Tailwind CSS
- Framer Motion

## Folder Structure

```text
DMCU Frontend/
├── app/
├── components/
├── sections/
├── styles/
├── next.config.mjs
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## Included Sections

- Hero section with a dark cinematic presentation
- About section for the mythology + futuristic universe concept
- Static character cards with hover styling
- Timeline section for Phase 1, 2, and 3
- Trailer section with a YouTube embed
- Footer with Vedteix Technology branding
- Admin login page and dashboard for JWT-authenticated character management

## Run Locally

1. Open the frontend folder:

```powershell
cd "DMCU Frontend"
```

2. Install dependencies:

```powershell
npm install
```

3. Create a local environment file:

```powershell
Copy-Item .env.local.example .env.local
```

4. Make sure `NEXT_PUBLIC_API_URL` points to your backend server, for example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

5. Start the development server:

```powershell
npm run dev
```

6. Build for production:

```powershell
npm run build
```

## Notes

- The home page character section now fetches live data from `GET /api/characters`.
- Each card links to a dynamic profile page at `/character/[id]`.
- The admin panel lives at `/admin/login` and `/admin/dashboard`.
- Admin login uses `POST /api/auth/login`, then stores the JWT in browser storage for dashboard actions.
- Dashboard create, edit, and delete actions connect to the protected backend character APIs with multipart uploads.
- Character images are loaded from the backend upload URLs using `NEXT_PUBLIC_API_URL`.
- Replace the YouTube trailer ID in `sections/TrailerSection.jsx` with your official trailer when ready.
- The layout is fully component-based and responsive across mobile, tablet, and desktop sizes.
- Framer Motion powers the fade, slide, and scroll-triggered reveal animations.
