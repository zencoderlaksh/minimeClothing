import { useState, useMemo, useEffect, useRef } from "react";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import products from "../../assets/data";
import Card from "../../components/Card";

const TRENDING = ["Tops", "White Dresses", "Sequin Dresses", "Long Sleeve Dresses"];

const categories = ["All", ...new Set(products.map((p) => p.category))];

const Search = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeCategory]);

  const results = useMemo(() => {
    if (!query.trim() && activeCategory === "All") return [];
    return products.filter((p) => {
      const matchesQuery =
        !query.trim() ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 4),
    []
  );

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showResults = query.trim().length > 0 || activeCategory !== "All";

  return (
    <div className="min-h-screen bg-[#f8f6f2] pt-28 pb-24">

      {/* subtle grid bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(180,160,120,0.07) 60px),
            repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(180,160,120,0.07) 60px)
          `,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4">

        {/* ── HEADER ── */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.5em] text-[#c9a96e] mb-3 font-light">
            SEARCH
          </p>
          <h1
            className="font-light text-[#1a1812] leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
            }}
          >
            Find Your{" "}
            <em className="italic" style={{ color: "#c9a96e" }}>
              Perfect
            </em>{" "}
            Piece
          </h1>
        </div>

        {/* ── SEARCH BAR ── */}
        <div
          className="flex items-center gap-3 max-w-[680px] mx-auto mb-5 px-5 bg-[#fef9f3] transition-all duration-200"
          style={{
            border: focused ? "1px solid #c9a96e" : "1px solid #c8bda8",
            boxShadow: focused ? "0 0 0 3px rgba(201,169,110,0.12)" : "none",
          }}
        >
          <HiMagnifyingGlass className="text-[#c9a96e] text-xl flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search dresses, tops, sets…"
            className="flex-1 bg-transparent outline-none py-4 text-[1.05rem] text-[#1a1812] placeholder:text-[#b0a090]"
            style={{ fontFamily: "inherit", letterSpacing: "0.02em" }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[#8b7355] hover:text-[#1a1812] transition cursor-pointer flex-shrink-0"
            >
              <HiXMark className="text-xl" />
            </button>
          )}
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div className="flex flex-wrap gap-2 justify-center max-w-[680px] mx-auto mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`
                text-[11px] uppercase tracking-[0.2em] px-4 py-[6px]
                border transition-all duration-200 cursor-pointer
                ${activeCategory === cat
                  ? "bg-[#1a1812] text-[#fef9f3] border-[#1a1812]"
                  : "bg-transparent text-[#6b5a3e] border-[#e0d8c8] hover:border-[#1a1812] hover:text-[#1a1812]"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            EMPTY STATE — trending + featured
        ══════════════════════════════════════ */}
        {!showResults && (
          <>
            {/* Trending keywords */}
            <div className="text-center mb-14">
              <p className="text-[10px] tracking-[0.4em] text-[#8b7355] uppercase mb-5">
                Trending Now
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {TRENDING.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="
                      flex items-center gap-2 cursor-pointer
                      text-[#1a1812] border-b border-transparent
                      hover:border-[#c9a96e] hover:text-[#c9a96e]
                      transition-all duration-200 pb-[2px]
                    "
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.35rem",
                      fontWeight: 300,
                    }}
                  >
                    <span className="text-[#c9a96e] text-base">↗</span>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured strip using your Card component */}
            <div className="mb-6">
              <p
                className="text-[11px] tracking-[0.4em] text-[#8b7355] uppercase mb-8 text-center"
              >
                Featured Picks
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                {featured.map((product) => (
                  <Card key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════
            RESULTS STATE
        ══════════════════════════════════════ */}
        {showResults && (
          <div>
            {/* Results header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#e0d8c8]">
              <span className="text-[12px] uppercase tracking-[0.15em] text-[#6b5a3e]">
                {results.length} {results.length === 1 ? "result" : "results"}
                {query ? ` for "${query}"` : ""}
              </span>
              <button
                type="button"
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="text-[11px] uppercase tracking-[0.2em] text-[#8b7355] underline cursor-pointer hover:text-[#1a1812] transition"
              >
                Clear all
              </button>
            </div>

            {/* No results */}
            {results.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#c9a96e] text-3xl mb-4">✦</p>
                <h2
                  className="font-light text-[#1a1812] mb-3"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2rem",
                    fontStyle: "italic",
                  }}
                >
                  No results found
                </h2>
                <p className="text-sm text-[#6b5a3e]">
                  Try a different keyword or browse the categories above.
                </p>
              </div>
            ) : (
              /* Results grid — uses your Card component */
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {paginatedResults.map((product) => (
                    <div
                      key={product.id}
                      className="animate-fadeUp"
                      style={{ animationFillMode: "both" }}
                    >
                      <Card product={product} />
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16">

                    {/* Prev */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="
                        w-10 h-10 flex items-center justify-center
                        border border-[#ddd6ce] text-sm
                        disabled:opacity-30 disabled:cursor-not-allowed
                        hover:bg-black hover:text-white hover:border-black
                        transition cursor-pointer
                      "
                    >
                      ←
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`
                          w-10 h-10 flex items-center justify-center
                          border text-sm tracking-widest transition cursor-pointer
                          ${currentPage === page
                            ? "bg-black text-white border-black"
                            : "border-[#ddd6ce] hover:bg-black hover:text-white hover:border-black"
                          }
                        `}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Next */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="
                        w-10 h-10 flex items-center justify-center
                        border border-[#ddd6ce] text-sm
                        disabled:opacity-30 disabled:cursor-not-allowed
                        hover:bg-black hover:text-white hover:border-black
                        transition cursor-pointer
                      "
                    >
                      →
                    </button>

                  </div>
                )}
              </>
            )}
          </div>
        )}

      </div>

      {/* Fade-up animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.45s ease both;
        }
      `}</style>
    </div>
  );
};

export default Search;