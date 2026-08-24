export const BRANDS = [
  {
    id: "supplefied",
    slug: "supplefied",
    name: "Supplefied",
    tagline: "Supplements. Simplified.",
    description: "Cold-filtered bioactive native whey isolates and high-performance clinical bioenergetics.",
    isBoltsFavourite: true,
    badgeText: "Bolt's Favourite",
    logo: "/images/brands/supplefied.svg",
    bannerImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2400&q=85",
    categories: ["proteins", "pre-workout", "creatine"],
  },
  {
    id: "surpsupps",
    slug: "surpsupps",
    name: "Surp Supps",
    tagline: "High-Performance Hardcore Nutrition & High-Stim Pre-Workouts",
    description: "Hardcore performance formulas engineered for intense power output and maximum pump.",
    isBoltsFavourite: false,
    badgeText: "Hardcore Formula",
    logo: "/images/brands/surpsupps.svg",
    bannerImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=85",
    categories: ["pre-workout", "proteins"],
  },
  {
    id: "dexlabz",
    slug: "dexlabz",
    name: "Dexlabz",
    tagline: "Clinical Research Grade Nootropics & Bio-Hacking Matrices",
    description: "Precision laboratory formulations designed for peak cognitive endurance and rapid recovery.",
    isBoltsFavourite: false,
    badgeText: "Clinical Grade",
    logo: "/images/brands/dexlabz.svg",
    bannerImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=2400&q=85",
    categories: ["recovery", "daily-health"],
  },
  {
    id: "creapure",
    slug: "creapure",
    name: "Creapure®",
    tagline: "German 99.99% Micronized Creatine Monohydrate",
    description: "The global gold standard in pure micronized ATP bioenergetics manufactured in Germany.",
    isBoltsFavourite: false,
    badgeText: "German Purity",
    logo: "/images/brands/creapure.svg",
    bannerImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=2400&q=85",
    categories: ["creatine"],
  }
];

export function getBrandBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().trim();
  return BRANDS.find((brand) => brand.slug.toLowerCase() === normalized || brand.id.toLowerCase() === normalized) || null;
}

export function getAllBrands() {
  return BRANDS;
}

export function getFeaturedBrands() {
  return BRANDS;
}
