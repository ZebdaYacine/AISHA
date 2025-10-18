export type CategorySlug =
  | "fashion-textiles"
  | "home-decor"
  | "gifts-souvenirs";

export interface CategoryInfo {
  slug: CategorySlug;
  title: string;
  tagline: string;
}

export interface CategoryProduct {
  id: string;
  categorySlug: CategorySlug;
  subcategories: string[];
  title: string;
  description: string;
  dimension?: string;
  price: number;
  stock: number;
  image: string;
  gallery: string[];
}

const greenSaharaKaftanImg = new URL(
  "../../../../../dist/aisha/textiles/product one/Green Sahara Kaftan.png",
  import.meta.url
).href;

const greenSaharaKaftanAltImg = new URL(
  "../../../../../dist/aisha/textiles/product one/Green Sahara Kafta.png",
  import.meta.url
).href;

const kabyleDressImg = new URL(
  "../../../../../dist/aisha/textiles/poduct two/Kabyle Black & Amber Dress.png",
  import.meta.url
).href;

const kabyleDressAltImg = new URL(
  "../../../../../dist/aisha/textiles/poduct two/Kabyle Black & Amber Dres.png",
  import.meta.url
).href;

const terracottaDressImg = new URL(
  "../../../../../dist/aisha/textiles/product three/traditionla home Dress.png",
  import.meta.url
).href;

const terracottaDressAltImg = new URL(
  "../../../../../dist/aisha/textiles/product three/traditional home dres.png",
  import.meta.url
).href;

const royalKaftanImg = new URL(
  "../../../../../dist/aisha/textiles/product four/jeba Royal Kafta.png",
  import.meta.url
).href;

const royalKaftanAltImg = new URL(
  "../../../../../dist/aisha/textiles/product four/jeba Royal Kaftan.jpeg",
  import.meta.url
).href;

const tuaregBenchImg = new URL(
  "../../../../../dist/aisha/home decor/product one/Tuareg Wooden Bench.png",
  import.meta.url
).href;

const geminiHomeSetImg = new URL(
  "../../../../../dist/aisha/home decor/product two/Gemini_Generated_Image_ja0jnlja0jnlja0j.png",
  import.meta.url
).href;

const andalusianVaseImg = new URL(
  "../../../../../dist/aisha/home decor/product three/Andalusian Blue Ceramic Vase.png",
  import.meta.url
).href;

const algerPaintingImg = new URL(
  "../../../../../dist/aisha/home decor/product four/Les Soirées d’Alger Painting.png",
  import.meta.url
).href;

const algerPaintingAltImg = new URL(
  "../../../../../dist/aisha/home decor/product four/Les Soirées d’Alger Paintin.png",
  import.meta.url
).href;

const pearlHamsaNecklaceImg = new URL(
  "../../../../../dist/aisha/gifts/product one/Pearl Hamsa Choker Necklace.jpg",
  import.meta.url
).href;

const pearlHamsaNecklaceAltImg = new URL(
  "../../../../../dist/aisha/gifts/product one/Pearl Hamsa Choker Necklac.png",
  import.meta.url
).href;

const berberPouchSetImg = new URL(
  "../../../../../dist/aisha/gifts/product two/Berber Red Pouch Set.png",
  import.meta.url
).href;

const berberPouchSetAltImg = new URL(
  "../../../../../dist/aisha/gifts/product two/Berber Red Pouch Se.png",
  import.meta.url
).href;

const amazighBraceletImg = new URL(
  "../../../../../dist/aisha/gifts/product three/Amazigh Silver Bracelet.jpg",
  import.meta.url
).href;

const goldenPearlNecklaceImg = new URL(
  "../../../../../dist/aisha/gifts/product four/Golden Charm Pearl Necklace.jpeg",
  import.meta.url
).href;

const goldenPearlNecklaceAltImg = new URL(
  "../../../../../dist/aisha/gifts/product four/Golden Charm Pearl Necklac.png",
  import.meta.url
).href;

const staticProducts: CategoryProduct[] = [
  {
    id: "fashion-textiles-green-sahara-kaftan",
    categorySlug: "fashion-textiles",
    subcategories: ["djellabas-kaftans", "embroidered-fabrics"],
    title: "Green Sahara Kaftan",
    description:
      "Flowing green kaftan with gold and black embroidery inspired by Saharan artistry. Perfect for both daily wear and events.",
    dimension: "One size (fits S–XL)",
    price: 98,
    stock: 9,
    image: greenSaharaKaftanImg,
    gallery: [greenSaharaKaftanImg, greenSaharaKaftanAltImg],
  },
  {
    id: "fashion-textiles-kabyle-black-amber-dress",
    categorySlug: "fashion-textiles",
    subcategories: ["djellabas-kaftans", "embroidered-fabrics"],
    title: "Kabyle Black & Amber Dress",
    description:
      "Traditional Kabyle-inspired dress with amber embroidery on soft black cotton. Comes with a matching waist belt.",
    dimension: "Available in S–XL",
    price: 122,
    stock: 12,
    image: kabyleDressImg,
    gallery: [kabyleDressImg, kabyleDressAltImg],
  },
  {
    id: "fashion-textiles-terracotta-amazigh-dress",
    categorySlug: "fashion-textiles",
    subcategories: ["djellabas-kaftans", "embroidered-fabrics"],
    title: "Terracotta Amazigh Dress",
    description:
      "Soft terracotta dress adorned with Amazigh geometric embroidery. Combines cultural craftsmanship with modern comfort.",
    dimension: "Available in M–XL",
    price: 60,
    stock: 10,
    image: terracottaDressImg,
    gallery: [terracottaDressImg, terracottaDressAltImg],
  },
  {
    id: "fashion-textiles-royal-gold-kaftan",
    categorySlug: "fashion-textiles",
    subcategories: ["djellabas-kaftans", "embroidered-fabrics"],
    title: "Royal Gold Kaftan",
    description:
      "Luxurious gold kaftan detailed with hand-applied embellishments for evening celebrations and ceremonies.",
    dimension: "Tailored fit (M–L)",
    price: 135,
    stock: 6,
    image: royalKaftanImg,
    gallery: [royalKaftanImg, royalKaftanAltImg],
  },
  {
    id: "home-decor-tuareg-wooden-bench",
    categorySlug: "home-decor",
    subcategories: ["halfa-baskets", "artisan-carpets"],
    title: "Tuareg Wooden Bench",
    description:
      "Authentic Tuareg bench handmade in wood and woven leather. Adds rustic charm to living rooms or terraces.",
    dimension: "85 cm (L) × 35 cm (W) × 40 cm (H)",
    price: 150,
    stock: 5,
    image: tuaregBenchImg,
    gallery: [tuaregBenchImg],
  },
  {
    id: "home-decor-nomad-lounge-set",
    categorySlug: "home-decor",
    subcategories: ["artisan-carpets", "lamps-copperware"],
    title: "Nomad Lounge Set",
    description:
      "Curated living-room decor set featuring earth-tone textiles and handcrafted accents to ground any modern interior.",
    dimension: "Fits standard 3-seater layout",
    price: 420,
    stock: 3,
    image: geminiHomeSetImg,
    gallery: [geminiHomeSetImg],
  },
  {
    id: "home-decor-andalusian-blue-vase",
    categorySlug: "home-decor",
    subcategories: ["poterie-ceramique"],
    title: "Andalusian Blue Ceramic Vase",
    description:
      "Handcrafted ceramic vase featuring Andalusian floral motifs in cobalt blue. A timeless accent piece for elegant interiors.",
    dimension: "35 cm (H) × 22 cm (W)",
    price: 55,
    stock: 7,
    image: andalusianVaseImg,
    gallery: [andalusianVaseImg],
  },
  {
    id: "home-decor-les-soirees-dalger",
    categorySlug: "home-decor",
    subcategories: ["sand-paintings"],
    title: "Les Soirées d’Alger Painting",
    description:
      "Original acrylic painting capturing the glow of Algiers nights. Layers of warm tones bring movement and nostalgia to the room.",
    dimension: "90 cm (H) × 70 cm (W)",
    price: 320,
    stock: 2,
    image: algerPaintingImg,
    gallery: [algerPaintingImg, algerPaintingAltImg],
  },
  {
    id: "gifts-souvenirs-pearl-hamsa-choker",
    categorySlug: "gifts-souvenirs",
    subcategories: ["local-art", "antique-replicas"],
    title: "Pearl Hamsa Choker Necklace",
    description:
      "Delicate freshwater pearl choker with a protective Hamsa charm, finished with gold-plated detailing.",
    dimension: "Adjustable 32–38 cm",
    price: 45,
    stock: 15,
    image: pearlHamsaNecklaceImg,
    gallery: [pearlHamsaNecklaceImg, pearlHamsaNecklaceAltImg],
  },
  {
    id: "gifts-souvenirs-berber-pouch-set",
    categorySlug: "gifts-souvenirs",
    subcategories: ["miniatures", "local-art"],
    title: "Berber Red Pouch Set",
    description:
      "Set of two pouches in rich red tones, inspired by Berber textiles. Perfect for organizing keepsakes or gifting.",
    dimension: "Large: 22 × 16 cm, Small: 18 × 12 cm",
    price: 35,
    stock: 18,
    image: berberPouchSetImg,
    gallery: [berberPouchSetImg, berberPouchSetAltImg],
  },
  {
    id: "gifts-souvenirs-amazigh-silver-bracelet",
    categorySlug: "gifts-souvenirs",
    subcategories: ["antique-replicas", "local-art"],
    title: "Amazigh Silver Bracelet",
    description:
      "Traditional Amazigh cuff bracelet crafted in silver, featuring hand-engraved motifs and a polished finish.",
    dimension: "Adjustable, fits 16–19 cm wrists",
    price: 62,
    stock: 10,
    image: amazighBraceletImg,
    gallery: [amazighBraceletImg],
  },
  {
    id: "gifts-souvenirs-golden-pearl-necklace",
    categorySlug: "gifts-souvenirs",
    subcategories: ["antique-replicas", "local-art"],
    title: "Golden Charm Pearl Necklace",
    description:
      "Statement necklace with luminous pearls and hammered gold charms—an heirloom-inspired piece for special occasions.",
    dimension: "Drop length 26 cm",
    price: 75,
    stock: 8,
    image: goldenPearlNecklaceImg,
    gallery: [goldenPearlNecklaceImg, goldenPearlNecklaceAltImg],
  },
];

const categoryInfoMap: Record<CategorySlug, CategoryInfo> = {
  "fashion-textiles": {
    slug: "fashion-textiles",
    title: "Fashion & Textiles",
    tagline: "Wearable artistry crafted by Algerian women.",
  },
  "home-decor": {
    slug: "home-decor",
    title: "Home & Decor",
    tagline: "Handmade decor to bring desert warmth indoors.",
  },
  "gifts-souvenirs": {
    slug: "gifts-souvenirs",
    title: "Gifts & Souvenirs",
    tagline: "Meaningful keepsakes inspired by Algerian heritage.",
  },
};

export function getCategoryInfo(slug?: string | null): CategoryInfo | null {
  if (!slug) {
    return null;
  }
  return categoryInfoMap[slug as CategorySlug] ?? null;
}

export function getCategoryProducts(
  categorySlug?: string | null,
  subcategorySlug?: string | null
): CategoryProduct[] {
  if (!categorySlug) {
    return [];
  }

  const normalized = categorySlug as CategorySlug;
  const products = staticProducts.filter(
    (product) => product.categorySlug === normalized
  );

  if (!subcategorySlug) {
    return products;
  }

  return products.filter((product) =>
    product.subcategories.includes(subcategorySlug)
  );
}

export function getStaticProductById(
  productId: string | undefined
): CategoryProduct | undefined {
  if (!productId) {
    return undefined;
  }
  return staticProducts.find((product) => product.id === productId);
}
