import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await res.json();
        
        if (data.success) {
          const uniqueCats = [];
          const seen = new Set();
          
          data.products.forEach(product => {
            const catName = product.category;
            if (!seen.has(catName)) {
              seen.add(catName);
              uniqueCats.push({
                name: catName,
                image: product.images?.[0] || "",
                link: catName.toLowerCase()
              });
            }
          });
          
          setCategories(uniqueCats.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <section className="bg-[#F5F4ED] py-16 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LEFT SIDE */}
          <div className="px-6 lg:px-12 lg:w-[25%] flex flex-col justify-center">

            <div className="animate-[fadeUp_0.8s_ease-out]">

              <h2
                className="
                  text-5xl
                  md:text-6xl
                  font-serif
                  text-[#222]
                "
              >
                Just In
              </h2>

              <p
                className="
                  mt-8
                  text-lg
                  md:text-xl
                  text-gray-700
                  leading-relaxed
                "
              >
                Explore this season's newest arrivals and discover
                beautifully crafted pieces designed for modern elegance.
              </p>

              <Link
                to="/collection"
                className="
                  inline-block
                  mt-10
                  bg-[#1F1F23]
                  text-white
                  px-10
                  py-4
                  uppercase
                  tracking-wide
                  font-medium
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Shop Now
              </Link>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-[75%]">

            {/* Scroll on Mobile/Tablet */}
            <div
              className="
                flex
                lg:grid
                lg:grid-cols-4
                gap-8
                overflow-x-auto
                px-6
                lg:px-0
                scrollbar-hide
              "
            >
              {loading ? (
                <div className="w-full text-center py-20 text-gray-500">Loading categories...</div>
              ) : categories.length > 0 ? (
                categories.map((item, index) => (
                  <Link
                    key={index}
                    to={`/collection/${item.link}`}
                    className="
                      min-w-[220px]
                      md:min-w-[260px]
                      lg:min-w-0
                      group
                      flex
                      flex-col
                      items-center
                    "
                  >
                    <div className="overflow-hidden w-full aspect-[3/4] rounded-[20px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-full h-full object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    </div>
                    <h3 className="mt-6 text-center text-lg md:text-xl font-medium uppercase tracking-wide">
                      {item.name}
                    </h3>
                  </Link>
                ))
              ) : (
                <div className="w-full text-center py-20 text-gray-500">No categories found.</div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}