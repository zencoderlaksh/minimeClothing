import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../stores/useWishlistStore";

const badgeConfig = {
  New: {
    label: "New",
    bg: "bg-[#1A1A2E]",
    text: "text-white",
  },
  Bestseller: {
    label: "Bestseller",
    bg: "bg-[#C9A66B]",
    text: "text-white",
  },
  Trending: {
    label: "Trending",
    bg: "bg-[#e11d48]",
    text: "text-white",
  },
};

const Card = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const badge = product.badge ? badgeConfig[product.badge] : null;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-[#f7f3ee] cursor-pointer">

        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          className="
            absolute top-4 right-4 z-30
            h-10 w-10 rounded-full
            bg-white/90 backdrop-blur-md
            flex items-center justify-center
            shadow-md transition-all duration-300
            hover:scale-110 cursor-pointer
          "
        >
          <Heart
            size={18}
            fill={wishlisted ? "#ef4444" : "transparent"}
            stroke={wishlisted ? "#ef4444" : "#222"}
          />
        </button>

        {/* Main Image */}
        <img
          src={product.mainImage}
          alt={product.title}
          className="
            w-full aspect-[3/4] object-cover
            transition-all duration-700 ease-out
            group-hover:scale-110 group-hover:opacity-0
          "
        />

        {/* Hover Image */}
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.title}
            className="
              absolute inset-0 w-full h-full object-cover
              opacity-0 scale-125
              transition-all duration-700 ease-out
              group-hover:opacity-100 group-hover:scale-100
            "
          />
        )}

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/70 via-black/20 to-transparent
            opacity-0 transition-all duration-500
            group-hover:opacity-100
          "
        />

        {/* PRODUCT INFO */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3
            className="
              text-white text-xl md:text-2xl font-light tracking-wide
              translate-y-16 opacity-0 transition-all duration-500
              group-hover:translate-y-0 group-hover:opacity-100
            "
          >
            {product.title}
          </h3>

          <div
            className="
              flex items-center justify-between mt-3
              translate-y-16 opacity-0 transition-all duration-700 delay-100
              group-hover:translate-y-0 group-hover:opacity-100
            "
          >
            <div className="flex items-center gap-2">
              <span className="text-white/90 text-lg">
                ₹{product.discountPrice.toLocaleString()}
              </span>
              {product.price && product.price !== product.discountPrice && (
                <span className="text-white/50 text-sm line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <span className="text-white text-2xl transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>

        {/* DYNAMIC BADGE */}
        {badge && (
          <div
            className={`
              absolute top-4 left-4 z-20
              ${badge.bg} ${badge.text}
              px-3 py-1
              text-[10px] uppercase tracking-[0.25em]
              font-medium
            `}
          >
            {badge.label}
          </div>
        )}

        {/* DISCOUNT % PILL */}
        {product.discountPercent && (
          <div
            className="
              absolute bottom-4 left-4 z-20
              bg-white/90 backdrop-blur-sm
              px-2 py-0.5
              text-[10px] font-semibold
              text-[#6b5c4f] tracking-wide
              opacity-100 group-hover:opacity-0
              transition-opacity duration-300
            "
          >
            {product.discountPercent}% OFF
          </div>
        )}

      </div>

      {/* BELOW-IMAGE INFO */}
      <div className="pt-3 px-1">
        <p className="text-[13px] text-[#6b5c4f] truncate">{product.title}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-[#1a1a1a]">
              ₹{product.discountPrice.toLocaleString()}
            </span>
            {product.price && product.price !== product.discountPrice && (
              <span className="text-[12px] text-gray-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>
          {product.rating && (
            <span className="text-[11px] text-[#6b5c4f] flex items-center gap-1">
              ★ {product.rating}
              {product.reviewCount && (
                <span className="text-gray-400">({product.reviewCount})</span>
              )}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;