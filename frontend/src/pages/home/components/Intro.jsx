import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { heroImage, heroImage2, heroImage3, heroImage4 } from "../../../assets/images";

const backgroundImages = [heroImage2, heroImage3, heroImage4, heroImage];

export default function Intro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  // Tell Navbar this page has a full-bleed hero → go transparent
  useEffect(() => {
    document.body.setAttribute("data-hero", "true");
    return () => document.body.removeAttribute("data-hero");
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    startTimer();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    startTimer();
  };

  return (
    /*
      -mt-[90px]  →  pulls the section up behind the sticky navbar (navbar height = 90px)
                     so the hero image fills the full viewport top-to-bottom.
      The navbar is transparent at this point, so the image bleeds through it.
    */
    <section className="relative min-h-screen w-full overflow-hidden bg-black -mt-[90px]">

      {/* Background Image Layers */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center"
          style={{
            backgroundImage: `url(${img})`,
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 cursor-pointer top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all duration-200 group backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all duration-200 group backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Hero Text — centered across the full viewport (image fills behind transparent navbar) */}
      <div className="relative z-20 h-screen flex flex-col items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-5xl md:text-7xl font-light tracking-wide">
            Timeless Elegance
            <br />
            For Every Woman
          </h1>
        </div>
      </div>

      {/* Bottom: CTA button + slide dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-6 w-full max-w-xs text-center">

        <Link
          to="/collection"
          className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-medium tracking-wide shadow-xl hover:scale-105 active:scale-95"
        >
          See Collection
        </Link>

        {/* Slide Indicators */}
        <div className="flex space-x-3 items-center justify-center">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white w-8" : "bg-white/40 w-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}