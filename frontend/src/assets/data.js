const imageSets = {
  tops: [
    "https://images.pexels.com/photos/1066171/pexels-photo-1066171.jpeg",
    "https://images.pexels.com/photos/37433145/pexels-photo-37433145.jpeg",
    "https://images.pexels.com/photos/31870834/pexels-photo-31870834.jpeg",
    "https://images.pexels.com/photos/33976561/pexels-photo-33976561.jpeg",
    "https://images.pexels.com/photos/9121191/pexels-photo-9121191.jpeg"
  ],
  whiteDresses: [
    "https://images.pexels.com/photos/4355257/pexels-photo-4355257.jpeg",
    "https://images.pexels.com/photos/10619446/pexels-photo-10619446.jpeg",
    "https://images.pexels.com/photos/35024256/pexels-photo-35024256.jpeg",
    "https://images.pexels.com/photos/32455016/pexels-photo-32455016.jpeg",
    "https://images.pexels.com/photos/12942612/pexels-photo-12942612.jpeg"
  ],
  sequinDresses: [
    "https://images.pexels.com/photos/2687766/pexels-photo-2687766.jpeg",
    "https://images.pexels.com/photos/17228223/pexels-photo-17228223.jpeg",
    "https://images.pexels.com/photos/32169141/pexels-photo-32169141.jpeg",
    "https://images.pexels.com/photos/10356436/pexels-photo-10356436.jpeg",
    "https://images.pexels.com/photos/33722978/pexels-photo-33722978.jpeg"
  ],
  longSleeveDresses: [
    "https://images.pexels.com/photos/10464307/pexels-photo-10464307.jpeg",
    "https://images.pexels.com/photos/19222076/pexels-photo-19222076.jpeg",
    "https://images.pexels.com/photos/13381503/pexels-photo-13381503.jpeg",
    "https://images.pexels.com/photos/25194063/pexels-photo-25194063.jpeg",
    "https://images.pexels.com/photos/8272072/pexels-photo-8272072.jpeg"
  ],
  kurtis: [
    "https://images.pexels.com/photos/7227990/pexels-photo-7227990.jpeg",
    "https://images.pexels.com/photos/12942613/pexels-photo-12942613.jpeg",
    "https://images.pexels.com/photos/27236801/pexels-photo-27236801.jpeg",
    "https://images.pexels.com/photos/16769685/pexels-photo-16769685.jpeg",
    "https://images.pexels.com/photos/1066171/pexels-photo-1066171.jpeg?auto=compress" // slight variation
  ],
  coordSets: [
    "https://images.pexels.com/photos/37433145/pexels-photo-37433145.jpeg?auto=compress",
    "https://images.pexels.com/photos/31870834/pexels-photo-31870834.jpeg?auto=compress",
    "https://images.pexels.com/photos/9121191/pexels-photo-9121191.jpeg?auto=compress",
    "https://images.pexels.com/photos/4355257/pexels-photo-4355257.jpeg?auto=compress",
    "https://images.pexels.com/photos/10619446/pexels-photo-10619446.jpeg?auto=compress"
  ],
  palazzos: [
    "https://images.pexels.com/photos/35024256/pexels-photo-35024256.jpeg?auto=compress",
    "https://images.pexels.com/photos/32455016/pexels-photo-32455016.jpeg?auto=compress",
    "https://images.pexels.com/photos/12942612/pexels-photo-12942612.jpeg?auto=compress",
    "https://images.pexels.com/photos/2687766/pexels-photo-2687766.jpeg?auto=compress",
    "https://images.pexels.com/photos/17228223/pexels-photo-17228223.jpeg?auto=compress"
  ],
  jumpsuits: [
    "https://images.pexels.com/photos/32169141/pexels-photo-32169141.jpeg?auto=compress",
    "https://images.pexels.com/photos/10356436/pexels-photo-10356436.jpeg?auto=compress",
    "https://images.pexels.com/photos/33722978/pexels-photo-33722978.jpeg?auto=compress",
    "https://images.pexels.com/photos/10464307/pexels-photo-10464307.jpeg?auto=compress",
    "https://images.pexels.com/photos/19222076/pexels-photo-19222076.jpeg?auto=compress"
  ],
  indianFusion: [
    "https://images.pexels.com/photos/13381503/pexels-photo-13381503.jpeg?auto=compress",
    "https://images.pexels.com/photos/25194063/pexels-photo-25194063.jpeg?auto=compress",
    "https://images.pexels.com/photos/8272072/pexels-photo-8272072.jpeg?auto=compress",
    "https://images.pexels.com/photos/7227990/pexels-photo-7227990.jpeg?auto=compress",
    "https://images.pexels.com/photos/12942613/pexels-photo-12942613.jpeg?auto=compress"
  ],
  loungewear: [
    "https://images.pexels.com/photos/27236801/pexels-photo-27236801.jpeg?auto=compress",
    "https://images.pexels.com/photos/16769685/pexels-photo-16769685.jpeg?auto=compress",
    "https://images.pexels.com/photos/33976561/pexels-photo-33976561.jpeg?auto=compress",
    "https://images.pexels.com/photos/10619446/pexels-photo-10619446.jpeg?auto=compress",
    "https://images.pexels.com/photos/35024256/pexels-photo-35024256.jpeg?auto=compress"
  ],
};

export const categories = [
  {
    slug: "tops",
    title: "Tops",
    image: imageSets.tops[0],
    name: "Tops",
    key: "tops",
    tags: ["Casual", "Western", "Everyday"],
    titlePrefix: ["Elegant", "Casual", "Classic", "Premium", "Modern", "Ribbed", "Cotton", "Oversized", "Slim Fit", "Designer"],
    subtypes: ["Crop Top", "Tank Top", "Peplum Top", "Off-Shoulder Top", "Halter Top"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Beige", hex: "#D4B896" },
      { name: "Pink", hex: "#F4A7B9" },
      { name: "Blue", hex: "#6CA0DC" },
      { name: "Lavender", hex: "#C9B1D9" },
      { name: "Olive", hex: "#7A8450" },
    ],
    description: "Crafted from premium-quality fabric for exceptional comfort and style. Designed with modern tailoring and elegant detailing, this piece is perfect for casual outings, workwear, and everyday wear. Soft, breathable, durable, and easy to pair with your favorite jeans, skirts, or palazzos.",
  },
  {
    slug: "white-dresses",
    title: "White Dresses",
    image: imageSets.whiteDresses[0],
    name: "White Dresses",
    key: "whiteDresses",
    tags: ["Dresses", "Occasion", "Western"],
    titlePrefix: ["Grace", "Ivory", "Lace", "Summer", "Elegant", "Vintage", "Princess", "Luxury", "Classic", "Floral"],
    subtypes: ["Maxi Dress", "Mini Dress", "Midi Dress", "Wrap Dress", "Shirt Dress"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Off-White", hex: "#F5F0E8" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Cream", hex: "#FFFDD0" },
    ],
    description: "Timeless white dresses crafted from breathable, premium fabric. Whether it's a beach getaway, a brunch date, or a summer soirée, these dresses bring effortless elegance to every occasion. Complete with delicate detailing and a flattering silhouette.",
  },
  {
    slug: "sequin-dresses",
    title: "Sequin Dresses",
    image: imageSets.sequinDresses[0],
    name: "Sequin Dresses",
    key: "sequinDresses",
    tags: ["Party Wear", "Festive", "Glam"],
    titlePrefix: ["Sparkle", "Glam", "Shimmer", "Luxury", "Night", "Party", "Diamond", "Golden", "Silver", "Premium"],
    subtypes: ["Mini Sequin Dress", "Bodycon Dress", "Slip Dress", "Maxi Sequin Dress", "Wrap Sequin Dress"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Gold", hex: "#D4AF37" },
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Champagne", hex: "#F7E7CE" },
    ],
    description: "Shine bright at every party, wedding, or festive celebration with our glamorous sequin dresses. Designed to dazzle from every angle with rich embellishments and a figure-flattering cut. Perfect for cocktail nights, receptions, and special events.",
  },
  {
    slug: "long-sleeve-dresses",
    title: "Long Sleeve Dresses",
    image: imageSets.longSleeveDresses[0],
    name: "Long Sleeve Dresses",
    key: "longSleeveDresses",
    tags: ["Winter", "Formal", "Casual"],
    titlePrefix: ["Autumn", "Winter", "Elegant", "Classic", "Premium", "Velvet", "Modern", "Grace", "Luxury", "Designer"],
    subtypes: ["Bodycon Dress", "Shift Dress", "Wrap Dress", "Shirt Dress", "Knit Dress"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Forest Green", hex: "#2D5A27" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Grey", hex: "#9E9E9E" },
    ],
    description: "Stay warm without compromising on style with our long sleeve dress collection. Tailored from cozy, high-quality fabrics perfect for cooler months, these dresses transition seamlessly from office to evening events.",
  },
  {
    slug: "kurtis",
    title: "Kurtis",
    image: imageSets.kurtis[0],
    name: "Kurtis",
    key: "kurtis",
    tags: ["Indian", "Ethnic", "Bestseller"],
    titlePrefix: ["Anarkali", "Straight", "A-Line", "Flared", "Printed", "Embroidered", "Chikankari", "Bandhani", "Block Print", "Lucknowi"],
    subtypes: ["Short Kurti", "Long Kurti", "Tunic Kurti", "Asymmetric Kurti", "High-Low Kurti"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Peach", hex: "#FFCBA4" },
      { name: "Mustard", hex: "#E1AD01" },
      { name: "Teal", hex: "#008080" },
      { name: "Rust", hex: "#B7410E" },
      { name: "Maroon", hex: "#800000" },
      { name: "Mint Green", hex: "#98FF98" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "White", hex: "#FFFFFF" },
    ],
    description: "Celebrate your Indian roots with our stunning kurti collection — from hand-crafted chikankari to vibrant block prints and intricate embroidery. Perfect for casual days, festive gatherings, or office wear. Pair with palazzos, leggings, or jeans for a complete look.",
  },
  {
    slug: "coord-sets",
    title: "Coord Sets",
    image: imageSets.coordSets[0],
    name: "Coord Sets",
    key: "coordSets",
    tags: ["Trending", "New", "Casual"],
    titlePrefix: ["Linen", "Cotton", "Printed", "Solid", "Tie-Dye", "Stripe", "Floral", "Boho", "Minimal", "Pastel"],
    subtypes: ["Top & Trouser Set", "Top & Skirt Set", "Blazer Co-ord", "Crop & Palazzo Set", "Shirt & Shorts Set"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Sage Green", hex: "#8FAF8B" },
      { name: "Dusty Pink", hex: "#DCB5A3" },
      { name: "Lavender", hex: "#C9B1D9" },
      { name: "Beige", hex: "#D4B896" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Terracotta", hex: "#C16B4A" },
    ],
    description: "Effortlessly put-together looks with our curated coord sets. Mix or match the top and bottom, or wear them together as a coordinated set for an instant style upgrade. Perfect for brunch, travel, casual outings, or relaxed office days.",
  },
  {
    slug: "palazzos",
    title: "Palazzos",
    image: imageSets.palazzos[0],
    name: "Palazzos",
    key: "palazzos",
    tags: ["Ethnic Fusion", "Comfortable", "Bestseller"],
    titlePrefix: ["Printed", "Solid", "Flared", "Georgette", "Crepe", "Silk", "Cotton", "Rayon", "Embroidered", "Bohemian"],
    subtypes: ["Wide Leg Palazzo", "Printed Palazzo", "Solid Palazzo", "Sharara Style", "Dhoti Palazzo"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Peach", hex: "#FFCBA4" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Maroon", hex: "#800000" },
      { name: "Mustard", hex: "#E1AD01" },
      { name: "Teal", hex: "#008080" },
      { name: "Olive", hex: "#7A8450" },
    ],
    description: "Breezy, beautiful, and ultra-comfortable — our palazzo collection is designed for the woman who values style and ease in equal measure. Pair with a kurti, crop top, or fitted blouse. Available in a wide range of prints, fabrics, and colors.",
  },
  {
    slug: "jumpsuits",
    title: "Jumpsuits",
    image: imageSets.jumpsuits[0],
    name: "Jumpsuits",
    key: "jumpsuits",
    tags: ["New", "Trendy", "Western"],
    titlePrefix: ["Belted", "Wide Leg", "Utility", "Floral", "Linen", "Denim", "Printed", "Minimal", "Boho", "Tailored"],
    subtypes: ["Wide Leg Jumpsuit", "Skinny Jumpsuit", "Halter Neck Jumpsuit", "Sleeveless Jumpsuit", "Off-Shoulder Jumpsuit"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#7A8450" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Beige", hex: "#D4B896" },
      { name: "Denim Blue", hex: "#5B7FA6" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Terracotta", hex: "#C16B4A" },
      { name: "Blush", hex: "#F5C5C5" },
    ],
    description: "One piece, complete look. Our jumpsuits are designed to be effortlessly chic for everything from weekend brunches to evening outings. Featuring flattering silhouettes, quality fabrics, and thoughtful detailing that makes dressing up feel effortless.",
  },
  {
    slug: "indian-fusion",
    title: "Indian Fusion",
    image: imageSets.indianFusion[0],
    name: "Indian Fusion",
    key: "indianFusion",
    tags: ["Festive", "New", "Trending"],
    titlePrefix: ["Mirror Work", "Gotta Patti", "Zari", "Phulkari", "Kutch", "Ikat", "Kalamkari", "Ajrakh", "Chanderi", "Organza"],
    subtypes: ["Fusion Kurta Set", "Dhoti Dress", "Jacket Kurti", "Cape Set", "Sharara Set"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Magenta", hex: "#FF00A6" },
      { name: "Cobalt Blue", hex: "#0047AB" },
      { name: "Emerald", hex: "#50C878" },
      { name: "Saffron", hex: "#F4A020" },
      { name: "Ruby Red", hex: "#9B111E" },
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Fuchsia", hex: "#FF1DCE" },
    ],
    description: "Where tradition meets contemporary style. Our Indian Fusion collection blends classic Indian craftsmanship — mirror work, zari embroidery, phulkari — with modern silhouettes. Perfect for festivals, weddings, mehendi ceremonies, and cultural events.",
  },
  {
    slug: "loungewear",
    title: "Loungewear",
    image: imageSets.loungewear[0],
    name: "Loungewear",
    key: "loungewear",
    tags: ["Comfortable", "New", "Casual"],
    titlePrefix: ["Cozy", "Cloud", "Soft", "Relaxed", "Weekend", "Lazy Day", "Pastel", "Fluffy", "Minimal", "Hygge"],
    subtypes: ["Pyjama Set", "Lounge Pants", "Oversized Tee", "Robe", "Hoodie Set"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Lilac", hex: "#C8A2C8" },
      { name: "Baby Pink", hex: "#F4C2C2" },
      { name: "Powder Blue", hex: "#B0D0E8" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Mint", hex: "#98FF98" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Blush", hex: "#F5C5C5" },
    ],
    description: "Wrap yourself in comfort with MiniMe's loungewear collection. Crafted from ultra-soft, breathable fabrics that feel like a hug. Perfect for lazy Sundays, work-from-home days, or winding down after a long day. Style meets comfort, always.",
  },
];

// Badge assignment logic
const getBadge = (index, category) => {
  const isBestseller = category.tags.includes("Bestseller");
  const isNew = category.tags.includes("New") || category.tags.includes("Trending");

  if (index === 0) return "Bestseller";
  if (index === 1 && isNew) return "New";
  if (index % 7 === 0) return "Bestseller";
  if (index % 5 === 0) return "New";
  if (index % 11 === 0) return "Trending";
  if (isBestseller && index % 3 === 0) return "Bestseller";
  if (isNew && index % 4 === 0) return "New";
  return null;
};

// Stock status generator
const getStockStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Only a Few Left";
  if (stock <= 15) return "Low Stock";
  return "In Stock";
};

// Realistic Indian price generator
const getPrice = (categoryName) => {
  const ranges = {
    "Tops": { min: 599, max: 2499 },
    "White Dresses": { min: 1299, max: 4999 },
    "Sequin Dresses": { min: 2499, max: 7999 },
    "Long Sleeve Dresses": { min: 1499, max: 4499 },
    "Kurtis": { min: 499, max: 2999 },
    "Coord Sets": { min: 1299, max: 4499 },
    "Palazzos": { min: 399, max: 1999 },
    "Jumpsuits": { min: 1199, max: 3999 },
    "Indian Fusion": { min: 1999, max: 8999 },
    "Loungewear": { min: 799, max: 2499 },
  };
  const r = ranges[categoryName] || { min: 999, max: 3999 };
  const price = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
  const discount = Math.floor(price * (0.6 + Math.random() * 0.25));
  return { price, discountPrice: discount };
};

const products = [];
let id = 1;

categories.forEach((category) => {
  for (let i = 0; i < 25; i++) {
    const prefix = category.titlePrefix[i % category.titlePrefix.length];
    const subtype = category.subtypes[i % category.subtypes.length];
    const { price, discountPrice } = getPrice(category.name);
    const badge = getBadge(i, category);
    const stock = Math.floor(Math.random() * 45); // 0–44

    products.push({
      id: id++,
      title: `${prefix} ${subtype}`,
      category: category.name,
      tags: category.tags,
      badge,
      price,
      discountPrice,
      discountPercent: Math.round(((price - discountPrice) / price) * 100),
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 400) + 20,
      stock,
      stockStatus: getStockStatus(stock),   // "In Stock" | "Low Stock" | "Only a Few Left" | "Out of Stock"
      featured: Math.random() > 0.7,
      sizes: category.sizes,
      colors: category.colors,             // [{ name: "White", hex: "#FFFFFF" }, ...]
      description: category.description,
      mainImage: imageSets[category.key][0],
      images: [
        imageSets[category.key][1],
        imageSets[category.key][2],
        imageSets[category.key][3],
        imageSets[category.key][4],
      ],
    });
  }
});

export default products;

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const getAllCategories = () => [
  "All",
  ...new Set(products.map((p) => p.category)),
];

export const getAllTags = () => [
  ...new Set(products.flatMap((p) => p.tags)),
];

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const getByBadge = (badge) =>
  products.filter((p) => p.badge === badge);

export const getNewArrivals = () => getByBadge("New");
export const getBestsellers = () => getByBadge("Bestseller");
export const getTrending = () => getByBadge("Trending");

export const getByCategory = (category) =>
  category === "All"
    ? products
    : products.filter((p) => p.category === category);

export const getByTag = (tag) =>
  products.filter((p) => p.tags.includes(tag));

export const getProductById = (id) =>
  products.find((p) => p.id === Number(id));

export const sortProducts = (list, sortBy) => {
  switch (sortBy) {
    case "price-asc":
      return [...list].sort((a, b) => a.discountPrice - b.discountPrice);
    case "price-desc":
      return [...list].sort((a, b) => b.discountPrice - a.discountPrice);
    case "rating":
      return [...list].sort((a, b) => b.rating - a.rating);
    case "discount":
      return [...list].sort((a, b) => b.discountPercent - a.discountPercent);
    case "reviews":
      return [...list].sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return list;
  }
};

export const searchProducts = (query) => {
  const q = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
};