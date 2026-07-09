import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  ArrowUpRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Contact() {
  return (
    <main className="relative overflow-hidden bg-[#f8f4ee] text-[#1d1d1b]">

      {/* BACKGROUND GLOWS */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#ead7b0]/30 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#d4af37]/10 blur-3xl" />
      </div>

      {/* HERO */}

      <section className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-24 lg:px-12">

        <div className="grid w-full grid-cols-1 gap-20 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT */}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10"
          >
            <motion.div
              variants={fadeUp}
              className="mb-10 flex items-center gap-4"
            >
              <div className="h-px w-20 bg-[#d4af37]" />

              <span className="text-[11px] uppercase tracking-[0.45em] text-[#1d1d1b]/50">
                MiniMe Atelier
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-[clamp(4rem,8vw,7rem)] leading-[0.9] tracking-[-0.05em]"
            >
              Let’s
              <br />

              <span className="bg-gradient-to-r from-[#c89b3c] to-[#f1dfb2] bg-clip-text text-transparent">
                Connect.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-xl text-[15px] leading-[2] text-[#1d1d1b]/60"
            >
              Whether you’re styling your next signature look,
              collaborating with MiniMe, or simply saying hello —
              we would love to hear from you.

              <span className="mt-5 block text-[#1d1d1b]/40">
                Crafted conversations. Timeless fashion.
              </span>
            </motion.p>

            {/* CTA ROW */}

            <motion.div
              variants={fadeUp}
              className="mt-14 flex flex-wrap items-center gap-6"
            >
              <button className="group relative overflow-hidden rounded-full bg-[#1d1d1b] px-8 py-4 text-[11px] uppercase tracking-[0.35em] text-white transition-all duration-500 hover:scale-[1.03]">

                <span className="relative z-10">
                  Visit Showroom
                </span>

                <div className="absolute inset-0 translate-y-full bg-[#d4af37] transition-transform duration-500 group-hover:translate-y-0" />
              </button>

              <button className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#1d1d1b]/55 transition hover:text-[#1d1d1b]">
                Explore Collection

                <span className="h-px w-10 bg-[#1d1d1b]/30 transition-all duration-300 group-hover:w-16" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT VISUAL CARD */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >

            {/* MAIN GLASS CARD */}

            <div className="absolute right-0 top-0 w-[420px] rounded-[36px] border border-white/30 bg-white/40 p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl">

              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#1d1d1b]/45">
                  Private Styling
                </span>

                <div className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <div className="mt-24">
                <h3 className="font-serif text-5xl leading-none">
                  Tailored
                  <br />
                  Luxury
                </h3>

                <p className="mt-6 text-sm leading-relaxed text-[#1d1d1b]/55">
                  Discover elevated essentials designed with
                  elegance, comfort, and timeless sophistication.
                </p>
              </div>
            </div>

            {/* SMALL FLOATING CARD */}

            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-8 left-0 w-[260px] rounded-[30px] border border-black/5 bg-[#fdfaf5]/90 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#1d1d1b]/45">
                Edition 
              </span>

              <p className="mt-5 text-lg leading-relaxed text-[#1d1d1b]/75">
                Minimal silhouettes with premium craftsmanship.
              </p>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[#1d1d1b]/40">
                  Explore
                </span>

                <ArrowUpRight size={18} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT DETAILS SECTION */}

      <section className="relative mx-auto max-w-7xl px-6 py-28 lg:px-12">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] uppercase tracking-[0.45em] text-[#1d1d1b]/45"
          >
            Our Contact Details
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[1] tracking-[-0.04em]"
          >
            Reach
            <span className="bg-gradient-to-r from-[#c89b3c] to-[#f0ddb0] bg-clip-text text-transparent">
              {" "}MiniMe
            </span>
          </motion.h2>
        </motion.div>

        {/* CONTACT GRID */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {[
            {
              icon: Mail,
              title: "Email",
              value: "clothingminime4@gmail.com",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+91 98765 43210",
            },
            {
              icon: MapPin,
              title: "Studio",
              value: "New Delhi, India",
            },
            {
              icon: Camera,
              title: "Instagram",
              value: "@minime.studio",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -10,
              }}
              className="group relative overflow-hidden rounded-[32px] border border-white/30 bg-white/40 p-8 backdrop-blur-2xl transition-all duration-500 hover:border-[#d4af37]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >

              {/* GOLD GLOW */}

              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 via-[#d4af37]/0 to-[#d4af37]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1d1d1b]/5 transition-all duration-500 group-hover:bg-[#d4af37]/15">
                  <item.icon
                    size={24}
                    className="text-[#1d1d1b]/70"
                  />
                </div>

                <div className="mt-10">
                  <p className="text-[11px] uppercase tracking-[0.35em] text-[#1d1d1b]/45">
                    {item.title}
                  </p>

                  <h3 className="mt-4 text-xl leading-relaxed text-[#1d1d1b]/85">
                    {item.value}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}

      <section className="relative mx-auto max-w-5xl px-6 pb-32 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="overflow-hidden rounded-[40px] border border-white/30 bg-white/40 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.06)] backdrop-blur-2xl md:p-14"
        >

          <div className="grid gap-8 md:grid-cols-2">

            <input
              type="text"
              placeholder="Your Name"
              className="h-16 rounded-2xl border border-black/5 bg-white/50 px-6 outline-none transition-all duration-300 placeholder:text-[#1d1d1b]/35 focus:border-[#d4af37]/40 focus:bg-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="h-16 rounded-2xl border border-black/5 bg-white/50 px-6 outline-none transition-all duration-300 placeholder:text-[#1d1d1b]/35 focus:border-[#d4af37]/40 focus:bg-white"
            />

            <textarea
              rows="7"
              placeholder="Tell us about your vision..."
              className="col-span-full rounded-3xl border border-black/5 bg-white/50 p-6 outline-none transition-all duration-300 placeholder:text-[#1d1d1b]/35 focus:border-[#d4af37]/40 focus:bg-white"
            />

            <button className="group relative col-span-full overflow-hidden rounded-full bg-[#1d1d1b] px-10 py-5 text-[11px] uppercase tracking-[0.35em] text-white">

              <span className="relative z-10">
                Send Message
              </span>

              <div className="absolute inset-0 translate-y-full bg-[#d4af37] transition-transform duration-500 group-hover:translate-y-0" />
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}