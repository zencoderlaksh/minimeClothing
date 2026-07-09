import { useState, useRef, useEffect } from "react";

// 3 slides × 2 images × 3 girls = 18 unique product links
// Replace each link and name/price with your actual product data
const templateSlides = [
  {
    id: 1,
    images: [
      {
        src: "https://t4.ftcdn.net/jpg/02/47/28/81/360_F_247288104_VrXGHpWlVzR67XPAZawlejdC8uvVNw6j.jpg",
        alt: "Look 1 - Left",
        girls: [
          { id: 1, x: "22%", y: "50%", name: "Floral Sundress",   price: "₹1,299", link: "/products/all/1" },
          { id: 2, x: "52%", y: "42%", name: "Lace Crop Top",     price: "₹999",   link: "/products/all/2" },
          { id: 3, x: "78%", y: "48%", name: "Tie-Front Blouse",  price: "₹1,149", link: "/products/all/3" },
        ],
      },
      {
        src: "https://t4.ftcdn.net/jpg/02/47/28/81/360_F_247288104_VrXGHpWlVzR67XPAZawlejdC8uvVNw6j.jpg",
        alt: "Look 1 - Right",
        girls: [
          { id: 1, x: "22%", y: "44%", name: "Striped Co-ord",    price: "₹1,849", link: "/products/all/4" },
          { id: 2, x: "52%", y: "38%", name: "Satin Slip Dress",  price: "₹1,499", link: "/products/all/5" },
          { id: 3, x: "78%", y: "46%", name: "Ruched Midi Skirt", price: "₹1,199", link: "/products/all/6" },
        ],
      },
    ],
  },
  {
    id: 2,
    images: [
      {
        src: "https://t4.ftcdn.net/jpg/02/47/28/81/360_F_247288104_VrXGHpWlVzR67XPAZawlejdC8uvVNw6j.jpg",
        alt: "Look 2 - Left",
        girls: [
          { id: 1, x: "22%", y: "52%", name: "Puff Sleeve Top",   price: "₹1,099", link: "/products/all/7" },
          { id: 2, x: "52%", y: "44%", name: "Embroidered Kurti", price: "₹1,599", link: "/products/all/8" },
          { id: 3, x: "78%", y: "46%", name: "Floral Maxi Dress", price: "₹1,899", link: "/products/all/9" },
        ],
      },
      {
        src: "https://t4.ftcdn.net/jpg/02/47/28/81/360_F_247288104_VrXGHpWlVzR67XPAZawlejdC8uvVNw6j.jpg",
        alt: "Look 2 - Right",
        girls: [
          { id: 1, x: "22%", y: "50%", name: "Anarkali Print",    price: "₹1,599", link: "/products/all/10" },
          { id: 2, x: "52%", y: "42%", name: "Block Print Kurti", price: "₹1,299", link: "/products/all/11" },
          { id: 3, x: "78%", y: "48%", name: "Chikankari Kurti",  price: "₹1,799", link: "/products/all/12" },
        ],
      },
    ],
  },
  {
    id: 3,
    images: [
      {
        src: "https://t4.ftcdn.net/jpg/02/47/28/81/360_F_247288104_VrXGHpWlVzR67XPAZawlejdC8uvVNw6j.jpg",
        alt: "Look 3 - Left",
        girls: [
          { id: 1, x: "22%", y: "54%", name: "Ribbed Lounge Set", price: "₹1,499", link: "/products/all/13" },
          { id: 2, x: "52%", y: "46%", name: "Satin Slip Set",    price: "₹1,299", link: "/products/all/14" },
          { id: 3, x: "78%", y: "50%", name: "Oversized Tee",     price: "₹699",   link: "/products/all/15" },
        ],
      },
      {
        src: "https://t4.ftcdn.net/jpg/02/47/28/81/360_F_247288104_VrXGHpWlVzR67XPAZawlejdC8uvVNw6j.jpg",
        alt: "Look 3 - Right",
        girls: [
          { id: 1, x: "22%", y: "48%", name: "Modal Jogger Set",  price: "₹1,349", link: "/products/all/16" },
          { id: 2, x: "52%", y: "40%", name: "Floral PJ Set",     price: "₹1,699", link: "/products/all/17" },
          { id: 3, x: "78%", y: "52%", name: "Plush Robe Set",    price: "₹1,899", link: "/products/all/18" },
        ],
      },
    ],
  },
];

function ProductCard({ girl, onClose }) {
  return (
    <div
      className="absolute z-20 bg-white border border-[#ece8e1] rounded-xl shadow-xl w-44 p-3"
      style={{
        bottom: "calc(100% + 12px)",
        left: "50%",
        transform: "translateX(-50%)",
        animation: "popIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <style>{`@keyframes popIn{from{opacity:0;transform:translateX(-50%) scale(0.86)}to{opacity:1;transform:translateX(-50%) scale(1)}}`}</style>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f3f0eb] flex items-center justify-center text-[#8a8278] hover:bg-[#e8e3db] transition-colors"
        aria-label="Close"
      >
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
      <p className="text-[13px] text-[#1a1714] leading-snug mb-3 pr-4">{girl.name}</p>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-medium text-[#1a1714]">{girl.price}</span>
        <a
          href={girl.link}
          className="text-[10px] font-medium tracking-widest uppercase bg-[#1a1714] text-[#faf9f6] px-3 py-1.5 rounded-full hover:bg-[#3a3530] transition-colors no-underline"
        >
          Shop
        </a>
      </div>
    </div>
  );
}

function ImagePanel({ imgData }) {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="relative w-full md:w-1/2 flex-shrink-0 h-[420px] md:h-[560px] overflow-hidden" style={{ scrollSnapAlign: "start" }}>
      <img
        src={imgData.src}
        alt={imgData.alt}
        className="w-full h-full object-cover object-top"
      />
      {imgData.girls.map((girl) => (
        <div
          key={girl.id}
          className="absolute z-10"
          style={{ left: girl.x, top: girl.y, transform: "translate(-50%, -50%)" }}
        >
          <button
            onClick={() => setActivePin(activePin === girl.id ? null : girl.id)}
            aria-label="View product"
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 border border-white/50
              ${activePin === girl.id
                ? "bg-[#1a1714] text-white rotate-45 scale-110"
                : "bg-white/85 text-[#1a1714] hover:scale-110 hover:bg-white backdrop-blur-sm"
              }`}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          {activePin === girl.id && (
            <ProductCard girl={girl} onClose={() => setActivePin(null)} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function ShopLook() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const [slides, setSlides] = useState(templateSlides);
  const allImages = slides.flatMap(s => s.images);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (data.success && data.products.length > 0) {
          let pIndex = 0;
          const products = data.products;
          
          const dynamicSlides = templateSlides.map(slide => ({
            ...slide,
            images: slide.images.map(img => ({
              ...img,
              girls: img.girls.map(girl => {
                const p = products[pIndex % products.length];
                pIndex++;
                return p ? {
                  ...girl,
                  name: p.name,
                  price: `₹${p.price.toLocaleString()}`,
                  link: `/products/all/${p._id}`
                } : girl;
              })
            }))
          }));
          setSlides(dynamicSlides);
        }
      } catch (err) {
        console.error("Failed to fetch products for ShopLook", err);
      }
    };
    fetchProducts();
  }, []);

  const goTo = (idx) => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      const itemWidth = trackRef.current.firstElementChild.offsetWidth;
      const visibleItems = Math.round(trackRef.current.offsetWidth / itemWidth);
      const maxIdx = allImages.length - visibleItems;
      const clamped = Math.max(0, Math.min(maxIdx, idx));
      setCurrent(clamped);
      trackRef.current.scrollTo({ left: clamped * itemWidth, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      const itemWidth = trackRef.current.firstElementChild.offsetWidth;
      const idx = Math.round(trackRef.current.scrollLeft / itemWidth);
      setCurrent(idx);
    }
  };

  return (
    <section className="relative z-0 bg-[#faf9f6] py-14 isolate overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-[#1a1714] mb-2">
          Shop The Look
        </h2>
        <p className="text-sm text-[#8a8278] tracking-widest font-light">
          A collection of standout pieces crafted with precision, detail, and timeless appeal.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          <style>{`.hide-scroll::-webkit-scrollbar{display:none}`}</style>
          {allImages.map((imgData, i) => (
            <ImagePanel key={i} imgData={imgData} />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          aria-label="Previous"
          className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/88 border border-[#ece8e1] flex items-center justify-center shadow-md text-[#1a1714] hover:bg-white transition-all disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="11,4 6,9 11,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => goTo(current + 1)}
          disabled={current >= (trackRef.current ? allImages.length - Math.round(trackRef.current.offsetWidth / trackRef.current.firstElementChild.offsetWidth) : allImages.length - (typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1))}
          aria-label="Next"
          className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/88 border border-[#ece8e1] flex items-center justify-center shadow-md text-[#1a1714] hover:bg-white transition-all disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <polyline points="7,4 12,9 7,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {allImages.map((_, i) => {
          // Hide dots for items that can't be snapped to (end of track)
          const visibleItems = trackRef.current ? Math.round(trackRef.current.offsetWidth / trackRef.current.firstElementChild.offsetWidth) : (window.innerWidth >= 768 ? 2 : 1);
          const maxIdx = allImages.length - visibleItems;
          if (i > maxIdx) return null;

          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full border-none cursor-pointer p-0 transition-all duration-200
                ${i === current ? "w-2.5 h-2.5 bg-[#1a1714] scale-125" : "w-2 h-2 bg-[#d4cec6]"}`}
            />
          );
        })}
      </div>
    </section>
  );
}