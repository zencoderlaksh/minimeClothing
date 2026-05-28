import {
  HiOutlineSparkles,
  HiOutlineCreditCard,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { FiHeadphones } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Details() {
  const features = [
    {
      icon: <HiOutlineSparkles />,
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
      title: "Premium Quality",
      description:
        "Crafted with exceptional attention to detail using premium fabrics and refined finishing touches.",
    },
    {
      icon: <HiOutlineCreditCard />,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      title: "Secure Payments",
      description:
        "Trusted payment gateways ensuring a smooth, reliable, and secure shopping experience.",
    },
    {
      icon: <HiOutlineGlobeAlt />,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      title: "Exclusive Designs",
      description:
        "Carefully curated collections inspired by timeless fashion and modern elegance.",
    },
    {
      icon: <FiHeadphones />,
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      title: "Dedicated Support",
      description:
        "Our team is available to assist you throughout your shopping journey.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 70,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#F5F4ED] py-28">
      {/* Background Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-20
          -left-20
          h-80
          w-80
          rounded-full
          bg-[#DAD5C8]
          blur-[120px]
        "
      />

      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0
          h-96
          w-96
          rounded-full
          bg-[#556B2F]/20
          blur-[140px]
        "
      />

      {/* Decorative Circle */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          top-20
          right-20
          hidden
          lg:block
          h-72
          w-72
          rounded-full
          border
          border-[#556B2F]/10
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-[1600px] mx-auto px-6 lg:px-12"
      >
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-sm font-medium text-[#556B2F]">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-5xl md:text-6xl font-serif text-black">
            Crafted For Modern Elegance
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Experience premium craftsmanship, exclusive collections, and
            exceptional service designed for those who appreciate refined style.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/60
                bg-white/70
                backdrop-blur-xl
                shadow-sm
              "
            >
              {/* Hover Glow */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-0
                  transition-all
                  duration-500
                  group-hover:opacity-100
                  bg-gradient-to-br
                  from-[#556B2F]/10
                  via-transparent
                  to-[#B08D57]/10
                "
              />

              {/* Top Accent */}
              <div
                className="
                  absolute
                  top-0
                  left-0
                  h-[3px]
                  w-0
                  bg-[#556B2F]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/40
                    via-black/10
                    to-transparent
                  "
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                  }}
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-[#556B2F]
                    to-[#78884F]
                    text-white
                    text-4xl
                    shadow-lg
                  "
                >
                  {feature.icon}
                </motion.div>

                <h3
                  className="
                    mt-7
                    text-3xl
                    font-serif
                    text-black
                    transition-colors
                    duration-300
                    group-hover:text-[#556B2F]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-gray-600
                    leading-relaxed
                  "
                >
                  {feature.description}
                </p>

                {/* Animated Underline */}
                <div
                  className="
                    mt-8
                    h-[2px]
                    w-0
                    bg-[#556B2F]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

                {/* Decorative Corner */}
                <div
                  className="
                    absolute
                    -right-10
                    -bottom-10
                    h-28
                    w-28
                    rounded-full
                    bg-[#556B2F]/5
                    scale-0
                    transition-all
                    duration-500
                    group-hover:scale-150
                  "
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}