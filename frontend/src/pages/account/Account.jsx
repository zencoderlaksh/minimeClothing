// Account.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit3,
  Check,
  Package,
  Truck,
  Star,
} from "lucide-react";

import { useUser, useClerk } from "@clerk/react";
import Toast from "../auth/components/Toast";

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

// ─── Mock order history ────────────────────────────────────────────────────────
const MOCK_ORDERS = [
  {
    id: "MM-2891",
    date: "12 May 2026",
    status: "Delivered",
    items: ["Linen Co-ord Set", "Pearl Drop Earrings"],
    total: "₹4,290",
    icon: Package,
  },
  {
    id: "MM-2744",
    date: "2 Apr 2026",
    status: "In Transit",
    items: ["Minimal Kalamkari Kurti"],
    total: "₹1,890",
    icon: Truck,
  },
];

// ─── Mock wishlist ─────────────────────────────────────────────────────────────
const MOCK_WISHLIST = [
  { id: 1, name: "Ivory Wrap Dress", price: "₹3,499", tag: "New" },
  { id: 2, name: "Block-print Shirt", price: "₹1,799", tag: "Low Stock" },
  { id: 3, name: "Oxidised Silver Cuffs", price: "₹899", tag: null },
];

// ─── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, icon: Icon, children, custom }) {
  return (
    <motion.section
      variants={fadeUp}
      custom={custom}
      className="rounded-2xl border border-[color:var(--nude,#e8ddd0)]/60 bg-white/70 backdrop-blur-sm p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <Icon size={15} style={{ color: "var(--gold-deep, #b8960c)" }} />
        <h2 className="text-[0.65rem] uppercase tracking-[0.4em] text-[color:var(--gold-deep,#b8960c)]">
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

// ─── Editable field row ────────────────────────────────────────────────────────
function ProfileRow({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  const commit = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-[color:var(--nude,#e8ddd0)]/40 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[0.6rem] uppercase tracking-widest text-[color:var(--ink,#1a1612)]/40 mb-0.5">
          {label}
        </p>
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            className="w-full text-sm text-[color:var(--ink,#1a1612)] bg-transparent border-b border-[color:var(--gold-deep,#b8960c)] outline-none py-0.5"
          />
        ) : (
          <p className="text-sm text-[color:var(--ink,#1a1612)] truncate">
            {value || <span className="italic text-[color:var(--ink,#1a1612)]/30">Not set</span>}
          </p>
        )}
      </div>

      <button
        onClick={editing ? commit : () => setEditing(true)}
        className="ml-4 shrink-0 p-1.5 rounded-lg hover:bg-[color:var(--nude,#e8ddd0)]/40 transition-colors"
      >
        {editing ? (
          <Check size={14} style={{ color: "var(--gold-deep, #b8960c)" }} />
        ) : (
          <Edit3 size={13} className="text-[color:var(--ink,#1a1612)]/40" />
        )}
      </button>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Account() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();
  
  // These are removed, keeping placeholders to not break UI
  const message = null;
  const messageType = null;

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // Derive initials for avatar
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "MM";

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <>
      <Toast message={message} type={messageType} />

      <div className="min-h-screen bg-[color:var(--parchment,#faf8f4)] px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-6">

          {/* ── Hero card ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-3xl bg-[color:var(--ink,#1a1612)] px-8 py-10 text-white"
          >
            {/* Gold blob */}
            <div
              className="absolute -top-10 -right-10 h-48 w-48 rounded-full opacity-10 blur-3xl"
              style={{ background: "var(--gold-deep, #b8960c)" }}
            />

            <div className="relative flex items-center gap-6">
              {/* Avatar */}
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-mid,#d4a72c), var(--gold-deep,#b8960c))",
                  color: "#fff",
                }}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[0.6rem] uppercase tracking-[0.45em] text-white/40 mb-1">
                  Member since {memberSince}
                </p>
                <h1 className="font-serif-display text-2xl leading-tight truncate">
                  {user?.fullName || "User"}
                </h1>
                <p className="text-sm text-white/55 truncate mt-0.5">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="relative mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { label: "Orders", value: MOCK_ORDERS.length },
                { label: "Wishlist", value: MOCK_WISHLIST.length },
                { label: "Reviews", value: 4 },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-semibold">{value}</p>
                  <p className="text-[0.6rem] uppercase tracking-widest text-white/40 mt-0.5">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Profile details ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <Section title="Profile Details" icon={User} custom={1}>
              <ProfileRow
                label="Full Name"
                value={user?.fullName || "User"}
                onSave={async (v) => {
                  try {
                    const parts = v.split(" ");
                    await user?.update({ firstName: parts[0], lastName: parts.slice(1).join(" ") });
                  } catch(e) { console.error(e) }
                }}
              />
              <ProfileRow
                label="Email"
                value={user?.primaryEmailAddress?.emailAddress}
                onSave={() => console.log("Updating email requires verification flow")}
              />
              <ProfileRow
                label="Phone"
                value={user?.unsafeMetadata?.phoneNumber}
                onSave={async (v) => {
                  try {
                    await user?.update({ unsafeMetadata: { ...user.unsafeMetadata, phoneNumber: v } });
                  } catch(e) { console.error(e) }
                }}
              />
              <ProfileRow
                label="City"
                value={user?.unsafeMetadata?.city || ""}
                onSave={async (v) => {
                  try {
                    await user?.update({ unsafeMetadata: { ...user.unsafeMetadata, city: v } });
                  } catch(e) { console.error(e) }
                }}
              />
            </Section>
          </motion.div>

          {/* ── Order history ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
            <Section title="Order History" icon={ShoppingBag} custom={2}>
              {MOCK_ORDERS.length === 0 ? (
                <p className="text-sm text-[color:var(--ink,#1a1612)]/40 text-center py-4">
                  No orders yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {MOCK_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center gap-4 rounded-xl bg-[color:var(--nude,#e8ddd0)]/20 p-4"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--gold-mid,#d4a72c)18, var(--gold-deep,#b8960c)18)",
                          backgroundColor: "var(--nude, #e8ddd0)",
                        }}
                      >
                        <order.icon
                          size={16}
                          style={{ color: "var(--gold-deep, #b8960c)" }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-[color:var(--ink,#1a1612)]">
                            {order.id}
                          </span>
                          <span
                            className={`text-[0.6rem] px-2 py-0.5 rounded-full font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[0.7rem] text-[color:var(--ink,#1a1612)]/50 truncate">
                          {order.items.join(", ")}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium text-[color:var(--ink,#1a1612)]">
                          {order.total}
                        </p>
                        <p className="text-[0.6rem] text-[color:var(--ink,#1a1612)]/40">
                          {order.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </motion.div>

          {/* ── Wishlist ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <Section title="Wishlist" icon={Heart} custom={3}>
              {MOCK_WISHLIST.length === 0 ? (
                <p className="text-sm text-[color:var(--ink,#1a1612)]/40 text-center py-4">
                  Your wishlist is empty.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {MOCK_WISHLIST.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-[color:var(--nude,#e8ddd0)]/25 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Heart
                          size={14}
                          className="fill-[color:var(--gold-deep,#b8960c)] text-[color:var(--gold-deep,#b8960c)]"
                        />
                        <span className="text-sm text-[color:var(--ink,#1a1612)]">
                          {item.name}
                        </span>
                        {item.tag && (
                          <span className="text-[0.55rem] px-1.5 py-0.5 rounded-full bg-[color:var(--gold-deep,#b8960c)]/10 text-[color:var(--gold-deep,#b8960c)] font-medium">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-[color:var(--ink,#1a1612)]">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </motion.div>

          {/* ── Preferences & notifications ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}>
            <Section title="Notifications" icon={Bell} custom={4}>
              {[
                { label: "New drop alerts", sub: "Be first to know about new collections" },
                { label: "Order updates", sub: "Shipping, delivery, and return status" },
                { label: "Wishlist restocks", sub: "When saved items are back in stock" },
              ].map(({ label, sub }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3.5 border-b border-[color:var(--nude,#e8ddd0)]/40 last:border-0"
                >
                  <div>
                    <p className="text-sm text-[color:var(--ink,#1a1612)]">{label}</p>
                    <p className="text-xs text-[color:var(--ink,#1a1612)]/45 mt-0.5">{sub}</p>
                  </div>
                  {/* Toggle pill */}
                  <TogglePill defaultOn />
                </div>
              ))}
            </Section>
          </motion.div>

          {/* ── Security ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}>
            <Section title="Security" icon={Shield} custom={5}>
              {[
                { label: "Change password", href: "#" },
                { label: "Two-factor authentication", href: "#" },
                { label: "Linked accounts", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between py-3.5 border-b border-[color:var(--nude,#e8ddd0)]/40 last:border-0 hover:text-[color:var(--gold-deep,#b8960c)] transition-colors group"
                >
                  <span className="text-sm text-[color:var(--ink,#1a1612)] group-hover:text-[color:var(--gold-deep,#b8960c)] transition-colors">
                    {label}
                  </span>
                  <ChevronRight size={14} className="text-[color:var(--ink,#1a1612)]/30 group-hover:text-[color:var(--gold-deep,#b8960c)] transition-colors" />
                </a>
              ))}
            </Section>
          </motion.div>

          {/* ── Logout ── */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6}>
            <AnimatePresence mode="wait">
              {showLogoutConfirm ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="rounded-2xl border border-red-200/60 bg-white/70 p-6 text-center"
                >
                  <p className="text-sm text-[color:var(--ink,#1a1612)] mb-1 font-medium">
                    Sign out of MiniMe?
                  </p>
                  <p className="text-xs text-[color:var(--ink,#1a1612)]/45 mb-5">
                    You can always sign back in anytime.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowLogoutConfirm(false)}
                      className="px-5 py-2 rounded-xl text-sm border border-[color:var(--nude,#e8ddd0)] text-[color:var(--ink,#1a1612)] hover:bg-[color:var(--nude,#e8ddd0)]/30 transition-colors"
                    >
                      Stay
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-2 rounded-xl text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Yes, sign out
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  key="btn"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  onClick={() => setShowLogoutConfirm(true)}
                  className="
                    w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl
                    border border-red-200/50 text-red-500 text-sm font-medium
                    hover:bg-red-50 hover:border-red-300 transition-all
                  "
                >
                  <LogOut size={15} />
                  Sign out
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom spacing */}
          <div className="h-8" />
        </div>
      </div>
    </>
  );
}

// ── Tiny toggle pill ───────────────────────────────────────────────────────────
function TogglePill({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
        on
          ? "bg-[color:var(--gold-deep,#b8960c)]"
          : "bg-[color:var(--nude,#e8ddd0)]"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}