import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/pages/context/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

 const handleProtectedClick = (e, path) => {
  if (!user) {
    e.preventDefault();
    toast.error("Please login to continue");
    setTimeout(() => navigate("/auth?redirect=" + encodeURIComponent(path)), 2000);
  }
};


  return (
    <footer className="backdrop-blur-md bg-[rgba(18,18,18,0.6)] text-gray-300 pt-12 pb-6 px-6 md:px-20 font-sans shadow-xl rounded-t-2xl animate-fade-in-up">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 border-b border-gray-700 pb-10">
        <div>
          <h1 className="text-3xl font-lobster text-white mb-3">Foodies</h1>  
          <p className="text-3xl text-gray-400 leading-relaxed font-tangerine">
            Serving delicious moments, one dish at a time. Visit us or order online.
          </p>
        </div>

            <div>
          <h3 className="text-lg font-semibold mb-4 text-white font-lobster tracking-wider">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className="text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/menu" className="text-white transition" onClick={(e) => handleProtectedClick(e, "/menu")}>
                Menu
              </Link>
            </li>
            <li>
              <Link to="/reserve" className="text-white transition" onClick={(e) => handleProtectedClick(e, "/reserve")}>
                Reservations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white transition" onClick={(e) => handleProtectedClick(e, "/contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </div>  

        <div>
          <h3 className="text-lg font-lobster tracking-wider font-semibold mb-4 text-white">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>Email: <span className="text-gray-400">hello@foodies.com</span></li>
            <li>Phone: <span className="text-gray-400">+234 916 343 8218</span></li>
            <li>Location: <span className="text-gray-400">Lagos, Nigeria</span></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-white font-lobster tracking-wider ">Stay Connected</h3>
          <div className="flex space-x-4 mb-4 text-lg">
            <FaFacebook className="hover:text-white cursor-pointer transition" />
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
            <FaEnvelope className="hover:text-white cursor-pointer transition" />
          </div>
          <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 px-3 py-2 rounded-md text-sm text-gray-900 font-lobster outline-none focus:ring-2 focus:ring-red-400"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition focus:ring-2 focus:ring-red-400 font-lobster"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="pt-6 text-center text-xs text-gray-500 font-lobster tracking-wide">
        &copy; {new Date().getFullYear()} Foodies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
