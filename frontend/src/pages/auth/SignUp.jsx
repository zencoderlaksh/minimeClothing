import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import AuthLayout from "./components/AuthLayout";
import { Field } from "./components/Field";
import MagneticButton from "./components/MagneticButton";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validation = signupSchema.safeParse({
      name,
      email,
      password,
      phoneNumber,
      city,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          city,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to register.");
      }

      console.log("[Register] Database user registered successfully:", data.user);
      
      // Redirect to the home page on successful signup
      navigate("/");
    } catch (err) {
      console.error("SignUp error caught:", err);
      setError(err.message || "Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout tagline="MiniMe Essentials." kicker="Join the next edition.">
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
        <motion.div variants={item}>
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold-deep">New Member</p>
          <h2 className="mt-3 font-serif-display text-4xl leading-tight text-ink sm:text-5xl">
            Create account.
          </h2>
          <p className="mt-2 text-sm text-ink/60 mb-8">
            A private wardrobe, early drops, and quiet luxury.
          </p>
        </motion.div>

        {error && (
          <motion.p variants={item} className="text-red-500 text-xs mb-4 bg-red-100 p-2 rounded">
            {error}
          </motion.p>
        )}

        <form className="space-y-4">
          <motion.div variants={item}>
            <Field label="Full name" icon={User} value={name} onChange={setName} required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Email address" type="email" icon={Mail} value={email} onChange={setEmail} required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Password" type="password" icon={Lock} value={password} onChange={setPassword} required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="Phone number" type="tel" icon={Phone} value={phoneNumber} onChange={setPhoneNumber} required />
          </motion.div>
          <motion.div variants={item}>
            <Field label="City" type="text" icon={MapPin} value={city} onChange={setCity} required />
          </motion.div>
          
          <motion.div variants={item} className="pt-4 text-white">
            <MagneticButton type="button" loading={loading} onClick={submit}>
              Become a Member
            </MagneticButton>
          </motion.div>

          <motion.p variants={item} className="mt-8 text-center text-xs text-ink/60">
            Already a member?{" "}
            <Link to="/login" className="group relative font-medium text-ink">
              Sign in
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--gold-deep)] transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </AuthLayout>
  );
}