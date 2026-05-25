import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Sophia Carter",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
  },
  {
    name: "Emma Wilson",
    role: "Lead Fashion Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
  },
  {
    name: "Olivia Brown",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800",
  },
];

const statsData = [
  { end: 15000, suffix: "+", label: "Happy Customers" },
  { end: 200, suffix: "+", label: "Fashion Products" },
  { end: 50, suffix: "+", label: "Cities Served" },
  { end: 98, suffix: "%", label: "Customer Satisfaction" },
];

const useCountUp = (end, duration = 1800, trigger = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [trigger, end, duration]);

  return count;
};

const StatCard = ({ end, suffix, label, trigger }) => {
  const count = useCountUp(end, 1800, trigger);
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-300">
      <h3 className="text-4xl font-bold text-[#C9A66B]">
        {end >= 1000 ? count.toLocaleString() : count}
        {suffix}
      </h3>
      <p className="mt-2 text-gray-600">{label}</p>
    </div>
  );
};

const About = () => {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FFFDF8] text-gray-800 overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            ← Home
          </Link>
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About MiniME
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Celebrating confidence, beauty, and individuality through timeless
              fashion made for every woman.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000"
              alt="Collection"
              className="rounded-3xl shadow-xl hover:scale-105 transition-all duration-500"
            />
          </div>
          <div>
            <span className="text-[#C9A66B] font-semibold uppercase tracking-widest">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
              Fashion That Inspires Confidence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Our journey began with a simple idea: every woman deserves to feel
              beautiful, confident, and empowered. We create collections that
              blend elegance, comfort, and contemporary fashion trends.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're dressing for everyday moments or special occasions,
              our designs are crafted to complement your unique personality and
              style.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F7F1E8] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#C9A66B]">
            Why Women Love Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✨",
                title: "Premium Quality",
                text: "Carefully selected fabrics and expert craftsmanship in every design.",
              },
              {
                icon: "👗",
                title: "Latest Trends",
                text: "Inspired by modern fashion while maintaining timeless elegance.",
              },
              {
                icon: "💖",
                title: "Empowering Women",
                text: "Fashion created to celebrate confidence and individuality.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-24" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} trigger={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#F7F1E8] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#C9A66B] mb-16">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-[#C9A66B] text-sm mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Fashion That Reflects You
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Explore our latest collection and find pieces designed to make every
            moment stylish and unforgettable.
          </p>
          <Link
            to="/collection"
            className="inline-block bg-[#C9A66B] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#b89358] hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;