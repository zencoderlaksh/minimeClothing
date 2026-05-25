// data.jsx — MiniMe Product Data

const imageSets = {
  tops: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
  ],
  whiteDresses: [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
  ],
  sequinDresses: [
    "https://images.unsplash.com/photo-1506629905607-32d6d5b1e4f2?w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
  ],
  longSleeveDresses: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
  ],
  kurtis: [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
  ],
  coordSets: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800",
  ],
  palazzos: [
    "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    "https://images.unsplash.com/photo-1583497491-a4e11843e30c?w=800",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800",
    "https://images.unsplash.com/photo-1566479179817-f8b20fa2f23d?w=800",
  ],
  jumpsuits: [
    "https://images.unsplash.com/photo-1566479179817-f8b20fa2f23d?w=800",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
    "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
  ],
  indianFusion: [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800",
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800",
  ],
  loungewear: [
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800",
    "https://images.unsplash.com/photo-1583497491-a4e11843e30c?w=800",
    "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
  ],
};

const categories = [
  {
    name: "Tops",
    key: "tops",
    tags: ["Casual", "Western", "Everyday"],
    titlePrefix: ["Elegant", "Casual", "Classic", "Premium", "Modern", "Ribbed", "Cotton", "Oversized", "Slim Fit", "Designer"],
    subtypes: ["Crop Top", "Tank Top", "Peplum Top", "Off-Shoulder Top", "Halter Top"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Beige", "Pink", "Blue", "Lavender", "Olive"],
    description: "Crafted from premium-quality fabric for exceptional comfort and style. Designed with modern tailoring and elegant detailing, this piece is perfect for casual outings, workwear, and everyday wear. Soft, breathable, durable, and easy to pair with your favorite jeans, skirts, or palazzos.",
  },
  {
    name: "White Dresses",
    key: "whiteDresses",
    tags: ["Dresses", "Occasion", "Western"],
    titlePrefix: ["Grace", "Ivory", "Lace", "Summer", "Elegant", "Vintage", "Princess", "Luxury", "Classic", "Floral"],
    subtypes: ["Maxi Dress", "Mini Dress", "Midi Dress", "Wrap Dress", "Shirt Dress"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Off-White", "Ivory", "Cream"],
    description: "Timeless white dresses crafted from breathable, premium fabric. Whether it's a beach getaway, a brunch date, or a summer soirée, these dresses bring effortless elegance to every occasion. Complete with delicate detailing and a flattering silhouette.",
  },
  {
    name: "Sequin Dresses",
    key: "sequinDresses",
    tags: ["Party Wear", "Festive", "Glam"],
    titlePrefix: ["Sparkle", "Glam", "Shimmer", "Luxury", "Night", "Party", "Diamond", "Golden", "Silver", "Premium"],
    subtypes: ["Mini Sequin Dress", "Bodycon Dress", "Slip Dress", "Maxi Sequin Dress", "Wrap Sequin Dress"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Gold", "Silver", "Black", "Rose Gold", "Champagne"],
    description: "Shine bright at every party, wedding, or festive celebration with our glamorous sequin dresses. Designed to dazzle from every angle with rich embellishments and a figure-flattering cut. Perfect for cocktail nights, receptions, and special events.",
  },
  {
    name: "Long Sleeve Dresses",
    key: "longSleeveDresses",
    tags: ["Winter", "Formal", "Casual"],
    titlePrefix: ["Autumn", "Winter", "Elegant", "Classic", "Premium", "Velvet", "Modern", "Grace", "Luxury", "Designer"],
    subtypes: ["Bodycon Dress", "Shift Dress", "Wrap Dress", "Shirt Dress", "Knit Dress"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Burgundy", "Forest Green", "Camel", "Grey"],
    description: "Stay warm without compromising on style with our long sleeve dress collection. Tailored from cozy, high-quality fabrics perfect for cooler months, these dresses transition seamlessly from office to evening events.",
  },
  {
    name: "Kurtis",
    key: "kurtis",
    tags: ["Indian", "Ethnic", "Bestseller"],
    titlePrefix: ["Anarkali", "Straight", "A-Line", "Flared", "Printed", "Embroidered", "Chikankari", "Bandhani", "Block Print", "Lucknowi"],
    subtypes: ["Short Kurti", "Long Kurti", "Tunic Kurti", "Asymmetric Kurti", "High-Low Kurti"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Peach", "Mustard", "Teal", "Rust", "Maroon", "Mint Green", "Sky Blue", "White"],
    description: "Celebrate your Indian roots with our stunning kurti collection — from hand-crafted chikankari to vibrant block prints and intricate embroidery. Perfect for casual days, festive gatherings, or office wear. Pair with palazzos, leggings, or jeans for a complete look.",
  },
  {
    name: "Coord Sets",
    key: "coordSets",
    tags: ["Trending", "New", "Casual"],
    titlePrefix: ["Linen", "Cotton", "Printed", "Solid", "Tie-Dye", "Stripe", "Floral", "Boho", "Minimal", "Pastel"],
    subtypes: ["Top & Trouser Set", "Top & Skirt Set", "Blazer Co-ord", "Crop & Palazzo Set", "Shirt & Shorts Set"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Sage Green", "Dusty Pink", "Lavender", "Beige", "White", "Sky Blue", "Terracotta"],
    description: "Effortlessly put-together looks with our curated coord sets. Mix or match the top and bottom, or wear them together as a coordinated set for an instant style upgrade. Perfect for brunch, travel, casual outings, or relaxed office days.",
  },
  {
    name: "Palazzos",
    key: "palazzos",
    tags: ["Ethnic Fusion", "Comfortable", "Bestseller"],
    titlePrefix: ["Printed", "Solid", "Flared", "Georgette", "Crepe", "Silk", "Cotton", "Rayon", "Embroidered", "Bohemian"],
    subtypes: ["Wide Leg Palazzo", "Printed Palazzo", "Solid Palazzo", "Sharara Style", "Dhoti Palazzo"],
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Black", "White", "Peach", "Navy", "Maroon", "Mustard", "Teal", "Olive"],
    description: "Breezy, beautiful, and ultra-comfortable — our palazzo collection is designed for the woman who values style and ease in equal measure. Pair with a kurti, crop top, or fitted blouse. Available in a wide range of prints, fabrics, and colors.",
  },
  {
    name: "Jumpsuits",
    key: "jumpsuits",
    tags: ["New", "Trendy", "Western"],
    titlePrefix: ["Belted", "Wide Leg", "Utility", "Floral", "Linen", "Denim", "Printed", "Minimal", "Boho", "Tailored"],
    subtypes: ["Wide Leg Jumpsuit", "Skinny Jumpsuit", "Halter Neck Jumpsuit", "Sleeveless Jumpsuit", "Off-Shoulder Jumpsuit"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Olive", "Black", "Beige", "Denim Blue", "White", "Terracotta", "Blush"],
    description: "One piece, complete look. Our jumpsuits are designed to be effortlessly chic for everything from weekend brunches to evening outings. Featuring flattering silhouettes, quality fabrics, and thoughtful detailing that makes dressing up feel effortless.",
  },
  {
    name: "Indian Fusion",
    key: "indianFusion",
    tags: ["Festive", "New", "Trending"],
    titlePrefix: ["Mirror Work", "Gotta Patti", "Zari", "Phulkari", "Kutch", "Ikat", "Kalamkari", "Ajrakh", "Chanderi", "Organza"],
    subtypes: ["Fusion Kurta Set", "Dhoti Dress", "Jacket Kurti", "Cape Set", "Sharara Set"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Magenta", "Cobalt Blue", "Emerald", "Saffron", "Ruby Red", "Ivory", "Fuchsia"],
    description: "Where tradition meets contemporary style. Our Indian Fusion collection blends classic Indian craftsmanship — mirror work, zari embroidery, phulkari — with modern silhouettes. Perfect for festivals, weddings, mehendi ceremonies, and cultural events.",
  },
  {
    name: "Loungewear",
    key: "loungewear",
    tags: ["Comfortable", "New", "Casual"],
    titlePrefix: ["Cozy", "Cloud", "Soft", "Relaxed", "Weekend", "Lazy Day", "Pastel", "Fluffy", "Minimal", "Hygge"],
    subtypes: ["Pyjama Set", "Lounge Pants", "Oversized Tee", "Robe", "Hoodie Set"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Lilac", "Baby Pink", "Powder Blue", "Cream", "Mint", "Charcoal", "Blush"],
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
  const discount = Math.floor(price * (0.6 + Math.random() * 0.25)); // 25–40% off
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

    products.push({
      id: id++,
      title: `${prefix} ${subtype}`,
      category: category.name,
      tags: category.tags,
      badge,                           // "New" | "Bestseller" | "Trending" | null
      price,
      discountPrice,
      discountPercent: Math.round(((price - discountPrice) / price) * 100),
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 400) + 20,
      stock: Math.floor(Math.random() * 40) + 5,
      featured: Math.random() > 0.7,
      sizes: category.sizes,
      colors: category.colors,
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

/** Get all unique category names */
export const getAllCategories = () => [
  "All",
  ...new Set(products.map((p) => p.category)),
];

/** Get all unique tags across products */
export const getAllTags = () => [
  ...new Set(products.flatMap((p) => p.tags)),
];

/** Get featured products */
export const getFeaturedProducts = () => products.filter((p) => p.featured);

/** Get products with a specific badge */
export const getByBadge = (badge) =>
  products.filter((p) => p.badge === badge);

/** Get new arrivals */
export const getNewArrivals = () => getByBadge("New");

/** Get bestsellers */
export const getBestsellers = () => getByBadge("Bestseller");

/** Get trending products */
export const getTrending = () => getByBadge("Trending");

/** Filter by category */
export const getByCategory = (category) =>
  category === "All"
    ? products
    : products.filter((p) => p.category === category);

/** Filter by tag */
export const getByTag = (tag) =>
  products.filter((p) => p.tags.includes(tag));

/** Get product by ID */
export const getProductById = (id) =>
  products.find((p) => p.id === Number(id));

/** Sort products */
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

/** Search products by title or category */
export const searchProducts = (query) => {
  const q = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
};