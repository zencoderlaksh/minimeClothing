// import React from 'react'
// import { Navigate } from 'react-router-dom'

// const PrivateRoutes = ({children,isAuthenticated}) => {
//   return isAuthenticated?children:<Navigate to="/" />;
// }

// export default PrivateRoutes


// ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/Authstore";

/**
 * Wraps a route that requires authentication.
 * If user is not logged in, renders a friendly gate instead of redirecting
 * (or pass redirect={true} to hard redirect to /login).
 *
 * Usage:
 *   <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children, redirect = false }) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    if (redirect) return <Navigate to="/login" replace />;
    return <NotLoggedInGate />;
  }

  return children;
}

// ── Gate shown when visiting /account while logged out ────────────────────────

function NotLoggedInGate() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--parchment,#faf8f4)] px-6">
      {/* Decorative ring */}
      <div className="relative mb-10 flex items-center justify-center">
        <div className="absolute h-32 w-32 rounded-full border border-[color:var(--gold-deep,#b8960c)]/20" />
        <div className="absolute h-24 w-24 rounded-full border border-[color:var(--gold-deep,#b8960c)]/10" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--gold-deep, #b8960c)" }}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>

      <p className="text-[0.65rem] uppercase tracking-[0.45em] text-[color:var(--gold-deep,#b8960c)] mb-4">
        Members Only
      </p>

      <h1 className="font-serif-display text-4xl text-center text-[color:var(--ink,#1a1612)] leading-tight mb-3">
        Please sign in<br />
        <em className="gold-gradient-text not-italic">to continue.</em>
      </h1>

      <p className="text-sm text-[color:var(--ink,#1a1612)]/55 text-center max-w-xs mb-10 leading-relaxed">
        Your personal atelier is waiting. Sign in to view your profile,
        wishlist, and order history.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <a
          href="/login"
          className="
            flex-1 text-center rounded-xl py-3 text-sm font-medium text-white
            bg-[color:var(--ink,#1a1612)] hover:opacity-80 transition-opacity
          "
        >
          Sign in
        </a>
        <a
          href="/signup"
          className="
            flex-1 text-center rounded-xl py-3 text-sm font-medium
            text-[color:var(--ink,#1a1612)] border border-[color:var(--ink,#1a1612)]/20
            hover:border-[color:var(--gold-deep,#b8960c)]/60 transition-colors
          "
        >
          Create account
        </a>
      </div>
    </div>
  );
}