# Love Assembly — Zonal Headquarters Website

Official website for **Love Assembly**, a Zonal Headquarters under **The Redeemed Christian Church of God (RCCG)**.

This site provides information about Love Assembly's leadership, parishes, ministries, events, sermons, and blog content. It is **not** the official RCCG national website for information about RCCG globally, the General Overseer, Open Heavens, and national conventions, visitors are directed to [rccg.org](https://rccg.org).

---

## Tech Stack

- **React** + **TypeScript**
- **Vite** — build tool
- **TanStack Router** — routing
- **Tailwind CSS** — styling
- **shadcn/ui** — component library
- **Supabase** — backend, database, and auth

---

## Features

- Responsive, mobile-first design
- Hero section with rotating **event carousel**
- Pastor-in-Charge profile section
- Sermon archive (audio/video)
- Blog/devotionals with multi-author support
- Ministries & departments overview
- Parish directory
- Online giving integration (Paystack/Flutterwave)
- Prayer request & testimony submission
- Live stream embed
- Newsletter signup
- Admin/CMS panel for non-technical staff
- SEO optimized (meta tags, sitemap)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- A Supabase project (URL + anon key)

### Installation

```bash
git clone <repo-url>
cd love-assembly-website
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components (Hero, EventCarousel, PastorInCharge, etc.)
├── routes/           # TanStack Router route definitions
├── lib/              # Supabase client, utilities
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── assets/           # Images, icons
└── styles/           # Global Tailwind styles
```

---

## Database (Supabase)

Key tables:
- `events` — upcoming/past events (title, date, venue, image_url, description)
- `sermons` — sermon archive (title, speaker, date, media_url)
- `blog_posts` — blog/devotional content (title, author, category, content)
- `leadership` — pastor and exco profiles (name, title, photo_url, bio)
- `parishes` — parishes under the zone (name, address, contact)
- `prayer_requests` — submitted prayer requests
- `testimonies` — submitted testimonies

---

## Design Guidelines

- **Colors:** Deep royal blue (`#0A3D91`) and white/off-white (`#F8FAFC`), matching the Love Assembly logo. Gold/warm accent used sparingly (e.g. Give CTA).
- **Hero section:** Full-width background photo with blue gradient overlay.
- **Other sections:** Plain white/light-blue backgrounds, alternating with solid blue CTA blocks for rhythm.
- **Motion:** Subtle scroll-triggered fade/slide-ins, smooth carousel transitions, soft hover states. Kept calm and professional — no flashy animation.

---

## Deployment

This project can be deployed to any static hosting provider that supports Vite builds (e.g. Vercel, Netlify, or cPanel with SPA routing via `.htaccess`).

---

## License

© Love Assembly, RCCG. All rights reserved.
