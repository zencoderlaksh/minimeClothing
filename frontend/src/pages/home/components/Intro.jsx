import { Link } from "react-router-dom";
import { heroImage } from "../../../assets/images"; 

export default function Intro() {
  return (
    <section
      className="relative h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl text-center px-6">

          {/* Heading */}
          <h1
            className="
              text-white
              text-5xl
              md:text-7xl
              font-light
              leading-tight
              tracking-wide
              animate-[fadeUp_1s_ease-out]
            "
          >
            Timeless Elegance
            <br />
            For Every Woman
          </h1>

          {/* Paragraph */}
          <p
            className="
              mt-6
              text-white/90
              text-lg
              md:text-xl
              max-w-2xl
              mx-auto
              leading-relaxed
              animate-[fadeUp_1.3s_ease-out]
            "
          >
            Discover thoughtfully crafted pieces designed to celebrate
            confidence, comfort, and effortless style. From everyday
            essentials to statement looks, find fashion that moves with you.
          </p>

          {/* Button */}
          <div className="mt-10 animate-[fadeUp_1.6s_ease-out]">
            <Link
              to="/collection"
              className="
                inline-block
                px-8
                py-4
                bg-white
                text-black
                text-lg
                font-medium
                rounded-full
                hover:scale-105
                hover:bg-[#FEF9F3]
                transition-all
                duration-300
              "
            >
              See Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}