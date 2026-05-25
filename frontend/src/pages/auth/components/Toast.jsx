// components/Toast.jsx

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

/**
 * Floating toast notification.
 *
 * @param {{ message: string|null, type: "success"|"error", onDone?: () => void }} props
 */
export default function Toast({ message, type = "success", onDone }) {
  // Auto-dismiss handled by store; this just animates out
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onDone?.(), 3200);
    return () => clearTimeout(t);
  }, [message]);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-6 left-1/2 z-[999] -translate-x-1/2"
        >
          <div
            className={`
              flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl
              backdrop-blur-md border text-sm font-medium
              ${
                isSuccess
                  ? "bg-white/90 border-[color:var(--gold-deep)]/30 text-ink"
                  : "bg-white/90 border-red-300/60 text-red-700"
              }
            `}
          >
            {isSuccess ? (
              <CheckCircle
                size={17}
                className="shrink-0"
                style={{ color: "var(--gold-deep)" }}
              />
            ) : (
              <XCircle size={17} className="shrink-0 text-red-500" />
            )}
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}