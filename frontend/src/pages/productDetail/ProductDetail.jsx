import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../stores/useWishlistStore";
import { useCartStore } from "../../stores/useCartStore";
import {
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  Heart,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  PackageX,
} from "lucide-react";

import products from "../../assets/data";
import ReviewSection from "../../components/ReviewSection";
import SimilarProducts from "../../components/SimilarProducts";
import { cash, rupay, gpay, upi } from "../../assets/images";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

  const images = product ? [product.mainImage, ...(product.images || [])] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState("");
  const [colorError, setColorError] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  // ── Toast stack: array of { id, color, size }
  const [toasts, setToasts] = useState([]);
  const toastTimersRef = useRef({});
  const MAX_TOASTS = 3;

  const [isTransitioning, setIsTransitioning] = useState(false);

  const autoScrollRef = useRef(null);

  // ── Reset state when product changes
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedSize("");
    setSelectedColor(null);
    setQuantity(1);
    setSizeError("");
    setColorError("");
    setToasts([]);
    setShowGuide(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // ── Auto-scroll carousel
  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goTo = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      goNext();
    }, 3500);
  }, [goNext]);

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    if (images.length > 1) startAutoScroll();
    return () => stopAutoScroll();
  }, [id, images.length]);

  const handleManualNav = (fn) => {
    stopAutoScroll();
    fn();
    setTimeout(() => startAutoScroll(), 6000);
  };

  if (!product) {
    return <div className="pt-32 text-center">Product not found</div>;
  }

  // ── Stock status helpers
  const stockStatusConfig = {
    "In Stock": {
      className: "bg-green-50 text-green-700 border border-green-200",
      dot: "bg-green-500",
    },
    "Low Stock": {
      className: "bg-amber-50 text-amber-700 border border-amber-200",
      dot: "bg-amber-500",
    },
    "Only a Few Left": {
      className: "bg-orange-50 text-orange-700 border border-orange-200",
      dot: "bg-orange-500",
    },
    "Out of Stock": {
      className: "bg-red-50 text-red-600 border border-red-200",
      dot: "bg-red-500",
    },
  };

  const stockConfig = stockStatusConfig[product.stockStatus] || stockStatusConfig["In Stock"];
  const isOutOfStock = product.stockStatus === "Out of Stock";

  const handleWishlist = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const dismissToast = (id) => {
    clearTimeout(toastTimersRef.current[id]);
    delete toastTimersRef.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCart = () => {
    let hasError = false;

    if (!selectedSize) {
      setSizeError("Please select a size before adding to cart.");
      hasError = true;
    }
    if (!selectedColor) {
      setColorError("Please select a colour before adding to cart.");
      hasError = true;
    }
    if (hasError) return;

    setSizeError("");
    setColorError("");
    addToCart(product, quantity, selectedSize, selectedColor);

    // ── Create a new toast entry with a snapshot of current selections
    const id = Date.now();
    const newToast = { id, color: selectedColor, size: selectedSize };

    setToasts((prev) => {
      // If already at max, drop the oldest (first) one and clear its timer
      if (prev.length >= MAX_TOASTS) {
        const oldest = prev[0];
        clearTimeout(toastTimersRef.current[oldest.id]);
        delete toastTimersRef.current[oldest.id];
        return [...prev.slice(1), newToast];
      }
      return [...prev, newToast];
    });

    // Auto-dismiss after 3s
    toastTimersRef.current[id] = setTimeout(() => {
      dismissToast(id);
    }, 3000);
  };

  return (
    <>
      {/* ── TOAST STACK (fixed, bottom-center) ── */}
      <div
className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2.5 w-[92%] max-w-lg pointer-events-none"        style={{ fontFamily: "Poppins" }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="
              pointer-events-auto
              backdrop-blur-md bg-white/95
              border border-neutral-200
              shadow-[0_10px_40px_rgba(0,0,0,0.12)]
              rounded-2xl
              px-6 py-4
              flex items-center justify-between
              animate-[slideDown_0.4s_cubic-bezier(0.22,0.68,0,1.2)_both]
            "
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-base">Added to Cart</h4>
                {t.color && t.size && (
                  <p className="text-sm text-gray-500 mt-1">
                    {t.color.name} • Size {t.size}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-gray-400 hover:text-gray-700 transition-colors text-lg cursor-pointer ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#faf8f5] min-h-screen pt-32">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-14">

          {/* ── LEFT: CAROUSEL ── */}
          <div>
            <div
              className="relative overflow-hidden rounded-xl bg-white group"
              onMouseEnter={stopAutoScroll}
              onMouseLeave={startAutoScroll}
            >
              <div className="relative w-full h-[650px] lg:h-[850px]">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={product.title}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-all duration-500 ease-in-out
                      ${i === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"}
                    `}
                  />
                ))}
              </div>

              <button
                onClick={() => handleManualNav(goPrev)}
                className="
                  absolute left-3 top-1/2 -translate-y-1/2 z-20
                  w-10 h-10 rounded-full bg-white/80 backdrop-blur
                  flex items-center justify-center shadow-md
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer
                "
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => handleManualNav(goNext)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2 z-20
                  w-10 h-10 rounded-full bg-white/80 backdrop-blur
                  flex items-center justify-center shadow-md
                  opacity-0 group-hover:opacity-100
                  transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer
                "
              >
                <ChevronRight size={20} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleManualNav(() => goTo(i))}
                    className={`
                      rounded-full transition-all duration-300 cursor-pointer
                      ${i === currentIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"}
                    `}
                  />
                ))}
              </div>

              <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleManualNav(() => goTo(index))}
                  className={`
                    cursor-pointer overflow-hidden rounded-lg border transition-all duration-300
                    ${currentIndex === index ? "border-black" : "border-transparent hover:border-gray-300"}
                  `}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-28 w-full object-cover hover:scale-110 transition-all duration-500"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: PRODUCT INFO ── */}
          <div className="lg:sticky lg:top-28 h-fit">

            {/* BADGE */}
            {product.badge && (
              <span className={`
                inline-block mb-4 text-[11px] uppercase tracking-[0.2em] px-3 py-1 font-medium
                ${product.badge === "Bestseller" ? "bg-[#C9A66B] text-white" :
                  product.badge === "New" ? "bg-[#1A1A2E] text-white" :
                  "bg-rose-600 text-white"}
              `}>
                {product.badge}
              </span>
            )}

            {/* CATEGORY */}
            <p className="uppercase tracking-[0.25em] text-xs text-[#b79d84]">
              {product.category}
            </p>

            {/* TITLE + WISHLIST */}
            <div className="flex justify-between gap-4 mt-2">
              <h1 className="text-4xl md:text-5xl font-light leading-tight">
                {product.title}
              </h1>
              <button
                onClick={handleWishlist}
                className="shrink-0 cursor-pointer transition-all duration-300 hover:scale-110"
              >
                <Heart
                  size={30}
                  fill={isWishlisted(product.id) ? "#ef4444" : "transparent"}
                  stroke={isWishlisted(product.id) ? "#ef4444" : "currentColor"}
                />
              </button>
            </div>

            {/* RATING */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= Math.round(product.rating) ? "text-[#C9A66B]" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            {/* STOCK STATUS */}
            <div className="mt-4">
              <span className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full ${stockConfig.className}`}>
                <span className={`w-2 h-2 rounded-full ${stockConfig.dot} ${product.stockStatus === "Out of Stock" ? "" : "animate-pulse"}`} />
                {product.stockStatus}
                {product.stockStatus !== "Out of Stock" && (
                  <span className="text-xs opacity-70">· {product.stock} units</span>
                )}
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-medium">
                ₹{product.discountPrice.toLocaleString()}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.price.toLocaleString()}
              </span>
              {product.discountPercent && (
                <span className="text-green-600 text-sm font-medium">
                  {product.discountPercent}% off
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-8 text-gray-600 leading-8">{product.description}</p>

            {/* ── COLOR SELECTION (mandatory) ── */}
            {product.colors?.length > 0 && (
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">
                    Select Colour <span className="text-red-500">*</span>
                  </h3>
                  {selectedColor && (
                    <span className="text-sm text-[#8a725d]">
                      Selected: <span className="font-medium">{selectedColor.name}</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    const isLight =
                      color.hex === "#FFFFFF" ||
                      color.hex === "#FFFFF0" ||
                      color.hex === "#F5F0E8" ||
                      color.hex === "#FFFDD0" ||
                      color.hex === "#F5C5C5" ||
                      color.hex === "#FFCBA4";

                    return (
                      <button
                        key={color.name}
                        title={color.name}
                        onClick={() => {
                          setSelectedColor(color);
                          setColorError("");
                        }}
                        className={`
                          relative cursor-pointer w-9 h-9 rounded-full
                          transition-all duration-200
                          ${isSelected
                            ? "ring-2 ring-offset-2 ring-black scale-110"
                            : "hover:scale-105 hover:ring-1 hover:ring-offset-1 hover:ring-gray-400"}
                          ${isLight ? "border border-gray-200" : ""}
                        `}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && (
                          <span
                            className={`
                              absolute inset-0 flex items-center justify-center text-xs
                              ${isLight ? "text-gray-800" : "text-white"}
                            `}
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {colorError && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={13} /> {colorError}
                  </p>
                )}
              </div>
            )}

            {/* ── SIZE SELECTION ── */}
            <div className="mt-10">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">
                  Select Size <span className="text-red-500">*</span>
                </h3>
                <button
                  className="cursor-pointer text-sm underline"
                  onClick={() => setShowGuide((prev) => !prev)}
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(""); }}
                    className={`
                      cursor-pointer h-12 min-w-[48px] px-3 border transition-all
                      ${selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white hover:border-black"}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {selectedSize && (
                <p className="mt-3 text-sm text-[#8a725d]">Selected Size: {selectedSize}</p>
              )}
              {sizeError && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={13} /> {sizeError}
                </p>
              )}

              {showGuide && (
                <div className="mt-5 border border-[#e8dfd5] bg-white overflow-hidden animate-fadeIn">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f8f6f2]">
                        <th className="p-3 border">Size</th>
                        <th className="p-3 border">Bust</th>
                        <th className="p-3 border">Waist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["XS", `32"`, `24"`],
                        ["S",  `34"`, `26"`],
                        ["M",  `36"`, `28"`],
                        ["L",  `38"`, `30"`],
                        ["XL", `40"`, `32"`],
                        ["XXL",`42"`, `34"`],
                        ["3XL",`44"`, `36"`],
                      ].map(([s, b, w]) => (
                        <tr key={s}>
                          <td className="border p-3">{s}</td>
                          <td className="border p-3">{b}</td>
                          <td className="border p-3">{w}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* QUANTITY */}
            <div className="mt-10">
              <p className="font-medium mb-4">Quantity</p>
              <div className="flex items-center border w-fit bg-white">
                <button
                  className="cursor-pointer p-4 hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={isOutOfStock}
                >
                  <Minus size={16} />
                </button>
                <span className="px-6">{quantity}</span>
                <button
                  className="cursor-pointer p-4 hover:bg-gray-100 disabled:opacity-40"
                  onClick={() => setQuantity((prev) => Math.min(product.stock, prev + 1))}
                  disabled={isOutOfStock}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`
                cursor-pointer w-full mt-10 py-4 uppercase tracking-widest
                transition-all duration-300 flex items-center justify-center gap-2
                ${isOutOfStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-[#222]"}
              `}
            >
              {isOutOfStock ? (
                <>
                  <PackageX size={18} />
                  Out of Stock
                </>
              ) : (
                "Add To Cart"
              )}
            </button>

            {/* FEATURES */}
            <div className="mt-10 bg-white border border-[#e7dfd5] p-6 space-y-4">
              <div className="flex gap-3"><Truck size={18} /><span>Free shipping over ₹1999</span></div>
              <div className="flex gap-3"><RotateCcw size={18} /><span>Easy returns within 48 hours</span></div>
              <div className="flex gap-3"><ShieldCheck size={18} /><span>Secure payment checkout</span></div>
              <div className="flex gap-3"><CheckCircle2 size={18} /><span>Premium quality fabric</span></div>
            </div>

            {/* PAYMENT ICONS */}
            <div className="flex flex-wrap gap-4 mt-6">
              <img src={cash} alt="Cash" className="h-22" />
              <img src={upi} alt="UPI" className="h-22" />
              <img src={rupay} alt="Rupay" className="h-22" />
              <img src={gpay} alt="GPay" className="h-22" />
            </div>
          </div>
        </div>

        {/* REVIEWS + SIMILAR */}
        <div className="max-w-7xl mx-auto px-4 mt-24">
          <ReviewSection />
          <SimilarProducts
            category={product.category}
            currentId={product.id}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;