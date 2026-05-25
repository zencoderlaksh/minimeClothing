// authStore.js
// npm install zustand

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const USERS_KEY = "minime-users";   // all registered accounts
const SESSION_KEY = "minime-session"; // currently logged-in user

/** Read the array of registered users from localStorage */
function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

/** Persist the array of registered users */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── STORE ───────────────────────────────────────────────────────────────────

export const useAuthStore = create(
  persist(
    (set, get) => ({
      /** Currently authenticated user or null */
      user: null,

      /** Human-readable feedback message */
      message: null,

      /** "success" | "error" | null */
      messageType: null,

      // ── Internal helper ─────────────────────────────────────────────────
      _setMessage(text, type = "success") {
        set({ message: text, messageType: type });
        // Auto-clear after 3 s
        setTimeout(() => set({ message: null, messageType: null }), 3000);
      },

      // ── SIGN UP ─────────────────────────────────────────────────────────
      /**
       * Register a new user.
       * @param {{ name, email, password }} data
       * @returns {{ ok: boolean, error?: string }}
       */
      signUp(data) {
        const users = getUsers();

        const exists = users.find(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );

        if (exists) {
          get()._setMessage("An account with this email already exists.", "error");
          return { ok: false, error: "Email already registered" };
        }

        const newUser = {
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          password: data.password, // ⚠️ plain-text — fine for demo; use bcrypt in prod
          createdAt: new Date().toISOString(),
        };

        saveUsers([...users, newUser]);

        // Auto-login after sign-up
        const { password: _pw, ...safeUser } = newUser;
        set({ user: safeUser });

        get()._setMessage(`Welcome to MiniMe, ${newUser.name}! 🎉`, "success");
        return { ok: true };
      },

      // ── LOGIN ────────────────────────────────────────────────────────────
      /**
       * Log in with email + password.
       * @param {{ email, password }} data
       * @returns {{ ok: boolean, error?: string }}
       */
      login(data) {
        const users = getUsers();

        const match = users.find(
          (u) =>
            u.email.toLowerCase() === data.email.toLowerCase() &&
            u.password === data.password
        );

        if (!match) {
          get()._setMessage("Invalid email or password.", "error");
          return { ok: false, error: "Invalid credentials" };
        }

        const { password: _pw, ...safeUser } = match;
        set({ user: safeUser });

        get()._setMessage(`Welcome back, ${match.name}! ✨`, "success");
        return { ok: true };
      },

      // ── LOGOUT ───────────────────────────────────────────────────────────
      logout() {
        set({ user: null });
        get()._setMessage("You've been signed out. See you soon!", "success");
      },

      // ── UPDATE PROFILE ───────────────────────────────────────────────────
      /**
       * Update mutable profile fields (name, phone, bio, avatar).
       * @param {Partial<{ name, phone, bio, avatar }>} fields
       */
      updateProfile(fields) {
        const { user } = get();
        if (!user) return;

        // Patch in-memory user
        const updated = { ...user, ...fields };
        set({ user: updated });

        // Patch in the persisted users array
        const users = getUsers();
        const idx = users.findIndex((u) => u.id === user.id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...fields };
          saveUsers(users);
        }

        get()._setMessage("Profile updated successfully.", "success");
      },
    }),

    {
      name: SESSION_KEY,      // localStorage key for the session slice
      partialize: (state) => ({ user: state.user }), // only persist `user`
    }
  )
);