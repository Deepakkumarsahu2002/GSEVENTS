# Gilded Celebrations

Build a luxury event management and catering website with a React + TypeScript + 

Tailwind CSS frontend. The aesthetic should be elegant, minimal, and premium — 

similar to high-end wedding/event portfolio sites, using warm ivory tones with 

gold accents.

## COLOR THEME

- Background: #F7F3EC (warm ivory)

- Primary accent: #A67C3D (deep gold/bronze) — used for headings, numbers, borders, icons

- Secondary accent: #5C2A2A (rich maroon/wine) — used for CTA buttons and highlights

- Body text: #3D3D3D (charcoal slate)

- Muted text/labels: #8C8378 (warm grey)

- Dark section background: #2B1F17 (deep espresso brown) — for footer or contrast sections

- Typography: Elegant serif font for headings/numbers (e.g. Playfair Display), 

  clean sans-serif for body text (e.g. Inter or Lato). Generous white space, 

  minimal borders, soft shadows.

## PAGES & STRUCTURE

### 1. Home Page

- Full-width hero section with a background image and overlay tagline text 

  (e.g. "Crafting Unforgettable Celebrations")

- Short intro paragraph below hero

- Stats bar with 4 items in serif gold numbers: "500+ Events", "15+ Years Exp.", 

  "50+ Menus", "100% Satisfaction"

- Services preview: 4 cards (Weddings, Corporate Events, Private Parties, 

  Catering Only) each with an icon/image, short description, and "Learn More" link

- Instagram Reels slider section (placed BEFORE the gallery preview): 

  a horizontal carousel showing 3-4 reels side by side on desktop and 1.2 

  visible on mobile, swipeable, using official Instagram embed (full native 

  player with likes/comments visible). Section heading: "Follow Our Journey" 

  with Instagram handle link. Reels data should be fetched dynamically from 

  a backend API (not hardcoded), pulled from the admin-managed reels list, 

  ordered by a priority field, and filtered to show only active reels.

- Featured gallery preview: 6-8 image grid with a "View Full Gallery" button 

  linking to the Gallery page

- Testimonial snippet: 1-2 client reviews in a clean card layout

- Final CTA section: "Plan Your Event" button linking to Contact page

### 2. About Page

- Founder/team story section with image and narrative text

- Mission/approach statement

- Team photo gallery (chef, event planners, etc.)

- "Why Choose Us" section with 4 points (experience, quality ingredients, 

  custom menus, on-time execution) as icon cards

- Optional certifications/awards section

### 3. Services Page

- Service categories as cards/sections: Wedding Events, thread ceremony, baby shower, house warming, Corporate Events, all decorations

  Birthday/Private Parties,detailed services details for  Catering  (buffet, plated, live counters) cause catering is important among all service

- Each service has image, description, and "Enquire Now" button linking to Contact

- Optional package tiers section (Basic/Premium/Luxury) showing what's included 

  in each tier

- Menu highlights section: cuisine types (North Indian, Continental, etc.) 

  with veg/non-veg indicators

### 4. Gallery Page

- Filterable photo grid with category tabs: All / Weddings / Corporate / 

  Food / Decor

- Lightbox modal on image click (full-size view with next/prev navigation)

- Pagination or "Load More" button for large photo sets

- Images fetched dynamically from backend API (uploaded via admin panel), 

  not hardcoded

### 5. Contact Page

- Contact form with fields: Name, Phone Number, Event Date, Event Type 

  (dropdown: Wedding/Corporate/Birthday/Other), Message

- Form submission saves to backend and/or sends email notification

- Click-to-call phone button and WhatsApp click-to-chat button

- Email address display

- Physical address with embedded Google Map

- Social media icons (Instagram, Facebook) linking to profiles

- Business hours display

## ADMIN PANEL (Hidden, Non-Indexed Route)

- Admin route accessible via a small, subtle, non-obvious link placed in the 

  website footer (e.g. a tiny dot or icon, not labeled "Admin")

- Route path should be a non-guessable slug (not /admin or /login), and the 

  route should be excluded from robots.txt / sitemap so it doesn't get indexed 

  by search engines

- Login page with email/password authentication (JWT-based)

- After login, admin dashboard with two main sections:

  

  1. Photo Management:

     - Upload new photos with category assignment (Weddings/Corporate/Food/Decor)

     - View all uploaded photos in a grid with delete option

     - Images should be stored via Cloudinary integration

  

  2. Instagram Reels Management:

     - Form to add a new reel: Instagram Reel URL (validate it contains 

       "instagram.com/reel/"), optional caption, and order/priority number

     - List view of all added reels with edit, delete, and active/inactive 

       toggle options

     - Reordering capability (drag-and-drop or numeric priority field) to 

       control the sequence shown in the homepage slider

## TECHNICAL REQUIREMENTS

- Frontend: React with TypeScript, Tailwind CSS for styling

- Backend: Node.js with Express, MongoDB for data storage

- Image hosting: Cloudinary for all photo uploads (gallery and future use)

- Authentication: JWT-based auth for admin panel only, public pages need no login

- API structure needed:

  - POST /api/admin/reels (protected) — add new reel

  - PUT /api/admin/reels/:id (protected) — edit/reorder/toggle active

  - DELETE /api/admin/reels/:id (protected) — delete reel

  - GET /api/reels — public, returns active reels ordered by priority

  - POST /api/admin/photos (protected) — upload photo with category

  - DELETE /api/admin/photos/:id (protected) — delete photo

  - GET /api/photos?category=xyz — public, returns photos filtered by category

  - POST /api/contact — public, saves contact form submission

- Instagram reel embeds must use Instagram's official embed script 

  (instagram.com/embed.js) with blockquote embed method for full native player 

  functionality, with lazy-loading for performance and a fallback UI if the 

  embed fails to load

- Fully responsive design — mobile-first approach, test on mobile, tablet, 

  and desktop breakpoints

- Fast loading, optimized images, smooth scroll animations, subtle fade-in 

  transitions on scroll for sections

for now build the frontend only

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/87578df7-50c2-4aba-92e1-990bbd969a57).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
