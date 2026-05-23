import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import { Field, Checkbox } from "./components/Field";
import MagneticButton from "./components/MagneticButton";
import SocialButtons from "./components/SocialButtons";

import "./components/style.css"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!terms) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  return (
    <AuthLayout tagline="MiniMe Essentials." kicker="Join the next edition.">
      <motion.div variants={stagger} initial="hidden" animate="show">
        <motion.div variants={item}>
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold-deep">New Member</p>
          <h2 className="mt-3 font-serif-display text-4xl leading-tight text-ink sm:text-5xl">
            Create <em className="gold-gradient-text not-italic">account.</em>
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            A private wardrobe, early drops, and quiet luxury.
          </p>
        </motion.div>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <motion.div variants={item}>
            <Field label="Full name" icon={User} value={name} onChange={setName} autoComplete="name" required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Email address" type="email" icon={Mail} value={email} onChange={setEmail} autoComplete="email" required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Password" type="password" icon={Lock} value={password} onChange={setPassword} autoComplete="new-password" required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Confirm password" type="password" icon={Lock} value={confirm} onChange={setConfirm} autoComplete="new-password" required />
          </motion.div>

          <motion.div variants={item} className="pt-1">
            <Checkbox checked={terms} onChange={setTerms}>
              I agree to the <a href="#" className="underline decoration-[color:var(--gold-deep)]/60 underline-offset-2">Terms</a> and{" "}
              <a href="#" className="underline decoration-[color:var(--gold-deep)]/60 underline-offset-2">Privacy Policy</a>.
            </Checkbox>
          </motion.div>

          <motion.div variants={item} className="pt-2 text-white">
            <MagneticButton type="submit" loading={loading}>Become a Member</MagneticButton>
          </motion.div>
        </form>

        <motion.div variants={item} className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[color:var(--nude)]/40" />
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ink/45">or sign up with</span>
          <span className="h-px flex-1 bg-[color:var(--nude)]/40" />
        </motion.div>

        <motion.div variants={item}>
          <SocialButtons />
        </motion.div>

        <motion.p variants={item} className="mt-8 text-center text-xs text-ink/60">
          Already a member?{" "}
          <Link to="/login" className="group relative font-medium text-ink">
            Sign in
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--gold-deep)] transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
