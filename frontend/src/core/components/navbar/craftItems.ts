// craftItems.js
export const craftItems = [
  {
    label: "New In",
    path: "/new",
    menu: [
      { label: "This Week", path: "/new/this-week" },
      { label: "Trending Now", path: "/new/trending" },
      { label: "Just Restocked", path: "/new/restocked" },
      { label: "Seasonal Drops", path: "/new/seasonal" },
      { label: "Artisan Spotlight", path: "/new/spotlight" },
    ],
  },
  {
    label: "Shop by Category",
    path: "/category",
    menu: [
      {
        label: "Home & Decor",
        path: "/category/home-decor",
        submenu: [
          {
            label: "Poterie & Céramique",
            path: "/category/home-decor/poterie-ceramique",
          },
          {
            label: "Sand Paintings",
            path: "/category/home-decor/sand-paintings",
          },
          {
            label: "Artisan Carpets",
            path: "/category/home-decor/artisan-carpets",
          },
          {
            label: "Halfa Baskets",
            path: "/category/home-decor/halfa-baskets",
          },
          {
            label: "Lamps & Copperware",
            path: "/category/home-decor/lamps-copperware",
          },
        ],
      },
      {
        label: "Fashion & Textiles",
        path: "/category/fashion-textiles",
        submenu: [
          {
            label: "Djellabas & Kaftans",
            path: "/category/fashion-textiles/djellabas-kaftans",
          },
          {
            label: "Scarves & Shawls",
            path: "/category/fashion-textiles/scarves-shawls",
          },
          {
            label: "Embroidered Fabrics",
            path: "/category/fashion-textiles/embroidered-fabrics",
          },
          {
            label: "Traditional Hats",
            path: "/category/fashion-textiles/traditional-hats",
          },
        ],
      },
      {
        label: "Jewelry & Accessories",
        path: "/category/jewelry-accessories",
        submenu: [
          {
            label: "Silver Jewelry",
            path: "/category/jewelry-accessories/silver-jewelry",
          },
          {
            label: "Handcrafted Bags",
            path: "/category/jewelry-accessories/handcrafted-bags",
          },
          {
            label: "Belts & Small Leather Goods",
            path: "/category/jewelry-accessories/belts-leather-goods",
          },
        ],
      },
      {
        label: "Gifts & Souvenirs",
        path: "/category/gifts-souvenirs",
        submenu: [
          { label: "Miniatures", path: "/category/gifts-souvenirs/miniatures" },
          { label: "Local Art", path: "/category/gifts-souvenirs/local-art" },
          {
            label: "Musical Instruments",
            path: "/category/gifts-souvenirs/musical-instruments",
          },
          {
            label: "Antique Replicas",
            path: "/category/gifts-souvenirs/antique-replicas",
          },
        ],
      },
    ],
  },
  {
    label: "Shop by Artisan",
    path: "/artisan",
    menu: [
      { label: "Featured Artisans", path: "/artisan/featured" },
      { label: "Women Artisans", path: "/artisan/women" },
      {
        label: "Regional Collections",
        path: "/artisan/regions",
        submenu: [
          { label: "Kabyle", path: "/artisan/regions/kabyle" },
          { label: "Sahara", path: "/artisan/regions/sahara" },
          { label: "Tlemcen", path: "/artisan/regions/tlemcen" },
          { label: "Algiers", path: "/artisan/regions/algiers" },
          { label: "Touareg", path: "/artisan/regions/touareg" },
        ],
      },
      { label: "Become an AICHA Artisan", path: "/artisan/become" },
    ],
  },
  {
    label: "Custom Orders",
    path: "/custom",
    menu: [
      { label: "How It Works", path: "/custom/how" },
      { label: "Request a Custom Piece", path: "/custom/request" },
      { label: "Personalized Gifts", path: "/custom/gifts" },
      { label: "Portraits in Sand", path: "/custom/portraits" },
      { label: "Past Custom Projects", path: "/custom/past-projects" },
    ],
  },
  {
    label: "Collections ",
    path: "/collections",
    menu: [
      {
        label: "Ramadan / Eid / Festive Collection",
        path: "/collections/festive",
      },
      { label: "Eco-Friendly", path: "/collections/eco" },
      { label: "Made with Halfa", path: "/collections/halfa" },
      { label: "The Heritage Edit", path: "/collections/heritage" },
      { label: "Best of the South", path: "/collections/south" },
      { label: "Nomadic Influence", path: "/collections/nomadic" },
      { label: "Luxury Craft Collection", path: "/collections/luxury" },
    ],
  },
  {
    label: "Our Mission",
    path: "/mission",
    menu: [
      { label: "Our Story", path: "/mission/story" },
      { label: "Our Values", path: "/mission/values" },
      { label: "Crafting Culture Blog", path: "/mission/blog" },
      { label: "Testimonials", path: "/mission/testimonials" },
      { label: "FAQs", path: "/mission/faqs" },
      { label: "Contact Us", path: "/mission/contact" },
    ],
  },
];
