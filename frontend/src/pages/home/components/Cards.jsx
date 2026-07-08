import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "../../../components/Card";

const FeaturedCollection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products?newArrivals=true`);
        const data = await res.json();
        if (data.success) {
          // Show up to 4 new arrivals
          setFeaturedProducts(data.products.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch new arrivals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <section className="bg-[#faf8f5] py-24">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">

          <div>
            <span className="text-sm uppercase tracking-[0.35em] text-[#b8a089]">
              New Collection
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-light text-[#2d2d2d] leading-tight">
              Designed For
              <br />
              Everyday Elegance
            </h2>

            <p className="mt-5 max-w-xl text-gray-500 leading-relaxed">
              Discover timeless silhouettes, luxurious fabrics,
              and statement pieces crafted to elevate every moment.
            </p>
          </div>

          <Link
            to="/collection"
            className="
              group
              self-start
              lg:self-auto
              flex
              items-center
              gap-3
              text-[#2d2d2d]
              font-medium
            "
          >
            <span className="border-b border-[#d8c9bb] pb-1">
              Explore Collection
            </span>

            <div
              className="
                w-10
                h-10
                rounded-full
                border
                border-[#d8c9bb]
                flex
                items-center
                justify-center
                transition-all
                duration-300
                group-hover:translate-x-2
                group-hover:bg-[#efe7de]
              "
            >
              →
            </div>
          </Link>

        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-20 text-[#b8a089]">Loading collection...</div>
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full flex justify-center py-20 text-[#b8a089]">No new arrivals found.</div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/collection"
            className="
              group
              relative
              overflow-hidden
              px-10
              py-4
              rounded-full
              bg-[#efe7de]
              text-[#2d2d2d]
              font-medium
              tracking-wide
            "
          >
            <span className="relative z-10">
              View All Products
            </span>

            <div
              className="
                absolute
                inset-0
                bg-[#e2d4c5]
                scale-x-0
                origin-left
                transition-transform
                duration-500
                group-hover:scale-x-100
              "
            />

          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;