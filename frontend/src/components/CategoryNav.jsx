import { Link, useParams } from "react-router-dom";

const categories = [
  {
    name: "Tops",
    slug: "tops",
  },
  {
    name: "White Dresses",
    slug: "white-dresses",
  },
  {
    name: "Sequin Dresses",
    slug: "sequin-dresses",
  },
  {
    name: "Long Sleeve Dresses",
    slug: "long-sleeve-dresses",
  },
];

const CategoryNav = () => {
  const { category } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4">

      <div className="border-y border-[#ddd6ce] py-7">

        <h2
          className="
            text-sm
            uppercase
            tracking-[0.25em]
            text-[#7f6d5b]
            mb-6
          "
        >
          Shop By Category
        </h2>

        <div className="flex flex-wrap gap-8">

          {categories.map((item) => (
            <Link
              key={item.slug}
              to={`/collection/${item.slug}`}
              className={`
                relative
                uppercase
                text-sm
                tracking-[0.2em]
                pb-2
                transition-all

                ${
                  category === item.slug
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                }
              `}
            >
              {item.name}

              {category === item.slug && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[1px]
                    w-full
                    bg-black
                  "
                />
              )}
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
};

export default CategoryNav;