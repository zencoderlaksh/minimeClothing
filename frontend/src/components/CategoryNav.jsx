import { useNavigate } from "react-router-dom";

// Updated to reflect the categories in your navbar
const categories = [
  {
    title: "KURTIS",
    slug: "kurtis",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80", 
  },
  {
    title: "COORD SETS",
    slug: "coord-sets",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80", 
  },
  {
    title: "TOPS",
    slug: "tops",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    title: "DRESSES", // Combines White, Sequin, and Long Sleeve Dresses
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
  },
  {
    title: "JUMPSUITS",
    slug: "jumpsuits",
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&q=80",
  },
  {
    title: "LOUNGEWEAR",
    slug: "loungewear",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
];

const CategoryNav = ({ activeSlug }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f8f6f2] py-14">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Updated Heading */}
        <h2 className="text-center text-4xl font-medium uppercase tracking-wide mb-12">
          Shop by Category
        </h2>

        {/* Categories */}
        <div className="flex justify-center gap-6 overflow-x-auto pb-2">
          {categories.map((item) => {
            // Check if the current route matches the slug to apply active styling
            const isActive = item.slug === activeSlug;

            return (
              <button
                key={item.slug}
                onClick={() => navigate(`/collection/${item.slug}`)}
                className="flex flex-col items-center group shrink-0 cursor-pointer"
              >
                <div
                  className={`
                    bg-[#f4f2eb]
                    p-3
                    transition-all duration-300
                    ${
                      isActive
                        ? "ring-2 ring-black"
                        : "group-hover:ring-1 group-hover:ring-black/30"
                    }
                  `}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-[130px]
                      h-[190px]
                      object-cover
                      object-top
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />
                </div>

                <span
                  className={`
                    mt-4
                    text-[14px]
                    uppercase
                    font-medium
                    whitespace-nowrap
                    ${
                      isActive
                        ? "text-black"
                        : "text-gray-700 group-hover:text-black"
                    }
                  `}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;