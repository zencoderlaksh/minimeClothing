import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductGallery = ({ product, images }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoScrollRef = useRef(null);
  const MAX_THUMBS = 5;

  useEffect(() => {
    document.body.setAttribute("data-hero", "true");
    return () => document.body.removeAttribute("data-hero");
  }, []);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length, isTransitioning]);

  const goTo = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(goNext, 3000);
  }, [goNext]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (images.length > 1) startAutoScroll();
    return stopAutoScroll;
  }, [images.length, startAutoScroll, stopAutoScroll]);

  const handleManualNav = (fn) => {
    stopAutoScroll();
    fn();
    setTimeout(startAutoScroll, 6000);
  };

  return (
    <>
      <div
        className="relative w-full h-screen bg-[#ece9e4] group overflow-hidden -mt-[90px]"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-[100px] left-8 z-30 flex items-center gap-1 text-[11px] tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors bg-white/60 backdrop-blur-sm px-3 py-1.5"
        >
          <ChevronLeft size={13} /> Back
        </button>

        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {images.length > 1 && (
          <>
            <button
              onClick={() => handleManualNav(goPrev)}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/75 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => handleManualNav(goNext)}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/75 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Bottom Right Thumbnail Navigation */}
{images.length > 1 && (
  <div className="absolute bottom-6 right-6 z-30 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-2 rounded-md">
    
    {/* Thumbnails */}
    <div className="flex gap-1">
      {images.slice(0, MAX_THUMBS).map((img, i) => (
        <button
          key={i}
          onClick={() => handleManualNav(() => goTo(i))}
          className={`overflow-hidden border transition-all duration-300 ${
            currentIndex === i
              ? "border-white opacity-100"
              : "border-transparent opacity-50 hover:opacity-100"
          }`}
        >
          <img
            src={img}
            alt=""
            className="w-12 h-12 object-cover"
          />
        </button>
      ))}
    </div>

    {/* Navigation Arrows */}
    <div className="flex gap-1 ml-2">
      <button
        onClick={() => handleManualNav(goPrev)}
        className="w-9 h-9 cursor-pointer rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
      >
        <ChevronLeft size={16} />
      </button>

      <button
        onClick={() => handleManualNav(goNext)}
        className="w-9 h-9 cursor-pointer rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
)}
    </>
  );
};

export default ProductGallery;