import { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import Card from "../../components/Card";
import CategoryNav from "../../components/CategoryNav";

const SPECIAL_ROUTES = {
  new: {
    label: "New Arrivals",
    badgeFilter: "New",
  },
  "best-sellers": {
    label: "Best Sellers",
    badgeFilter: "Bestseller",
  },
  trending: {
    label: "Trending Now",
    badgeFilter: "Trending",
  },
};

// ─── Main Collection Component ────────────────────────────────────────────────
const Collection = () => {
  const { category } = useParams();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const filterRef = useRef();
  const sortRef = useRef();

  const specialRoute = SPECIAL_ROUTES[category] || null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const closeMenus = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target))
        setFilterOpen(false);
      if (sortRef.current && !sortRef.current.contains(e.target))
        setSortOpen(false);
    };
    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const filteredProducts = useMemo(() => {
    let items = [...products];

    // Helper: is new arrival?
    const isNew = (p) => {
      if (!p.createdAt) return false;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(p.createdAt) > thirtyDaysAgo;
    };

    if (specialRoute) {
      if (specialRoute.badgeFilter === "New") items = items.filter(isNew);
      else if (specialRoute.badgeFilter === "Trending") items = items.filter(p => p.isTrending);
      else if (specialRoute.badgeFilter === "Bestseller") items = items.filter(p => p.isBestSeller);
    } else if (category) {
      items = items.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === category);
    }

    if (filter === "bestsellers") {
      items = items.filter((p) => p.isBestSeller);
    } else if (filter === "newarrivals") {
      items = items.filter(isNew);
    } else if (filter === "trending") {
      items = items.filter((p) => p.isTrending);
    }

    switch (sort) {
      case "priceLow":
        items.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "priceHigh":
        items.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        // Sort logic if you add rating field
        break;
      case "discount":
        // Sort logic if you add discount calculation
        break;
      case "az":
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        items.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return items;
  }, [products, category, filter, sort, location.pathname, specialRoute]);

useEffect(() => {
  setCurrentPage(1);
}, [category, filter, sort, location.pathname]);

const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

const totalPages = Math.ceil(displayProducts.length / ITEMS_PER_PAGE);

const paginatedProducts = displayProducts.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);

const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return;

  setCurrentPage(page);

  // Scroll to 20% of page height
  window.scrollTo({
    top: document.documentElement.scrollHeight * 0.2,
    behavior: "smooth",
  });
};

// Show only 3 page buttons and keep current page centered
const pagesPerGroup = 3;

let startPage = Math.max(
  1,
  currentPage - Math.floor(pagesPerGroup / 2)
);

let endPage = startPage + pagesPerGroup - 1;

if (endPage > totalPages) {
  endPage = totalPages;
  startPage = Math.max(1, endPage - pagesPerGroup + 1);
}

const visiblePages = Array.from(
  { length: endPage - startPage + 1 },
  (_, i) => startPage + i
);

  const filterLabel = specialRoute
    ? { all: "All" }
    : {
        all: "All Products",
        bestsellers: "Best Sellers",
        newarrivals: "New Arrivals",
        trending: "Trending",
      };

  const sortLabel = {
    featured: "Featured",
    priceLow: "Price: Low → High",
    priceHigh: "Price: High → Low",
    rating: "Top Rated",
    discount: "Biggest Discount",
    az: "A → Z",
    za: "Z → A",
  };

  return (
    <div className="bg-[#f8f6f2] min-h-screen">
      
      {/* IMPORTED CATEGORY NAV */}
      <CategoryNav activeSlug={category} />

      {/* FILTER BAR */}
<div className="max-w-7xl mx-auto px-4 py-10">
  <div className="flex items-center justify-between border-y border-[#ddd6ce] py-5">
    
    {/* FILTER */}
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setFilterOpen(!filterOpen)}
        className="flex items-center gap-1 md:gap-2 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[11px] sm:text-xs md:text-sm cursor-pointer"
      >
        {filterLabel[filter] || filterLabel["all"]}
        <ChevronDown size={15} />
      </button>

      {filterOpen && (
        <div className="absolute top-full left-0 mt-4 bg-white border border-[#e8dfd4] shadow-xl min-w-[220px] z-50">
          {Object.entries(filterLabel).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setFilter(key);
                setFilterOpen(false);
              }}
              className={`
                block w-full text-left px-5 py-4 hover:bg-[#f8f6f2] text-sm cursor-pointer
                ${filter === key ? "font-semibold text-black" : "text-gray-600"}
              `}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* COUNT */}
    <span className="uppercase tracking-[0.1em] md:tracking-[0.2em] text-[11px] sm:text-xs md:text-sm">
      {displayProducts.length} Products
    </span>

    {/* SORT */}
    <div className="relative" ref={sortRef}>
      <button
        onClick={() => setSortOpen(!sortOpen)}
        className="flex items-center gap-1 md:gap-2 uppercase tracking-[0.1em] md:tracking-[0.2em] text-[11px] sm:text-xs md:text-sm cursor-pointer"
      >
        {sortLabel[sort]}
        <ChevronDown size={15} />
      </button>

      {sortOpen && (
        <div className="absolute right-0 top-full mt-4 bg-white border border-[#e8dfd4] shadow-xl min-w-[250px] z-50">
          {Object.entries(sortLabel).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setSort(key);
                setSortOpen(false);
              }}
              className={`
                block w-full text-left px-5 py-4 hover:bg-[#f8f6f2] text-sm cursor-pointer
                ${sort === key ? "font-semibold text-black" : "text-gray-600"}
              `}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        {loading ? (
          <div className="text-center py-32 text-gray-500">Loading products...</div>
        ) : (
          <>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {paginatedProducts.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* PAGINATION */}
{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-16">
    {/* Previous Page */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="
        w-10 h-10 flex items-center justify-center
        border border-[#ddd6ce]
        disabled:opacity-30 disabled:cursor-not-allowed
        hover:bg-black hover:text-white hover:border-black
        transition cursor-pointer
      "
    >
      ←
    </button>

    {/* Visible Pages */}
    {visiblePages.map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`
          w-10 h-10 flex items-center justify-center
          border text-sm tracking-widest transition cursor-pointer
          ${
            currentPage === page
              ? "bg-black text-white border-black"
              : "border-[#ddd6ce] hover:bg-black hover:text-white hover:border-black"
          }
        `}
      >
        {page}
      </button>
    ))}

    {/* Next Page */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="
        w-10 h-10 flex items-center justify-center
        border border-[#ddd6ce]
        disabled:opacity-30 disabled:cursor-not-allowed
        hover:bg-black hover:text-white hover:border-black
        transition cursor-pointer
      "
    >
      →
    </button>
  </div>
)}
      </section>
    </div>
  );
};

export default Collection;