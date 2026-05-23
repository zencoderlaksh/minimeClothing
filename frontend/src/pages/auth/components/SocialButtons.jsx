import { motion } from "framer-motion";

const providers = [
  {
    name: "Google",
    icon: (
      <svg viewBox="0 0 48 48" className="h-4 w-4">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6 29.6 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.2-.1-2.3-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.6 6.9 29.6 5 24 5 16.3 5 9.6 9.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2 14-5.3l-6.5-5.3c-2 1.4-4.6 2.3-7.5 2.3-5.3 0-9.7-3.4-11.3-8.1L6 32.2C9.2 38.9 16 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.5 5.3c-.5.5 7-5 7-15 0-1.2-.1-2.3-.4-3.5z" />
      </svg>
    ),
  },
  {
    name: "Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M16.4 12.8c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-1.6-.2-3.2 1-4 1-.8 0-2.1-1-3.5-1-1.8 0-3.4 1-4.3 2.7-1.9 3.2-.5 8 1.3 10.6.9 1.3 2 2.7 3.4 2.7 1.4-.1 1.9-.9 3.5-.9 1.7 0 2.1.9 3.6.9 1.5 0 2.4-1.3 3.3-2.6 1-1.5 1.5-3 1.5-3.1-.1-.1-2.9-1.1-2.9-4.4zM13.9 4.4c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.3-.6 3-1.5z" />
      </svg>
    ),
  },
  {
    name: "X",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.03L4.6 22H1.34l8.02-9.17L1 2h7l4.85 6.4L18.244 2zm-1.2 18h1.86L7.04 4H5.1l11.944 16z" />
      </svg>
    ),
  },
];

export default function SocialButtons() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {providers.map((p, i) => (
        <motion.button
          key={p.name}
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i + 0.2 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--nude)]/40 bg-white/60 py-2.5 text-xs text-ink/80 transition-colors hover:border-[color:var(--gold)] hover:bg-white/80"
          aria-label={`Continue with ${p.name}`}
        >
          {p.icon}
        </motion.button>
      ))}
    </div>
  );
}
