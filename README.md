# SNAPIT STUDIOZ — Motion-Driven Portfolio Website

An award-winning standard portfolio website for **SNAPIT STUDIOZ**, a premier video production company specializing in Ads Shoot, Reels Production, Short Films Making, and Video Editing based in Natham, Tamil Nadu.

---

## 🚀 Quick Start

```bash
# Navigate to project directory
cd c:\Users\user\Desktop\snapit_studio

# Install dependencies (if not already installed)
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎨 Brand Design System

| Token | CSS Variable | Hex Value | Usage |
|---|---|---|---|
| Deep Teal (Main BG) | `--deep` | `#10282c` | Primary canvas & root background |
| Mid Teal (Cards & Rows) | `--mid` | `#1b4348` | Surface containers, sections & cards |
| Teal Accent | `--teal` | `#6b9599` | Secondary text, borders & metadata |
| Studio Yellow | `--yellow` | `#f2d34f` | Primary accent, highlights & CTA fills |
| Cloud White | `--cloud` | `#eef0ee` | Display headlines & high-contrast text |

- **Display Typeface**: `Bricolage Grotesque` (500, 700, 800)
- **Body Typeface**: `DM Sans` (400, 500)
- **Fluid Sizing**: Implemented via CSS `clamp()` in `src/config/tokens.css`

---

## ⚙️ How to Tweak Animation Timings

All motion physics, durations, and easings are centralized in **one single file**:

📁 `src/config/motion.js`

```javascript
export const MOTION = {
  // Lenis smooth scroll inertia
  lenis: { lerp: 0.08, wheelMultiplier: 1 },

  // Preloader counter & iris aperture
  preloader: { duration: 2.5, iris: { duration: 1.1, ease: 'power4.inOut' } },

  // Hero headline mask stagger
  hero: { stagger: 0.12, duration: 0.9, ease: 'expo.out' },

  // Page circular wipe transition
  pageWipe: { out: 0.7, in: 0.6, ease: 'power4.inOut', flash: 0.3 },

  // Velocity-reactive marquee
  marquee: { baseSpeed: 1, skewFactor: 0.03 },

  // Standard ScrollTrigger reveals
  reveal: { duration: 0.9, ease: 'expo.out', stagger: 0.08 },

  // Magnetic button spring strength
  magnetic: { strength: 0.3, ease: 'power2.out' },
};
```
Change any duration, ease, or stagger here, and the entire website will update automatically.

---

## 📁 How to Update Content & Media

### 1. Replacing Projects
Edit `src/data/projects.js`:
- Add or modify projects with `title`, `client`, `category` (`'Video'` | `'Photo'` | `'Audio'`), `year`, `description`, `gradient`, and `services`.
- To attach real video/images: replace `thumbnail: null` with `thumbnail: '/images/your-photo.webp'` or video poster.

### 2. Replacing Services
Edit `src/data/services.js`:
- Update titles, descriptions, icons, and sub-service specialization pills.

### 3. Updating Studio Contact & Social Info
Edit `src/data/siteConfig.js`:
- `email`: Studio receiving email
- `phone`: Contact phone number
- `whatsapp`: WhatsApp number (country code + number without symbols)
- `instagram`: Instagram profile URL
- `location`: Studio city & region

### 4. Replacing Showreel Video & Logo
- **Logo**: Place your logo image at `public/logo.jpg`.
- **Showreel Video**: Place an MP4 or WebM showreel at `public/showreel.mp4`. The Hero and Showreel Expand sections will automatically detect and play it with audio mute and loop enabled.

---

## 🏗️ Architecture & Route Map

- `/` — **Home**: Full-screen showreel hero, velocity marquee, word-by-word scrub statement, pinned showreel expand, horizontal featured work scroll, oversized service rows, stacked process cards, counter statistics, BTS gallery, draggable testimonials carousel, clapper CTA + pinned footer.
- `/work` — **Selected Work**: Category-filtered grid (All, Video, Photo, Audio) with Framer Motion layout animations.
- `/work/:slug` — **Project Detail**: Full-width player banner, client credits, narrative breakdown, delivered services, and next-project interactive transition.
- `/services` — **Capabilities**: In-depth breakdowns of Video, Photography, and Audio, production roadmaps, and studio gear arsenal.
- `/about` — **The Studio**: Studio origins, philosophy, core team members, and the Three Principles.
- `/contact` — **Initiate Contact**: Real-time validated brief form, animated shutter confirmation, direct WhatsApp routing, and studio coordinates.

---

## ⚡ Performance & Accessibility
- **Target 60 FPS**: GSAP tickers synchronized with Lenis, strictly animating `transform`, `opacity`, and `clip-path`.
- **`prefers-reduced-motion`**: Automatically falls back to clean, static presentation for sensitive users.
- **Accessibility**: Skip links, ARIA labels, semantic landmark elements, and high-contrast yellow focus rings.
>>>>>>> fb55d54 (feat: complete Snapit Studioz cinematic website with custom clapperboard preloader)
