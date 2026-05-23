import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiBars3,
  HiXMark,
  HiMagnifyingGlass,
  HiOutlineUser,
} from "react-icons/hi2";
import { BsHandbag } from "react-icons/bs";
import { logo } from "../assets/images";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="relative z-[100] w-full bg-[#FEF9F3] border-b border-gray-200 z-50">
        <div className="max-w-[1800px] mx-auto h-[90px] px-5 md:px-8 lg:px-12 flex items-center justify-between relative">

          {/* LEFT */}
          <div className="hidden lg:flex items-center gap-3 text-[17px] font-medium">
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

          {/* DESKTOP LOGO */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <Link to="/">
              <img
                src={logo}
                alt="MINIME"
                className="h-32 object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* MOBILE LOGO */}
          <div className="lg:hidden">
            <Link to="/">
              <img
                src={logo}
                alt="MINIME"
                className="h-[120px] object-contain cursor-pointer"
              />
            </Link>
          </div>

          {/* RIGHT ICONS */}
          <div className="ml-auto flex items-center gap-5 md:gap-7">

            {/* CART */}
            <Link to="/cart">
              <div className="relative group cursor-pointer">
                <BsHandbag className="text-[24px]" />

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
              <HiBars3 className="text-[30px]" />

              <span className="hidden lg:block text-[18px] font-medium tracking-wide">
                MENU
              </span>
            </button>
          </div>
        </div>

        {/* HORIZONTAL MEGA MENU */}
        <div
          className={`
            absolute left-0 top-full w-full bg-[#FEF9F3]
            border-b border-gray-200 overflow-hidden
            transition-all duration-700 ease-in-out
            ${
              menuOpen
                ? "max-h-[500px] opacity-100 py-12"
                : "max-h-0 opacity-0 py-0"
            }
          `}
        >
          <div className="max-w-7xl mx-auto px-8">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

              <div>
                <h3 className="font-semibold text-lg mb-5">
                  SHOP
                </h3>

                <div className="flex flex-col gap-3">
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>

                  <Link to="/shop" onClick={() => setMenuOpen(false)}>
                    Shop
                  </Link>

                  <Link
                    to="/new-arrivals"
                    onClick={() => setMenuOpen(false)}
                  >
                    New Arrivals
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-5">
                  MEN
                </h3>

                <div className="flex flex-col gap-3">
                  <Link to="/men" onClick={() => setMenuOpen(false)}>
                    All Men
                  </Link>

                  <Link
                    to="/men/shirts"
                    onClick={() => setMenuOpen(false)}
                  >
                    Shirts
                  </Link>

                  <Link
                    to="/men/tshirts"
                    onClick={() => setMenuOpen(false)}
                  >
                    T-Shirts
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-5">
                  WOMEN
                </h3>

                <div className="flex flex-col gap-3">
                  <Link to="/women" onClick={() => setMenuOpen(false)}>
                    All Women
                  </Link>

                  <Link
                    to="/women/dresses"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dresses
                  </Link>

                  <Link
                    to="/women/tops"
                    onClick={() => setMenuOpen(false)}
                  >
                    Tops
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-5">
                  CUSTOMER CARE
                </h3>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/account"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Account
                  </Link>

                  <Link
                    to="/shipping"
                    onClick={() => setMenuOpen(false)}
                  >
                    Shipping
                  </Link>

                  <Link
                    to="/returns"
                    onClick={() => setMenuOpen(false)}
                  >
                    Returns
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* CONTACT OVERLAY */}
      {contactOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setContactOpen(false)}
        />
      )}

      {/* CONTACT SIDEBAR */}
      <div
        className={`
          fixed top-0 right-0 h-screen
          w-full sm:w-[520px]
          bg-[#FEF9F3]
          z-50 shadow-2xl
          transition-transform duration-1000 ease-in-out
          ${
            contactOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-8 py-8">
          <h2 className="text-5xl font-light tracking-wide">
            CONTACT US
          </h2>

          <button
            onClick={() => setContactOpen(false)}
            className="cursor-pointer"
          >
            <HiXMark className="text-3xl" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-8 py-6 space-y-14">

          <div>
            <a
              href="tel:+911234567890"
              className="text-xl underline"
            >
              Call Us +91 1234567890
            </a>

            <p className="mt-4 text-lg">
              Monday to Sunday from 10 am to 7 pm.
            </p>
          </div>

          <div>
            <a
              href="https://wa.me/911234567890"
              className="text-xl underline"
            >
              WhatsApp Us
            </a>

            <p className="mt-4 text-lg">
              Monday to Sunday from 10 am to 7 pm.
            </p>
          </div>

          <div>
            <span className="text-xl underline cursor-pointer">
              LIVE CHAT
            </span>

            <p className="mt-4 text-lg">
              Monday to Sunday from 10 am to 7 pm.
            </p>
          </div>

          <div className="pt-8">
            <h3 className="text-3xl mb-8">
              Do you need further assistance?
            </h3>

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