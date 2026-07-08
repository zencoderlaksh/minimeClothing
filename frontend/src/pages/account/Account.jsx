import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk, useAuth } from "@clerk/react";
import { MapPin, Shield, LogOut, Camera, Trash2, Edit3, Plus, X } from "lucide-react";

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

// ─── Minimal Section Wrapper ───────────────────────────────────────────────────
function Section({ title, icon: Icon, children, custom }) {
  return (
    <motion.section
      variants={fadeUp}
      custom={custom}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4 px-2">
        <Icon size={14} className="text-[color:var(--gold-deep,#b8960c)]" />
        <h2 className="text-[0.6rem] uppercase tracking-widest font-medium text-[color:var(--gold-deep,#b8960c)]">
          {title}
        </h2>
      </div>
      <div className="border border-[color:var(--nude,#e8ddd0)] bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden">
        {children}
      </div>
    </motion.section>
  );
}

// ─── Confirmation Modal ────────────────────────────────────────────────────────
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm" }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[color:var(--ink,#1a1612)]/40 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="bg-[color:var(--parchment,#faf8f4)] rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[color:var(--nude,#e8ddd0)]"
          >
            <h3 className="text-lg font-serif-display text-[color:var(--ink,#1a1612)] mb-2">{title}</h3>
            <p className="text-sm text-[color:var(--ink,#1a1612)]/70 mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={onCancel}
                className="px-4 py-2 rounded-full border border-[color:var(--nude,#e8ddd0)] text-[color:var(--ink,#1a1612)] text-sm font-medium hover:bg-[color:var(--nude,#e8ddd0)]/30 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 rounded-full bg-[color:var(--ink,#1a1612)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Account() {
  const navigate = useNavigate();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  
  const [dbUser, setDbUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [paymentCards, setPaymentCards] = useState([]);
  
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  // Profile Edit State
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState({ name: "" });

  // Address Form State
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressDraft, setAddressDraft] = useState({});

  // Card Form State
  const [editingCardId, setEditingCardId] = useState(null);
  const [cardDraft, setCardDraft] = useState({});

  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: "", message: "", action: null, confirmText: "" });

  const openModal = (title, message, confirmText, action) => {
    setModalConfig({ isOpen: true, title, message, action, confirmText });
  };
  
  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };
  
  const handleConfirm = () => {
    if (modalConfig.action) modalConfig.action();
    closeModal();
  };

  useEffect(() => {
    fetchProfile();
  }, [clerkUser, getToken]);

  const fetchProfile = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setDbUser(data.user);
        setAddresses(data.user.addresses || []);
        setPaymentCards(data.user.paymentCards || []);
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);

    try {
      // Sync image to Clerk so the UserButton and Clerk profile update instantly
      if (clerkUser) {
        await clerkUser.setProfileImage({ file }).catch(err => console.warn("Clerk image sync failed:", err));
      }

      const formData = new FormData();
      formData.append("image", file);
      
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setDbUser((prev) => ({ ...prev, avatar: data.avatar }));
      } else {
        alert("Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  // ─── Profile Edit Logic ──────────────────────────────────────────────────────
  const saveProfile = async () => {
    try {
      // Sync name to Clerk so the UserButton updates instantly
      if (clerkUser && profileDraft.name) {
        const parts = profileDraft.name.split(" ");
        await clerkUser.update({
          firstName: parts[0] || "",
          lastName: parts.slice(1).join(" ") || ""
        }).catch(err => console.warn("Clerk name sync failed:", err));
      }

      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
        method: 'PUT',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileDraft)
      });
      const data = await res.json();
      if (data.success) {
        setDbUser(data.user);
        setEditingProfile(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Address Logic ───────────────────────────────────────────────────────────
  const saveAddress = async () => {
    // Validate required fields
    if (!addressDraft.street || !addressDraft.city || !addressDraft.state || !addressDraft.zipCode) {
      alert("Please fill in all required address fields (Street, City, State, ZIP).");
      return;
    }

    try {
      const token = await getToken();
      const isNew = editingAddressId === 'new';
      const url = isNew 
        ? `${import.meta.env.VITE_API_URL}/users/addresses` 
        : `${import.meta.env.VITE_API_URL}/users/addresses/${editingAddressId}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressDraft)
      });
      const data = await res.json();
      if (data.success) {
        setAddresses(data.addresses);
        setEditingAddressId(null);
      } else {
        alert("Failed to save address: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error saving address: " + err.message);
    }
  };

  const removeAddress = async (id) => {
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/addresses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setAddresses(data.addresses);
    } catch (err) {
      console.error(err);
    }
  };

  const triggerRemoveAddress = (id) => {
    openModal(
      "Delete Address",
      "Are you sure you want to remove this address? This cannot be undone.",
      "Delete",
      () => removeAddress(id)
    );
  };

  // ─── Payment Card Logic ──────────────────────────────────────────────────────
  const saveCreditCard = async () => {
    // If editing an existing card, we might not require the full card number (they might leave it blank to keep the old one).
    const isNew = editingCardId === 'new';
    if (isNew && (!cardDraft.cardNumber || !cardDraft.expiry || !cardDraft.cvc)) {
      alert("Please fill in all credit card fields.");
      return;
    }

    // Parse expiry (MM/YY)
    let expMonth = cardDraft.expMonth;
    let expYear = cardDraft.expYear;
    if (cardDraft.expiry) {
      const parts = cardDraft.expiry.split('/');
      if (parts.length === 2) {
        expMonth = parseInt(parts[0], 10);
        expYear = parseInt("20" + parts[1], 10);
      }
    }

    const payload = {
      ...cardDraft,
      expMonth,
      expYear
    };

    try {
      const token = await getToken();
      const url = isNew 
        ? `${import.meta.env.VITE_API_URL}/users/cards` 
        : `${import.meta.env.VITE_API_URL}/users/cards/${editingCardId}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setPaymentCards(data.paymentCards);
        setEditingCardId(null);
        setCardDraft({});
      } else {
        alert("Failed to save card: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error saving card: " + err.message);
    }
  };

  const removeCard = async (id) => {
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/cards/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setPaymentCards(data.paymentCards);
    } catch (err) {
      console.error(err);
    }
  };

  const triggerRemoveCard = (id) => {
    openModal(
      "Remove Card",
      "Are you sure you want to remove this payment method?",
      "Remove",
      () => removeCard(id)
    );
  };

  const initials = dbUser?.name
    ? dbUser.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
    : clerkUser?.fullName?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "MM";

  const displayName = (dbUser?.name && dbUser.name !== "User") 
    ? dbUser.name 
    : (clerkUser?.fullName || "Member");
  
  // If the DB has a placeholder email, use the Clerk email instead
  const dbEmail = dbUser?.email;
  const displayEmail = dbEmail && !dbEmail.includes("@placeholder.com") 
    ? dbEmail 
    : clerkUser?.primaryEmailAddress?.emailAddress;
    
  const avatarUrl = dbUser?.avatar || clerkUser?.imageUrl;

  return (
    <div className="min-h-screen bg-[color:var(--parchment,#faf8f4)] px-4 py-12 sm:px-8">
      <motion.div initial="hidden" animate="show" className="mx-auto max-w-2xl">
        
        <h1 className="font-serif-display text-3xl text-center text-[color:var(--ink,#1a1612)] mb-10">
          Account <em className="gold-gradient-text not-italic">Settings</em>
        </h1>

        {/* ── Profile Section ── */}
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-2xl border border-[color:var(--nude,#e8ddd0)] bg-white/70 backdrop-blur-sm relative">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-[color:var(--nude,#e8ddd0)] bg-[color:var(--parchment,#faf8f4)] flex items-center justify-center text-xl font-medium text-[color:var(--ink,#1a1612)]/50">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  initials
                )}
              </div>
              
              {uploadingAvatar ? (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-full">
                  <span className="text-[10px] uppercase tracking-widest font-medium text-[color:var(--ink,#1a1612)]">Uploading</span>
                </div>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-[color:var(--ink,#1a1612)]/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera size={20} className="text-white" />
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarUpload}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[0.6rem] uppercase tracking-widest text-[color:var(--ink,#1a1612)]/40">
                  Personal Details
                </p>
                {!editingProfile && (
                  <button 
                    onClick={() => { setEditingProfile(true); setProfileDraft({ name: dbUser?.name !== "User" ? dbUser?.name : (clerkUser?.fullName || "") }); }}
                    className="text-[color:var(--ink,#1a1612)]/40 hover:text-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer"
                  >
                    <Edit3 size={16} />
                  </button>
                )}
              </div>

              {editingProfile ? (
                <div className="mt-2 space-y-3">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={profileDraft.name} 
                    onChange={e => setProfileDraft({ name: e.target.value })} 
                    className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveProfile} className="px-4 py-2 rounded-lg bg-[color:var(--ink,#1a1612)] text-white text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer">Save</button>
                    <button onClick={() => setEditingProfile(false)} className="px-4 py-2 rounded-lg border border-[color:var(--nude,#e8ddd0)] text-[color:var(--ink,#1a1612)] text-xs hover:bg-[color:var(--nude,#e8ddd0)]/30 transition-colors cursor-pointer">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-medium text-[color:var(--ink,#1a1612)] truncate">
                    {displayName}
                  </h2>
                  <p className="text-sm text-[color:var(--ink,#1a1612)]/60 truncate mt-1">
                    {displayEmail}
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Addresses ── */}
        <Section title="Delivery Addresses" icon={MapPin} custom={1}>
          <div className="divide-y divide-[color:var(--nude,#e8ddd0)]">
            {addresses.length === 0 && !editingAddressId && (
              <p className="p-6 text-center text-sm text-[color:var(--ink,#1a1612)]/40">
                No addresses saved yet.
              </p>
            )}

            {addresses.map(addr => (
              <div key={addr._id} className="p-5 hover:bg-[color:var(--parchment,#faf8f4)]/30 transition-colors flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs uppercase tracking-widest text-[color:var(--ink,#1a1612)]/60 font-medium">
                      {addr.label}
                    </p>
                    {addr.isDefault && (
                      <span className="text-[0.55rem] px-2 py-0.5 rounded-full bg-[color:var(--gold-deep,#b8960c)]/10 text-[color:var(--gold-deep,#b8960c)] font-medium">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[color:var(--ink,#1a1612)] mt-2">{addr.street}</p>
                  <p className="text-sm text-[color:var(--ink,#1a1612)]/70">{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p className="text-sm text-[color:var(--ink,#1a1612)]/70">{addr.country}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { setEditingAddressId(addr._id); setAddressDraft(addr); }} className="text-[color:var(--ink,#1a1612)]/40 hover:text-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => triggerRemoveAddress(addr._id)} className="text-[color:var(--ink,#1a1612)]/40 hover:text-red-400 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <AnimatePresence>
              {editingAddressId && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 bg-[color:var(--parchment,#faf8f4)]/50"
                >
                  <div className="space-y-3">
                    <input type="text" placeholder="Label (e.g. Home)" value={addressDraft.label || ''} onChange={e => setAddressDraft({...addressDraft, label: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                    <input type="text" placeholder="Street Address" value={addressDraft.street || ''} onChange={e => setAddressDraft({...addressDraft, street: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="City" value={addressDraft.city || ''} onChange={e => setAddressDraft({...addressDraft, city: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                      <input type="text" placeholder="State" value={addressDraft.state || ''} onChange={e => setAddressDraft({...addressDraft, state: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="ZIP" value={addressDraft.zipCode || ''} onChange={e => setAddressDraft({...addressDraft, zipCode: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                      <input type="text" placeholder="Country" value={addressDraft.country || ''} onChange={e => setAddressDraft({...addressDraft, country: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-[color:var(--ink,#1a1612)]/80 pt-2 cursor-pointer">
                      <input type="checkbox" checked={addressDraft.isDefault || false} onChange={e => setAddressDraft({...addressDraft, isDefault: e.target.checked})} className="rounded text-[color:var(--gold-deep,#b8960c)] focus:ring-[color:var(--gold-deep,#b8960c)] cursor-pointer" />
                      Set as Default Address
                    </label>
                    <div className="flex gap-3 pt-3">
                      <button onClick={saveAddress} className="flex-1 py-2.5 rounded-lg bg-[color:var(--ink,#1a1612)] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">Save</button>
                      <button onClick={() => setEditingAddressId(null)} className="flex-1 py-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] text-[color:var(--ink,#1a1612)] text-sm hover:bg-[color:var(--nude,#e8ddd0)]/30 transition-colors cursor-pointer">Cancel</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!editingAddressId && addresses.length < 10 && (
              <button 
                onClick={() => { setEditingAddressId('new'); setAddressDraft({ country: 'India', isDefault: addresses.length === 0 }); }}
                className="w-full p-4 text-sm text-[color:var(--gold-deep,#b8960c)] hover:bg-[color:var(--parchment,#faf8f4)]/50 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
              >
                <Plus size={16} />
                Add New Address
              </button>
            )}
            {!editingAddressId && addresses.length >= 10 && (
              <p className="w-full p-4 text-xs text-center text-[color:var(--ink,#1a1612)]/40 italic">
                You have reached the maximum limit of 10 addresses.
              </p>
            )}
          </div>
        </Section>

        {/* ── Credit Cards ── */}
        <Section title="Credit Cards" icon={Shield} custom={2}>
          <div className="divide-y divide-[color:var(--nude,#e8ddd0)]">
            {paymentCards.length === 0 && (
              <p className="p-6 text-center text-sm text-[color:var(--ink,#1a1612)]/40">
                No cards saved yet.
              </p>
            )}

            {paymentCards.map(card => (
              <div key={card._id} className="p-5 flex items-center justify-between hover:bg-[color:var(--parchment,#faf8f4)]/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-[color:var(--parchment,#faf8f4)] border border-[color:var(--nude,#e8ddd0)] rounded flex items-center justify-center text-[0.6rem] font-medium uppercase text-[color:var(--ink,#1a1612)]">
                    {card.brand}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[color:var(--ink,#1a1612)] tracking-widest">
                      •••• •••• •••• {card.last4}
                    </p>
                    <p className="text-xs text-[color:var(--ink,#1a1612)]/50 mt-0.5">
                      Expires {card.expMonth}/{card.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { 
                    setEditingCardId(card._id); 
                    setCardDraft({
                      ...card,
                      expiry: card.expMonth && card.expYear ? `${String(card.expMonth).padStart(2, '0')}/${String(card.expYear).slice(-2)}` : ''
                    }); 
                  }} className="text-[color:var(--ink,#1a1612)]/40 hover:text-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => triggerRemoveCard(card._id)} className="text-[color:var(--ink,#1a1612)]/40 hover:text-red-400 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <AnimatePresence>
              {editingCardId && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 bg-[color:var(--parchment,#faf8f4)]/50"
                >
                  <div className="space-y-3">
                    <input type="text" placeholder="Cardholder Name" value={cardDraft.name || ''} onChange={e => setCardDraft({...cardDraft, name: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                    <select 
                      value={cardDraft.brand || 'Visa'} 
                      onChange={e => setCardDraft({...cardDraft, brand: e.target.value})}
                      className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer"
                    >
                      <option value="Visa">Visa</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                      <option value="Discover">Discover</option>
                      <option value="RuPay">RuPay</option>
                      <option value="Other">Other</option>
                    </select>
                    <input type="text" placeholder={editingCardId === 'new' ? "Card Number (16 digits)" : "New Card Number (leave blank to keep)"} value={cardDraft.cardNumber || ''} maxLength="16" onChange={e => setCardDraft({...cardDraft, cardNumber: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors tracking-widest cursor-pointer" />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        value={cardDraft.expiry || ''} 
                        maxLength="5" 
                        onChange={e => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                          setCardDraft({...cardDraft, expiry: val});
                        }} 
                        className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" 
                      />
                      <input type="text" placeholder="CVC" value={cardDraft.cvc || ''} maxLength="4" onChange={e => setCardDraft({...cardDraft, cvc: e.target.value})} className="w-full text-sm p-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] bg-white outline-none focus:border-[color:var(--gold-deep,#b8960c)] transition-colors cursor-pointer" />
                    </div>
                    <div className="flex gap-3 pt-3">
                      <button onClick={saveCreditCard} className="flex-1 py-2.5 rounded-lg bg-[color:var(--ink,#1a1612)] text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">Save Card</button>
                      <button onClick={() => setEditingCardId(null)} className="flex-1 py-2.5 rounded-lg border border-[color:var(--nude,#e8ddd0)] text-[color:var(--ink,#1a1612)] text-sm hover:bg-[color:var(--nude,#e8ddd0)]/30 transition-colors cursor-pointer">Cancel</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!editingCardId && paymentCards.length < 3 && (
              <button 
                onClick={() => { setEditingCardId('new'); setCardDraft({ brand: 'Visa' }); }}
                className="w-full p-4 text-sm text-[color:var(--gold-deep,#b8960c)] hover:bg-[color:var(--parchment,#faf8f4)]/50 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
              >
                <Plus size={16} />
                Add Credit Card
              </button>
            )}
            {!editingCardId && paymentCards.length >= 3 && (
              <p className="w-full p-4 text-xs text-center text-[color:var(--ink,#1a1612)]/40 italic">
                You have reached the maximum limit of 3 credit cards.
              </p>
            )}
          </div>
        </Section>

        {/* ── Logout ── */}
        <motion.div variants={fadeUp} custom={3} className="pt-6">
          <button
            onClick={() => {
              openModal("Sign Out", "Are you sure you want to sign out of your account?", "Sign Out", handleLogout);
            }}
            className="
              mx-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full
              border border-[color:var(--ink,#1a1612)]/10 text-[color:var(--ink,#1a1612)] text-sm font-medium
              hover:bg-[color:var(--ink,#1a1612)] hover:text-white transition-all cursor-pointer
            "
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </motion.div>

        <div className="h-16" />
      </motion.div>

      {/* Reusable Modal */}
      <ConfirmModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </div>
  );
}