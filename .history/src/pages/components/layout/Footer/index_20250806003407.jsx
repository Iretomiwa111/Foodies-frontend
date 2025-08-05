import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
// import './foot.css'

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#121212] text-gray-300 pt-10 pb-6 px-6 md:px-20 font-sans">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 border-b border-gray-700 pb-8">

        {/* Brand */}
        <div>
          <h1 className="text-3xl font-lobster text-white text-left">Foodies</h1>
          <p className="text-3xl text-gray-400 leading-relaxed font-tangerine ">
            Serving delicious moments, one dish at a time. Visit us or order online.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-lobster tracking-wider font-semibold mb-3 text-white">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/" className="text-white">Home</a></li>
            <li><a href="/menu" className="text-white">Menu</a></li>
            <li><a href="/reservations" className="text-white">Reservations</a></li>
            <li><a href="/contact" className="text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-lobster tracking-wider font-semibold mb-3 text-white">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li><span className="text-white font-medium">Email:</span> hello@foodies.com</li>
            <li><span className="text-white font-medium">Phone:</span> +234 916 343 8218</li>
            <li><span className="text-white font-medium">Location:</span> Lagos, Nigeria</li>
          </ul>
        </div>

{/* Location & Hours */}
<div>
  <h3 className="text-lg font-semibold tracking-wider mb-3 text-white font-lobster">Visit Us</h3>
  <p className="text-gray-400 text-sm mb-2">
    <span className="text-white font-medium">Address:</span> 123 Food Street, Lagos, Nigeria
  </p>
  <p className="text-gray-400 text-sm mb-2">
    <span className="text-white font-medium">Open Hours:</span><br />
    Mon - Sat: 9:00 AM - 10:00 PM<br />
    Sun: 10:00 AM - 8:00 PM
  </p>
  <a
    href="https://www.google.com/maps"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline text-sm"
  >
    View on Google Maps
  </a>
</div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white font-lobster tracking-wider">Stay Connected</h3>
          <div className="flex space-x-4 mb-4 text-lg">
            <FaFacebook className="hover:text-white cursor-pointer transition" />
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaTwitter className="hover:text-white cursor-pointer transition" />
            <FaEnvelope className="hover:text-white cursor-pointer transition" />
          </div>
          <p className="text-sm text-gray-400 mb-2">Subscribe to our newsletter</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 text-center text-xs text-gray-500 font-lobster tracking-wide">
        &copy; {new Date().getFullYear()} Foodies. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
