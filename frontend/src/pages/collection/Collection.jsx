import { useMemo, useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import products from "../../assets/data";
import Card from "../../components/Card";

// Importing your CategoryNav component
import CategoryNav from "../../components/CategoryNav"; 

const categoryMap = {};
products.forEach((p) => {
  const slug = p.category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  categoryMap[slug] = p.category;
});

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

// ─── Main Collection Component ────────────────────────────────────────────────
const Collection = () => {
  const { category } = useParams();
  const location = useLocation();

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

    if (specialRoute) {
      items = items.filter((p) => p.badge === specialRoute.badgeFilter);
    } else if (category && categoryMap[category]) {
      items = items.filter((p) => p.category === categoryMap[category]);
    }

    if (filter === "bestsellers") {
      items = items.filter((p) => p.badge === "Bestseller");
    } else if (filter === "newarrivals") {
      items = items.filter((p) => p.badge === "New");
    } else if (filter === "trending") {
      items = items.filter((p) => p.badge === "Trending");
    }

    switch (sort) {
      case "priceLow":
        items.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "priceHigh":
        items.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        items.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case "az":
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        items.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return items;
  }, [category, filter, sort, location.pathname, specialRoute]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, filter, sort, location.pathname]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              className="flex items-center gap-2 uppercase tracking-[0.2em] text-sm cursor-pointer"
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
          <span className="uppercase tracking-[0.2em] text-sm">
            {filteredProducts.length} Products
          </span>

          {/* SORT */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 uppercase tracking-[0.2em] text-sm cursor-pointer"
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
        {filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-4xl mb-4">🧺</p>
            <p className="uppercase tracking-[0.2em] text-sm text-gray-400">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {paginatedProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="
                w-10 h-10 flex items-center justify-center
                border border-[#ddd6ce] uppercase tracking-widest text-xs
                disabled:opacity-30 disabled:cursor-not-allowed
                hover:bg-black hover:text-white hover:border-black
                transition cursor-pointer
              "
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="
                w-10 h-10 flex items-center justify-center
                border border-[#ddd6ce] uppercase tracking-widest text-xs
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