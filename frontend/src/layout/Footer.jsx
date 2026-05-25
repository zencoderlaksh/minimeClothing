import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";
import {logo} from "../assets/images"
export default function Footer() {
  return (
    <footer className="bg-[#FEF9F3] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="MINIME"
              className="h-32"
            />

            <p className="text-gray-600 leading-relaxed">
              Discover timeless fashion designed for everyday elegance
              and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/" className="hover:text-black transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-black transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="/collection" className="hover:text-black transition">
                  Collection
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-black transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>
                <a href="/collection" className="hover:text-black transition">
                  Collection
                </a>
              </li>

              <li>
                <a href="/collection/tops" className="hover:text-black transition">
                  Tops
                </a>
              </li>

              <li>
                <a href="/collection/whitedresses" className="hover:text-black transition">
                  White Dresses
                </a>
              </li>

              <li>
                <a href="/collection/sequin" className="hover:text-black transition">
                  Sequin Dresses
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-600">
              <p>Jaipur, Rajasthan</p>
              <p>+91 XXXXX XXXXX</p>
              <p>minimeclothing@gmail.com</p>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} MiniMe Clothing. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="terms-and-conditions">Terms & Conditions</a>
          </div>

        </div>

      </div>
    </footer>
  );
}