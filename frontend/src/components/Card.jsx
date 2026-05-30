import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../stores/useWishlistStore";

const badgeConfig = {
  New: { label: "New", bg: "bg-[#1A1A2E]", text: "text-white" },
  Bestseller: { label: "Bestseller", bg: "bg-[#C9A66B]", text: "text-white" },
  Trending: { label: "Trending", bg: "bg-[#e11d48]", text: "text-white" },
};

const SIZES = ["XS", "S", "M", "L", "XL"];

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  // Navigate to product page with the chosen size pre-selected
  const handleSizeClick = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`, { state: { preSelectedSize: size } });
  };

  const badge = product.badge ? badgeConfig[product.badge] : null;
  const sizes = product.sizes || SIZES;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-[#f7f3ee] cursor-pointer rounded-[20px] aspect-[3/4]">
        {/* WISHLIST */}
        <button
          onClick={handleWishlist}
          className="
            absolute top-3 right-3 z-30
            h-9 w-9 rounded-full
            bg-white/90 backdrop-blur-md
            flex items-center justify-center
            shadow-md transition-all duration-300
            hover:scale-110 cursor-pointer
          "
        >
          <Heart
            size={16}
            fill={wishlisted ? "#ef4444" : "transparent"}
            stroke={wishlisted ? "#ef4444" : "#222"}
          />
        </button>

        {/* Main Image */}
        <img
          src={product.mainImage}
          alt={product.title}
          className="
            absolute inset-0 w-full h-full object-cover rounded-[20px]
            transition-all duration-700 ease-out
            group-hover:scale-110 group-hover:opacity-0
          "
        />

        {/* <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          width={400}
          height={500}
          className="
            absolute inset-0 w-full h-full object-cover rounded-[20px]
            transition-all duration-700 ease-out
            group-hover:scale-110 group-hover:opacity-0
          "
        /> */}

        {/* Hover Image */}
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.title}
            className="
              absolute inset-0 w-full h-full object-cover rounded-[20px]
              opacity-0 scale-[1.08]
              transition-all duration-700 ease-out
              group-hover:opacity-100 group-hover:scale-100
            "
          />
        )}

        {/* Overlay */}
        <div
          className="
          absolute inset-0 rounded-[20px]
          bg-gradient-to-t from-black/60 via-black/15 to-transparent
          opacity-0 transition-all duration-500
          group-hover:opacity-100
        "
        />

        {/* SIZE TRAY — clicking navigates to product page with size pre-selected */}
        <div
          className="
          absolute bottom-0 left-0 right-0 z-20 p-4
          translate-y-4 opacity-0 transition-all duration-500
          group-hover:translate-y-0 group-hover:opacity-100
        "
        >
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/70 mb-2">
            Select Size
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={(e) => handleSizeClick(e, size)}
                className="
                  h-7 w-8 rounded-lg text-[11px] font-medium text-white
                  bg-white/15 border border-white/40 cursor-pointer
                  hover:bg-white hover:text-black hover:border-white
                  backdrop-blur-sm transition-all duration-200
                "
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ARROW BUTTON */}
        <button
          className="
          absolute bottom-3.5 right-3.5 z-20
          h-8 w-8 rounded-full bg-white
          flex items-center justify-center text-[#1a1a1a] text-sm font-medium
          opacity-0 scale-75 transition-all duration-300
          group-hover:opacity-100 group-hover:scale-100
        "
        >
          →
        </button>

        {/* DYNAMIC BADGE */}
        {badge && (
          <div
            className={`
            absolute top-3 left-3 z-20
            ${badge.bg} ${badge.text}
            px-3 py-1 rounded-full
            text-[9px] uppercase tracking-[0.22em] font-medium
          `}
          >
            {badge.label}
          </div>
        )}

        {/* DISCOUNT % PILL */}
        {product.discountPercent && (
          <div
            className="
            absolute bottom-3 left-3 z-20
            bg-white/90 backdrop-blur-sm
            px-2.5 py-0.5 rounded-full
            text-[9px] font-bold text-[#6b5c4f] tracking-wide
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
        <p className="text-[12.5px] text-[#6b5c4f] truncate">{product.title}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-[#1a1a1a]">
              ₹{product.discountPrice.toLocaleString()}
            </span>
            {product.price && product.price !== product.discountPrice && (
              <span className="text-[11.5px] text-gray-400 line-through">
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
