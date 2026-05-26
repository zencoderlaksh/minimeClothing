import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

export default function AuthLayout({
  children,
  tagline = "Wear Confidence.",
  kicker = "MiniMe Essentials.",
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const wrap = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      ref={wrap}
      className="relative min-h-screen w-full overflow-hidden bg-cream"
    >
      {/* Ambient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 45%, transparent), transparent)",
          x: mouse.x * 30,
          y: mouse.y * 30,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -right-40 h-[48rem] w-[48rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--nude) 65%, transparent), transparent)",
          x: mouse.x * -40,
          y: mouse.y * -40,
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 noise opacity-[0.35] mix-blend-multiply"
      />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT — Editorial */}
        <div className="relative hidden flex-col justify-between p-10 lg:flex xl:p-16">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="MiniMe"
              className="h-12 w-12 rounded-full object-cover ring-1 ring-[color:var(--gold)]/40"
            />
            <span className="font-serif-display text-xl tracking-[0.25em] text-ink">
              MINI&nbsp;ME
            </span>
          </motion.div>

          <div className="relative">
            <motion.div
              className="absolute -top-10 right-6 hidden h-44 w-64 rounded-3xl glass xl:block"
              style={{ x: mouse.x * 24, y: mouse.y * 24 }}
              initial={{ opacity: 0, y: 20, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <div className="flex h-full flex-col justify-between p-5">
                <span className="text-[0.65rem] uppercase font-bold tracking-[0.3em] text-ink/60">Showroom</span>
                <div>
                  <p className="font-serif-display text-2xl text-ink">Soft Tailoring</p>
                  <p className="text-xs text-ink/60">Linen · Silk · Cashmere</p>
                </div>
              </div>
            </motion.div>


            <motion.div
              className="absolute -bottom-6 right-32 hidden h-32 w-52 rounded-3xl glass xl:block"
              style={{ x: mouse.x * -18, y: mouse.y * -18 }}
              initial={{ opacity: 0, y: 30, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="flex h-full flex-col justify-between p-5">
                <span className="text-[0.6rem] uppercase font-bold tracking-[0.3em] text-ink/60">Edition </span>
                <p className="text-sm text-ink/80">The Essentials Capsule</p>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink"
            >
              {tagline.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="mr-3 inline-block"
                >
                  {w === "Confidence." ? <em className="gold-gradient-text not-italic">{w}</em> : w}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-ink/65"
            >
              A quiet wardrobe of considered pieces — built from the softest fibers,
              cut for a life lived well. {kicker}
            </motion.p>
          </div>

        

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.3em] text-ink/50"
          >
            <span>© MiniMe Atelier</span>
            <span>Paris · Tokyo · NYC</span>
          </motion.div>
        </div>

        {/* RIGHT — Auth card */}
        <div className="relative flex items-center justify-center p-6 sm:p-10">
          {/* mobile logo */}
          <div className="absolute left-1/2 top-6 flex -translate-x-1/2 items-center gap-2 lg:hidden">
            <img
              src={logo}
              alt="MiniMe"
              className="h-9 w-9 rounded-full object-cover ring-1 ring-[color:var(--gold)]/40"
            />
            <span className="font-serif-display text-base tracking-[0.3em] text-ink">
              MINI&nbsp;ME
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="glass relative mt-16 w-full max-w-md rounded-[2rem] p-8 sm:p-10 lg:mt-0"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[2rem]"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--gold) 30%, transparent), transparent 40%, color-mix(in oklab, var(--gold) 20%, transparent))",
                WebkitMask:
                  "linear-gradient(#000,#000) content-box,linear-gradient(#000,#000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: 1,
              }}
            />
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
