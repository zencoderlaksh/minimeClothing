import { motion } from "framer-motion";
import { SignIn } from "@clerk/react";
import AuthLayout from "./components/AuthLayout";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Login() {
  return (
    <AuthLayout tagline="Wear Confidence." kicker="Welcome back to MiniMe.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
        <motion.div variants={item}>
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold-deep">Members</p>
          <h2 className="mt-3 font-serif-display text-4xl leading-tight text-ink sm:text-5xl">
            Sign <em className="gold-gradient-text not-italic">in.</em>
          </h2>
          <p className="mt-2 text-sm text-ink/60 mb-8">
            Continue your edit. Your wishlist is waiting.
          </p>
        </motion.div>
        
        <motion.div variants={item}>
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/signup"
            appearance={{
              elements: {
                formButtonPrimary: "bg-[color:var(--gold-deep)] hover:bg-[color:var(--gold-deep)]/90 text-white shadow-none uppercase tracking-widest text-xs py-3 rounded-none",
                card: "bg-transparent shadow-none w-full p-0 m-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border border-[color:var(--nude)] text-ink hover:bg-[color:var(--nude)]/20 shadow-none rounded-none",
                formFieldInput: "bg-transparent border-b border-[color:var(--nude)] rounded-none px-0 py-2 focus:ring-0 focus:border-[color:var(--gold-deep)] shadow-none text-ink outline-none",
                formFieldLabel: "text-ink/60 text-xs tracking-widest uppercase mb-2",
                footerAction: "hidden", // We use our own custom titles above
                dividerRow: "hidden",
                socialButtons: "mb-6",
                logoBox: "hidden",
                formFieldLabelRow: "mb-0",
                identityPreviewEditButton: "text-[color:var(--gold-deep)] hover:text-ink transition-colors",
                formResendCodeLink: "text-[color:var(--gold-deep)] hover:text-ink transition-colors"
              }
            }}
          />
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}