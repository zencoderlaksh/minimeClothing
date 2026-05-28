import { useState, useId } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export function Field({ label, type = "text", icon: Icon, value, onChange, autoComplete, required }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const actualType = isPassword ? (show ? "text" : "password") : type;
  const floated = focused || (value && value.length > 0);

  return (
    <div className="relative">
      <div
        className={`input-glow group relative flex items-center rounded-2xl border bg-white/60 px-4 transition-all duration-300 ${
          focused ? "border-[color:var(--gold)]" : "border-[color:var(--nude)]/40"
        }`}
      >
        {Icon ? <Icon className="mr-3 h-4 w-4 text-ink/50" strokeWidth={1.5} /> : null}
        <div className="relative flex-1">
          <motion.label
            htmlFor={id}
            initial={false}
            animate={{
              y: floated ? -10 : 12,
              scale: floated ? 0.78 : 1,
              color: focused ? "var(--gold-deep)" : "rgba(40,30,20,0.55)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute left-0 top-0 origin-left text-sm tracking-wide"
          >
            {label}
          </motion.label>
          <input
            id={id}
            type={actualType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete={autoComplete}
            required={required}
            className="w-full bg-transparent pb-2 pt-6 text-[0.95rem] text-ink outline-none"
          />
        </div>
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="ml-2 rounded-full p-1.5 text-ink/50 transition hover:bg-[color:var(--gold)]/10 hover:text-ink"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" strokeWidth={1.5} /> : <Eye className="h-4 w-4" strokeWidth={1.5} />}
          </button>
        ) : null}
      </div>
    </div>
  );
}

// new checkbox
export function Checkbox({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-xs text-ink/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition ${
          checked
            ? "border-[color:var(--gold)] bg-[color:var(--gold)]/90"
            : "border-[color:var(--nude)]/60 bg-white/60"
        }`}
      >
        {checked ? (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            viewBox="0 0 16 16"
            className="h-3 w-3 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        ) : null}
      </span>
      <span className="leading-snug">{children}</span>
    </label>
  );
}
