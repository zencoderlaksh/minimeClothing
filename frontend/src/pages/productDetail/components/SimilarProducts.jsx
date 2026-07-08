import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SimilarProducts = ({ category, currentId }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    if (!category) return;
    const fetchSimilar = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products?category=${category}`);
        const data = await res.json();
        if (data.success) {
          const filtered = data.products
            .filter((item) => item._id !== currentId)
            .slice(0, 10);
          setSimilarProducts(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch similar products", err);
      }
    };
    fetchSimilar();
  }, [category, currentId]);

  // Update progress bar when scrolling
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress || 0);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
      return () => currentRef.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (similarProducts.length === 0) return null;

  return (
    <div className="relative max-w-screen-2xl mx-auto px-8">
      <div className="relative group">
        {/* Hover Controls */}
        <button 
          onClick={() => scroll("left")}
          className="absolute -left-4 top-[40%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 border border-gray-200 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
        >
          <ChevronLeft size={16} className="text-black" />
        </button>
        
        <button 
          onClick={() => scroll("right")}
          className="absolute -right-4 top-[40%] -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 border border-gray-200 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white cursor-pointer"
        >
          <ChevronRight size={16} className="text-black" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 snap-x scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {similarProducts.map((product) => {
            const pId = product._id || product.id;
            return (
            <Link
              key={pId}
              to={`/products/all/${pId}`}
              className="min-w-[280px] w-[280px] shrink-0 snap-start flex flex-col group/item cursor-pointer"
            >
              {/* IMAGE FIX: Changed to w-full h-full object-cover so it fits properly */}
              <div className="w-full h-[320px] bg-[#f9f9f9] overflow-hidden mb-4 relative">
                <img 
                  src={product.images?.[0] || ""} 
                  alt={product.name || product.title} 
                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-700 ease-in-out" 
                />
              </div>
              <h3 className="text-[12px] font-medium text-black truncate mb-1">
                {product.name || product.title}
              </h3>
              <p className="text-[12px] text-gray-500">
                ₹{Number(product.price).toLocaleString()}
              </p>
            </Link>
          )})}
        </div>
      </div>

      {/* Visual Scrollbar */}
      {similarProducts.length > 4 && (
        <div className="w-full max-w-[200px] h-[1px] bg-gray-200 mx-auto mt-6 relative overflow-hidden">
          <div 
            className="absolute top-0 h-full bg-black transition-all duration-150 ease-out"
            style={{ 
              width: "40%", 
              left: `${scrollProgress * 60}%` // 60% is (100% - width%) to prevent it going out of bounds
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;