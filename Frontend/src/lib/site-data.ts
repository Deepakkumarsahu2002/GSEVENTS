// Import images from src/assets so the bundler includes them
import heroEvent from "@/assets/hero-event.jpg";
import serviceWedding from "@/assets/service-wedding.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceParty from "@/assets/service-party.png";
import serviceCatering from "@/assets/service-catering.png";
import galleryDecor from "@/assets/gallery-decor.jpg";
import galleryFood from "@/assets/gallery-food.jpg";
import galleryWedding from "@/assets/gallery-wedding.jpg";
import founder from "@/assets/founder.png";
import team from "@/assets/team.png";
import team2 from "@/assets/team-2.png";
import team3 from "@/assets/team-3.jpeg";
import team4 from "@/assets/team-4.jpeg";
import serviceThreadCeremony from "@/assets/service-thread-ceremony.png";
import serviceHouseWarming from "@/assets/service-house-warming.png";
import serviceAllDecorations from "@/assets/service-all-decorations.png";
import cateringBuffet from "@/assets/catering-buffet.png";
import cateringPlated from "@/assets/catering-plated.png";
import cateringLiveCounters from "@/assets/catering-live-counters.jpeg";

export const brand = {
  name: "GS Events & Catering",
  tagline: "Crafting Unforgettable Celebrations",
  phone: "+91 99370 78889",
  whatsapp: "917978512963",
  email: "rozexeventmanagement@gmail.com",
  instagram: "gs_events_catering",
  instagramUrl: "https://www.instagram.com/gs_events_catering/",
  facebookUrl: "https://www.facebook.com/",
  address: "Gandhi Nagar 5th Lane, near Prasanti Clinic, Brahmapur-760001",
  hours: [
    { day: "Monday – Friday", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
};

export const images = {
  heroEvent,
  serviceWedding,
  serviceCorporate,
  serviceParty,
  serviceCatering,
  galleryDecor,
  galleryFood,
  galleryWedding,
  founder,
  team,
  team2,
  team3,
  team4,
  serviceThreadCeremony,
  serviceHouseWarming,
  serviceAllDecorations,
  cateringBuffet,
  cateringPlated,
  cateringLiveCounters,
};

export const stats = [
  { value: "500+", label: "Events Curated" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Signature Menus" },
  { value: "100%", label: "Client Satisfaction" },
];

export type ServiceCard = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
};

export const servicePreview: ServiceCard[] = [
  {
    slug: "weddings",
    title: "Weddings",
    blurb:
      "From haldi to reception — full design, decor and hospitality for multi-day celebrations.",
    image: serviceWedding,
  },
  {
    slug: "corporate",
    title: "Corporate Events",
    blurb: "Conferences, product launches and award nights delivered with precision.",
    image: serviceCorporate,
  },
  {
    slug: "private",
    title: "Private Parties",
    blurb: "Birthdays, anniversaries and intimate soirées styled down to the last candle.",
    image: serviceParty,
  },
  {
    slug: "catering",
    title: "Catering Only",
    blurb: "Bespoke menus, live counters and plated service for any venue you choose.",
    image: serviceCatering,
  },
];

export const testimonials = [
  {
    quote:
      "Every detail of our three-day wedding felt considered — the mandap, the menu, the timing. Guests still talk about the live chaat counter.",
    author: "Ananya & Rohit",
    meta: "Wedding, Falaknuma Palace",
  },
  {
    quote:
      "They handled a 700-guest annual gala without a single hiccup. Calm, precise and genuinely warm to work with.",
    author: "Priya Menon",
    meta: "Head of Brand, Novira Group",
  },
];

/** Admin-managed reels list (GET /api/reels). */
export type Reel = {
  id: string;
  url: string;
  caption?: string;
  priority: number;
  active: boolean;
  thumbnail?: string;
};

export type GalleryCategory = "ALL" | "WEDDING" | "CATERING" | "EVENTS" | "DECORATION";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
};

const pool: Array<[string, GalleryCategory, string]> = [
  [galleryWedding, "WEDDING", "Traditional Indian couple portrait against a floral backdrop"],
  [serviceWedding, "DECORATION", "Ivory drapes and floral aisle for a wedding ceremony"],
  [galleryFood, "CATERING", "Indian wedding buffet served in brass vessels"],
  [galleryDecor, "DECORATION", "Gold cutlery and white roses on an ivory tablescape"],
  [serviceCorporate, "EVENTS", "Corporate gala dinner ballroom with round tables"],
  [serviceCatering, "CATERING", "Chef plating appetisers at a live catering counter"],
  [serviceParty, "WEDDING", "Candlelit terrace table set for an intimate celebration"],
  [heroEvent, "WEDDING", "Outdoor wedding reception lit by candles at dusk"],
];

export const photos: Photo[] = [];

export const whyUs = [
  {
    title: "15 Years of Craft",
    body: "Over 500 celebrations designed and delivered across South India.",
  },
  {
    title: "Ingredient Integrity",
    body: "Seasonal produce, single-source spices and in-house prepared bases.",
  },
  {
    title: "Custom Menus",
    body: "Every menu is written for your family, not pulled from a catalogue.",
  },
  {
    title: "On-Time Execution",
    body: "Minute-level run sheets and a dedicated captain for each service zone.",
  },
];
