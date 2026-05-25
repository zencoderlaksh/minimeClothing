import {
  HiOutlineSparkles,
  HiOutlineCreditCard,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { FiHeadphones } from "react-icons/fi";
export default function Details() {
  const features = [
    {
      icon: <HiOutlineSparkles />,
      title: "Premium Quality",
      description:
        "Crafted with attention to detail using high-quality materials.",
    },
    {
      icon: <HiOutlineCreditCard />,
      title: "Secure Payments",
      description:
        "Safe and reliable payment options for a smooth checkout experience.",
    },
    {
      icon: <HiOutlineGlobeAlt />,
      title: "Exclusive Designs",
      description:
        "Stand out with carefully curated and trend-forward styles.",
    },
    {
      icon: <FiHeadphones />,
      title: "Dedicated Support",
      description:
        "We're here to help you at every step of your shopping journey.",
    },
  ];

  return (
    <section className="bg-[#F5F4ED] py-20">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-10">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="
                bg-transparent
                border
                border-gray-200
                rounded-[30px]
                px-8
                py-10
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-sm
              "
            >
              {/* Icon Circle */}
              <div
                className="
                  w-24
                  h-24
                  mx-auto
                  rounded-full
                  bg-[#ECEBE8]
                  flex
                  items-center
                  justify-center
                  text-4xl
                  text-black
                "
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="
                  mt-8
                  text-3xl
                  font-serif
                  text-black
                "
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="
                  mt-5
                  text-lg
                  text-gray-700
                  leading-relaxed
                "
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}