import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const VISIBLE = 4;

const CategoryNav = ({ activeSlug }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [categories, setCategories] = useState([]);

  const maxOffset = Math.max(0, categories.length - VISIBLE);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (data.success) {
          const uniqueCats = [];
          const seen = new Set();
          data.products.forEach(p => {
            if (!seen.has(p.category)) {
              seen.add(p.category);
              uniqueCats.push({
                title: p.category,
                slug: p.category.toLowerCase().replace(/\s+/g, "-"),
                image: p.images?.[0] || "",
                count: data.products.filter(pr => pr.category === p.category).length + " items"
              });
            }
          });
          setCategories(uniqueCats);
        }
      } catch (err) {
        console.error("Failed to fetch nav categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
  const firstCard = trackRef.current?.querySelector(".cn-card");

  if (firstCard) {
    const style = window.getComputedStyle(trackRef.current);
    const gap = parseInt(style.columnGap || style.gap || 16);

    setCardWidth(firstCard.offsetWidth + gap);
  }
}, []);

  const goTo = (page) => {
    const next = Math.max(0, Math.min(page, maxOffset));
    setOffset(next);
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${next * cardWidth}px)`;
    }
  };

  const handleCategoryClick = (slug) => {
    navigate(`/collection/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find active category title from slug
  const activeCat = categories.find((c) => c.slug === category);

  // ← If a category is selected, show just the heading
  if (category) {
    return (
      <div className="bg-[#f8f6f2] pt-10 pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <h1
            className="text-[32px] font-light text-[#1a1a1a] mt-1 text-center uppercase"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {activeCat?.title || category}
          </h1>
        </div>
      </div>
    );
  }

  // ← Otherwise show the full carousel
  return (
    <section className="bg-[#f8f6f2] py-10">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8a7f72] font-medium">
              Curated for you
            </p>
            <h2 className="text-[28px] font-light text-[#1a1a1a] mt-1" style={{ fontFamily: "Georgia, serif" }}>
              Shop by Category
            </h2>
          </div>

          {categories.length === 0 && (
            <p className="text-sm text-gray-400">Loading categories...</p>
          )}

          {categories.length > VISIBLE && (
            <div className="flex gap-2">
              <button
                onClick={() => goTo(offset - 1)}
                disabled={offset === 0}
                className="w-9 h-9 rounded-full border border-[#c8bfb4] bg-white flex items-center justify-center text-[#5c5047] transition-all duration-200 hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:cursor-default cursor-pointer"
              >
                ←
              </button>
              <button
                onClick={() => goTo(offset + 1)}
                disabled={offset >= maxOffset}
                className="w-9 h-9 rounded-full border border-[#c8bfb4] bg-white flex items-center justify-center text-[#5c5047] transition-all duration-200 hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-white disabled:opacity-30 disabled:cursor-default cursor-pointer"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* Carousel Track */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 transition-transform duration-[450ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          >
            {categories.map((item) => {
              const isActive = item.slug === activeSlug;
              return (
                <button
                  key={item.slug}
                  onClick={() => handleCategoryClick(item.slug)}
                  className="cn-card group flex-none w-[calc(25%-12px)] text-left cursor-pointer"
                >
                  <div
                    className={`relative overflow-hidden w-[150px] h-[190px] bg-[#ede8e0] ${
                      isActive ? "outline outline-2 outline-offset-[3px] outline-black" : ""
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                      <div className="w-6 h-6 mt-1.5 rounded-full bg-white flex items-center justify-center text-[#1a1a1a] text-xs opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                        →
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 px-1">
                    <p className={`text-[11px] tracking-[0.14em] uppercase font-medium transition-colors duration-200 ${
                      isActive ? "text-[#1a1a1a]" : "text-[#5c5047] group-hover:text-[#1a1a1a]"
                    }`}>
                      {item.title}
                    </p>
                    {item.count && (
                      <p className="text-[10px] text-[#a0948a] mt-0.5">{item.count}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        {categories.length > VISIBLE && (
          <div className="flex justify-center gap-1.5 mt-5">
            {Array.from({ length: maxOffset + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === offset ? "w-5 bg-[#5c5047]" : "w-1.5 bg-[#c8bfb4]"
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CategoryNav;