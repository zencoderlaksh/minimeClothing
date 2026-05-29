import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiBars3,
  HiXMark,
  HiMagnifyingGlass,
  HiOutlineUser,
  HiOutlineHeart,
} from "react-icons/hi2";
import { BsHandbag } from "react-icons/bs";
import { logo } from "../assets/images";
import { useWishlistStore } from "../stores/useWishlistStore";
import { useCartStore } from "../stores/useCartStore";

const categorySlug = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroPage, setIsHeroPage] = useState(false);

  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const close = () => setMenuOpen(false);

  // Switch to solid past 60 px of scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Watch for the data-hero attribute that ProductGallery sets on <body>
  useEffect(() => {
    const sync = () => setIsHeroPage(document.body.hasAttribute("data-hero"));
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["data-hero"] });
    sync(); // run once on mount
    return () => mo.disconnect();
  }, []);

  // Transparent ONLY when: hero page + at top + no overlay open
  const transparent = isHeroPage && !isScrolled && !menuOpen && !contactOpen;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`sticky top-0 z-[100] w-full transition-all duration-500 ease-in-out ${
          transparent
            ? "bg-transparent border-transparent"
            : "bg-[#FEF9F3]/95 backdrop-blur-lg border-b border-[#E8DFD2]/50"
        }`}
      >
        <div className="max-w-[1800px] mx-auto h-[90px] px-5 md:px-8 lg:px-12 flex items-center justify-between relative">

          {/* LEFT – Contact Us */}
          <div
            className={`hidden lg:flex items-center gap-3 text-[17px] font-medium transition-colors duration-500 ${
              transparent ? "text-white" : "text-black"
            }`}
          >
            <span
              onClick={() => setContactOpen(true)}
              className="text-xl cursor-pointer"
            >
              +
            </span>
            <button
              onClick={() => setContactOpen(true)}
              className="cursor-pointer hover:opacity-70 transition"
            >
              Contact Us
            </button>
          </div>

          {/* CENTER – Logo (desktop) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <img
                src={logo}
                alt="MiniMe"
                className={`h-32 object-contain cursor-pointer transition-all duration-500 ${
                  transparent ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </div>

          {/* CENTER – Logo (mobile) */}
          <div className="lg:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="MiniMe"
                className={`h-[85px] object-contain cursor-pointer transition-all duration-500 ${
                  transparent ? "brightness-0 invert" : ""
                }`}
              />
            </Link>
          </div>

          {/* RIGHT – Icons */}
          <div
            className={`ml-auto flex items-center gap-5 md:gap-7 transition-colors duration-500 ${
              transparent ? "text-white" : "text-black"
            }`}
          >
            {/* WISHLIST */}
            <Link to="/wishlist">
              <div className="relative group cursor-pointer">
                <HiOutlineHeart className="text-[25px]" />
                {wishlistCount > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] px-[3px] text-[10px] font-medium rounded-full flex items-center justify-center leading-none pointer-events-none transition-colors duration-500 ${
                      transparent ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  Wishlist
                </span>
              </div>
            </Link>

            {/* CART */}
            <Link to="/cart">
              <div className="relative group cursor-pointer">
                <BsHandbag className="text-[24px]" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 min-w-[18px] h-[18px] px-[3px] text-[10px] font-medium rounded-full flex items-center justify-center leading-none pointer-events-none transition-colors duration-500 ${
                      transparent ? "bg-white text-black" : "bg-black text-white"
                    }`}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  Cart
                </span>
              </div>
            </Link>

            {/* ACCOUNT */}
            <Link to="/account">
              <div className="relative group cursor-pointer">
                <HiOutlineUser className="text-[25px]" />
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  Account
                </span>
              </div>
            </Link>

            {/* SEARCH */}
            <Link to="/search">
              <div className="relative group cursor-pointer">
                <HiMagnifyingGlass className="text-[28px]" />
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  Search
                </span>
              </div>
            </Link>

            {/* MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 cursor-pointer"
            >
              {menuOpen ? (
                <HiXMark className="text-[30px]" />
              ) : (
                <HiBars3 className="text-[30px]" />
              )}
              <span className="hidden lg:block text-[18px] font-medium tracking-wide">
                MENU
              </span>
            </button>
          </div>
        </div>

        {/* ── MEGA MENU (always opaque – never transparent) ── */}
        <div
          className={`
            absolute left-0 top-full w-full
            bg-[#FEF9F3] border-t border-[#E8DFD2]
            shadow-[0_20px_40px_rgba(0,0,0,0.06)]
            transition-all duration-500 ease-out z-[90]
            overflow-y-auto
            ${menuOpen ? "max-h-[85vh] opacity-100 py-8" : "max-h-0 opacity-0 py-0"}
          `}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">

              {/* SHOP */}
              <div>
                <h3 className="font-semibold text-sm tracking-[2px] uppercase mb-5">Shop</h3>
                <div className="flex flex-col gap-3 text-[15px]">
                  <Link to="/" onClick={close} className="hover:opacity-60 transition">Home</Link>
                  <Link to="/collection" onClick={close} className="hover:opacity-60 transition">Shop All</Link>
                  <Link
                    to="/best-sellers"
                    onClick={close}
                    className="hover:opacity-60 transition flex items-center gap-2"
                  >
                    Best Sellers
                    <span className="text-[10px] bg-[#C9A66B] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Hot</span>
                  </Link>
                  <Link
                    to="/new"
                    onClick={close}
                    className="hover:opacity-60 transition flex items-center gap-2"
                  >
                    New Arrivals
                    <span className="text-[10px] bg-[#1A1A2E] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
                  </Link>
                  <Link
                    to="/trending"
                    onClick={close}
                    className="hover:opacity-60 transition flex items-center gap-2"
                  >
                    Trending
                    <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">🔥</span>
                  </Link>
                </div>
              </div>

              {/* INDIAN WEAR */}
              <div>
                <h3 className="font-semibold text-sm tracking-[2px] uppercase mb-5">Indian Wear</h3>
                <div className="flex flex-col gap-3 text-[15px]">
                  <Link to={`/collection/${categorySlug("Kurtis")}`} onClick={close} className="hover:opacity-60 transition">Kurtis</Link>
                  <Link to={`/collection/${categorySlug("Palazzos")}`} onClick={close} className="hover:opacity-60 transition">Palazzos</Link>
                  <Link to={`/collection/${categorySlug("Indian Fusion")}`} onClick={close} className="hover:opacity-60 transition">Indian Fusion</Link>
                  <Link to={`/collection/${categorySlug("Coord Sets")}`} onClick={close} className="hover:opacity-60 transition">Coord Sets</Link>
                </div>
              </div>

              {/* WESTERN WEAR */}
              <div>
                <h3 className="font-semibold text-sm tracking-[2px] uppercase mb-5">Western Wear</h3>
                <div className="flex flex-col gap-3 text-[15px]">
                  <Link to={`/collection/${categorySlug("Tops")}`} onClick={close} className="hover:opacity-60 transition">Tops</Link>
                  <Link to={`/collection/${categorySlug("White Dresses")}`} onClick={close} className="hover:opacity-60 transition">White Dresses</Link>
                  <Link to={`/collection/${categorySlug("Sequin Dresses")}`} onClick={close} className="hover:opacity-60 transition">Sequin Dresses</Link>
                  <Link to={`/collection/${categorySlug("Long Sleeve Dresses")}`} onClick={close} className="hover:opacity-60 transition">Long Sleeve Dresses</Link>
                  <Link to={`/collection/${categorySlug("Jumpsuits")}`} onClick={close} className="hover:opacity-60 transition">Jumpsuits</Link>
                  <Link to={`/collection/${categorySlug("Loungewear")}`} onClick={close} className="hover:opacity-60 transition">Loungewear</Link>
                </div>
              </div>

              {/* CUSTOMER CARE */}
              <div>
                <h3 className="font-semibold text-sm tracking-[2px] uppercase mb-5">Customer Care</h3>
                <div className="flex flex-col gap-3 text-[15px]">
                  <Link to="/account" onClick={close} className="hover:opacity-60 transition">My Account</Link>
                  <Link to="/wishlist" onClick={close} className="hover:opacity-60 transition">My Wishlist</Link>
                  <Link to="/cart" onClick={close} className="hover:opacity-60 transition">My Cart</Link>
                  <Link to="/about" onClick={close} className="hover:opacity-60 transition">About MiniMe</Link>
                  <Link to="/privacy-policy" onClick={close} className="hover:opacity-60 transition">Privacy Policy</Link>
                  <Link to="/terms-and-conditions" onClick={close} className="hover:opacity-60 transition">Terms & Conditions</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* ── CONTACT OVERLAY ── */}
      {contactOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setContactOpen(false)}
        />
      )}

      {/* ── CONTACT SIDEBAR ── */}
      <div
        className={`
          fixed top-0 right-0 h-screen
          w-full sm:w-[520px]
          bg-[#FEF9F3] z-50 shadow-2xl
          transition-transform duration-700 ease-in-out
          ${contactOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center px-8 py-8">
          <h2 className="text-5xl font-light tracking-wide">CONTACT US</h2>
          <button onClick={() => setContactOpen(false)} className="cursor-pointer">
            <HiXMark className="text-3xl" />
          </button>
        </div>

        <div className="px-8 py-6 space-y-14">
          <div>
            <a href="tel:+911234567890" className="text-xl underline">Call Us +91 1234567890</a>
            <p className="mt-4 text-lg">Monday to Sunday from 10 am to 7 pm.</p>
          </div>

          <div>
            <a href="https://wa.me/911234567890" className="text-xl underline">WhatsApp Us</a>
            <p className="mt-4 text-lg">Monday to Sunday from 10 am to 7 pm.</p>
          </div>

          <div>
            <span className="text-xl underline cursor-pointer">LIVE CHAT</span>
            <p className="mt-4 text-lg">Monday to Sunday from 10 am to 7 pm.</p>
          </div>

          <div className="pt-8">
            <h3 className="text-3xl mb-8">Do you need further assistance?</h3>
            <Link
              to="/contact"
              onClick={() => setContactOpen(false)}
              className="text-2xl underline cursor-pointer"
            >
              Get in Contact with Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}