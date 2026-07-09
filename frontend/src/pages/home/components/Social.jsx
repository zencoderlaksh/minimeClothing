import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const Social = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/videos`);
        const data = await res.json();
        if (data.success && data.videos.length > 0) {
          setVideos(data.videos);
        }
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };
    fetchVideos();
  }, []);

  if (videos.length === 0) return null;
  return (
    <section className="bg-[#f5f5f5] py-16 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-semibold">
            Let's Go Social!
          </h2>

          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Follow us on Instagram
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[EffectCoverflow, Autoplay, Navigation]}
          effect="coverflow"
          centeredSlides={true}
          loop={true}
          navigation={true}
          grabCursor={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 1.4,
            scale: 0.85,
          }}
          className="socialSwiper"
        >
          {videos.map((video) => (
            <SwiperSlide
              key={video._id}
              className="!w-[240px] sm:!w-[280px] md:!w-[380px] lg:!w-[520px]"
            >
              <div className="relative overflow-hidden rounded-[30px] shadow-2xl">
                <video
                  src={video.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="
                    w-full
                    h-[320px]
                    sm:h-[400px]
                    md:h-[520px]
                    lg:h-[650px]
                    object-cover
                  "
                />

                {/* Dark overlay on side slides */}
                <div className="slide-overlay absolute inset-0 bg-black/30 rounded-[30px]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Button */}
        <div className="flex justify-center mt-12">
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-black
              text-white
              px-8
              py-3
              rounded-full
              font-medium
              hover:scale-105
              transition-all
            "
          >
            Visit Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default Social;