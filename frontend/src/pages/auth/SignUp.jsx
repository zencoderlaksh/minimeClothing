import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/react";

import AuthLayout from "./components/AuthLayout";
import { Field } from "./components/Field";
import MagneticButton from "./components/MagneticButton";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered. isLoaded:", isLoaded, { email, name });
    
    if (!isLoaded) {
      console.error("Clerk is not loaded yet!");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const parts = name.split(" ");
      const firstName = parts[0];
      const lastName = parts.slice(1).join(" ");

      console.log("Attempting to sign up with:", { email, firstName, lastName, phoneNumber, city });
      
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
        unsafeMetadata: {
          phoneNumber,
          city,
        },
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("SignUp error:", err);
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/");
      } else {
        console.error(completeSignUp);
        setError("Unable to complete signup.");
      }
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Invalid code.");
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
            {pendingVerification ? "Verify Email" : "Create account."}
          </h2>
          <p className="mt-2 text-sm text-ink/60 mb-8">
            {pendingVerification 
              ? `We sent a code to ${email}`
              : "A private wardrobe, early drops, and quiet luxury."}
          </p>
        </motion.div>

        {error && (
          <motion.p variants={item} className="text-red-500 text-xs mb-4 bg-red-100 p-2 rounded">
            {error}
          </motion.p>
        )}

        {!pendingVerification ? (
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
        ) : (
          <form className="space-y-4">
            <motion.div variants={item}>
              <Field label="Verification Code" icon={Lock} value={code} onChange={setCode} required />
            </motion.div>
            <motion.div variants={item} className="pt-4 text-white">
              <MagneticButton type="button" loading={loading} onClick={onPressVerify}>
                Verify Code
              </MagneticButton>
            </motion.div>
          </form>
        )}
      </motion.div>
    </AuthLayout>
  );
}