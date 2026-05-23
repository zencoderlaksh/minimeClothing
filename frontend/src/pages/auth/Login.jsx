// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Lock } from "lucide-react";
// // import { Link } from "@tanstack/react-router";
// import { Link } from "react-router-dom";
// import AuthLayout from "./components/AuthLayout";
// import { Field, Checkbox } from "./components/Field";
// import MagneticButton from "./components/MagneticButton";
// import SocialButtons from "./components/SocialButtons";
// import "./components/style.css"

// const stagger = {
//   hidden: {},
//   show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
// };
// const item = {
//   hidden: { opacity: 0, y: 14 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
// };

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => setLoading(false), 1400);
//   };

//   return (
//     <AuthLayout tagline="Wear Confidence." kicker="Welcome back to MiniMe.">
//       <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
//         <motion.div variants={item}>
//           <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold-deep">Members</p>
//           <h2 className="mt-3 font-serif-display text-4xl leading-tight text-ink sm:text-5xl">
//             Sign <em className="gold-gradient-text not-italic">in.</em>
//           </h2>
//           <p className="mt-2 text-sm text-ink/60">
//             Continue your edit. Your wishlist is waiting.
//           </p>
//         </motion.div>

//         <form onSubmit={submit} className="mt-8 space-y-4">
//           <motion.div variants={item}>
//             <Field label="Email address" type="email" icon={Mail} value={email} onChange={setEmail} autoComplete="email" required />
//           </motion.div>
//           <motion.div variants={item}>
//             <Field label="Password" type="password" icon={Lock} value={password} onChange={setPassword} autoComplete="current-password" required />
//           </motion.div>

//           <motion.div variants={item} className="flex items-center justify-between pt-1">
//             <Checkbox checked={remember} onChange={setRemember}>Remember me</Checkbox>
//             <a href="#" className="group relative text-xs text-ink/70">
//               Forgot password?
//               <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[color:var(--gold-deep)] transition-all duration-300 group-hover:w-full" />
//             </a>
//           </motion.div>

//           <motion.div variants={item} className="pt-2 text-white">
//             <MagneticButton type="submit" loading={loading}>Enter the Atelier</MagneticButton>
//           </motion.div>
//         </form>

//         <motion.div variants={item} className="my-6 flex items-center gap-3">
//           <span className="h-px flex-1 bg-[color:var(--nude)]/40" />
//           <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ink/45">or continue with</span>
//           <span className="h-px flex-1 bg-[color:var(--nude)]/40" />
//         </motion.div>

//         <motion.div variants={item}>
//           <SocialButtons />
//         </motion.div>

//         <motion.p variants={item} className="mt-8 text-center text-xs text-ink/60">
//           New to MiniMe?{" "}
//           <Link to="/signup" className="group relative font-medium text-ink">
//             Create an account
//             <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--gold-deep)] transition-transform duration-500 group-hover:scale-x-100" />
//           </Link>
//         </motion.p>
//       </motion.div>
//     </AuthLayout>
//   );
// }



// ------new
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import AuthLayout from "./components/AuthLayout";
import { Field, Checkbox } from "./components/Field";
import MagneticButton from "./components/MagneticButton";
import SocialButtons from "./components/SocialButtons";

import { userSchema } from "../../schemas/userSchema";

import "./components/style.css";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      remember,
    };

    // ZOD VALIDATION
    const result = userSchema.safeParse(formData);

    // VALIDATION FAILED
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors(fieldErrors);

      console.log("Validation Errors:", fieldErrors);

      return;
    }

    // CLEAR ERRORS
    setErrors({});

    // SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "minime-user",
      JSON.stringify(result.data)
    );

    // PRINT DATA
    console.log("Submitted Data:", result.data);

    // BUTTON LOADING
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1400);
  };

  return (
    <AuthLayout
      tagline="Wear Confidence."
      kicker="Welcome back to MiniMe."
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative"
      >
        <motion.div variants={item}>
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold-deep">
            Members
          </p>

          <h2 className="mt-3 font-serif-display text-4xl leading-tight text-ink sm:text-5xl">
            Sign{" "}
            <em className="gold-gradient-text not-italic">
              in.
            </em>
          </h2>

          <p className="mt-2 text-sm text-ink/60">
            Continue your edit. Your wishlist is waiting.
          </p>
        </motion.div>

        <form onSubmit={submit} className="mt-8 space-y-4">

          {/* EMAIL */}

          <motion.div variants={item}>
            <Field
              label="Email address"
              type="email"
              icon={Mail}
              value={email}
              onChange={setEmail}
              autoComplete="email"
              required
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email[0]}
              </p>
            )}
          </motion.div>

          {/* PASSWORD */}

          <motion.div variants={item}>
            <Field
              label="Password"
              type="password"
              icon={Lock}
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              required
            />

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password[0]}
              </p>
            )}
          </motion.div>

          {/* REMEMBER */}

          <motion.div
            variants={item}
            className="flex items-center justify-between pt-1"
          >
            <Checkbox
              checked={remember}
              onChange={setRemember}
            >
              Remember me
            </Checkbox>

            <a
              href="#"
              className="group relative text-xs text-ink/70"
            >
              Forgot password?

              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[color:var(--gold-deep)] transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.div>

          {/* BUTTON */}

          <motion.div
            variants={item}
            className="pt-2 text-white"
          >
            <MagneticButton
              type="submit"
              loading={loading}
            >
              Enter the Atelier
            </MagneticButton>
          </motion.div>
        </form>

        {/* SOCIAL LOGIN */}

        <motion.div
          variants={item}
          className="my-6 flex items-center gap-3"
        >
          <span className="h-px flex-1 bg-[color:var(--nude)]/40" />

          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ink/45">
            or continue with
          </span>

          <span className="h-px flex-1 bg-[color:var(--nude)]/40" />
        </motion.div>

        <motion.div variants={item}>
          <SocialButtons />
        </motion.div>

        {/* SIGNUP */}

        <motion.p
          variants={item}
          className="mt-8 text-center text-xs text-ink/60"
        >
          New to MiniMe?{" "}

          <Link
            to="/signup"
            className="group relative font-medium text-ink"
          >
            Create an account

            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--gold-deep)] transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}