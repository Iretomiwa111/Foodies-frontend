import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import './foot.css'

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
          <h1 className="text-3xl font-lobster text-white mb-3">Foodies</h1>
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

        {/* Stay Connected + Newsletter */}
        <div>
          <h3 className="text-lg font-semibold tracking-wider mb-3 text-white font-lobster">Stay Connected</h3>

          {/* Social Icons */}
          <div className="flex space-x-4 mb-4 text-lg">
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaEnvelope className="hover:text-white cursor-pointer" />
          </div>

          {/* Newsletter */}
          <p className="text-2xl text-gray-400 mb-2 font-tangerine">
            Subscribe to our newsletter
          </p>
          <form
  onSubmit={handleSubmit}
  className="w-full max-w-md flex flex-col sm:flex-row gap-3"
>
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full px-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition whitespace-nowrap"
  >
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
