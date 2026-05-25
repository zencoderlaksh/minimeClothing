import { Link } from "react-router-dom";
import {sequen,top,longsleeve,whitedress} from '../../../assets/images'
// Replace with your own images


export default function Category() {
  const categories = [
    {
      name: "TOPS",
      image: top,
      link: "/tops",
    },
    {
      name: "WHITE DRESSES",
      image: whitedress,
      link: "/white-dresses",
    },
    {
      name: "SEQUIN DRESSES",
      image: sequen,
      link: "/sequin-dresses",
    },
    {
      name: "LONG SLEEVE DRESSES",
      image: longsleeve,
      link: "/long-sleeve-dresses",
    },
  ];

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
              {categories.map((item, index) => (
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
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        h-[320px]
                        md:h-[380px]
                        lg:h-[420px]
                        object-contain
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>

                  <h3
                    className="
                      mt-8
                      text-center
                      text-lg
                      md:text-xl
                      font-medium
                      uppercase
                      tracking-wide
                    "
                  >
                    {item.name}
                  </h3>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}