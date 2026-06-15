import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  heroImage,
  heroImage2,
  heroImage3,
  heroImage4,
} from "../../../assets/images";

const backgroundImages = [
  heroImage2,
  heroImage3,
  heroImage4,
  heroImage,
];

export default function Intro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    document.body.setAttribute("data-hero", "true");
    return () => document.body.removeAttribute("data-hero");
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
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
      prevIndex === 0
        ? backgroundImages.length - 1
        : prevIndex - 1
    );

    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % backgroundImages.length
    );

    startTimer();
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    startTimer();
  };

  const currentImage = backgroundImages[currentIndex];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black -mt-[90px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentImage}
          alt="Hero"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Previous Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all duration-200 group backdrop-blur-sm cursor-pointer"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/20 hover:bg-white/20 text-white transition-all duration-200 group backdrop-blur-sm cursor-pointer"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Hero Content */}
      <div className="relative z-20 h-screen flex flex-col items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-white text-5xl md:text-7xl font-extralight tracking-[0.15em] uppercase">
            Timeless Elegance
            <br />
            For Every Woman
          </h1>

          <p className="text-white/80 mt-6 text-lg tracking-widest uppercase">
            New Season Collection
          </p>
        </div>
      </div>

      {/* CTA + Thumbnail Carousel */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 w-full px-4">
        <Link
          to="/collection"
          className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 font-medium tracking-wide shadow-xl hover:scale-105 active:scale-95"
        >
          See Collection
        </Link>

        {/* Thumbnail Carousel */}
        {/* Carousel Dots */}
<div className="flex items-center justify-center gap-3">
  {backgroundImages.map((_, index) => (
    <button
      key={index}
      onClick={() => handleDotClick(index)}
      aria-label={`Go to slide ${index + 1}`}
      className={`transition-all duration-300 rounded-full cursor-pointer ${
        currentIndex === index
          ? "w-8 h-2 bg-white"
          : "w-2 h-2 bg-white/50 hover:bg-white/80"
      }`}
    />
  ))}
</div>
      </div>
    </section>
  );
}