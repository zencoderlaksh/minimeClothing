import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function MagneticButton({ children, loading, onClick, type = "button", variant = "primary" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "relative w-full overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-medium tracking-[0.2em] uppercase transition-shadow";
  const styles =
    variant === "primary"
      ? "bg-ink text-cream shadow-[0_10px_30px_-10px_rgba(20,15,10,0.5)] hover:shadow-[0_20px_50px_-15px_rgba(20,15,10,0.6)]"
      : "bg-white/70 text-ink border border-[color:var(--nude)]/40 hover:border-[color:var(--gold)]";

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      whileTap={{ scale: 0.97 }}
      disabled={loading}
      className={`${base} ${styles} disabled:opacity-70`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {children}
      </span>
      {variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--gold) 35%, transparent), transparent 60%)",
          }}
        />
      ) : null}
    </motion.button>
  );
}
