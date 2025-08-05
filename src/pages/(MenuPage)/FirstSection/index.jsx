"use client";

import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const images = [
  {
    url: "/splashfood2 (1).jpg",
    text: "Welcome to Foodies",
  },
  {
    url: "/splashfood (1).jpg",
    text: "Browse Menu Below",
  },
  {
    url: "/unsplashfood (1).jpg",
    text: "Experience Culinary Excellence",
  },
  {
    url: "/fod.jpg",
    text: "Fill Your Cart With Your Favorite",
  },
];

const AceternitySlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence>
        <Motion.img
          key={images[current].url}
          src={images[current].url}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="absolute z-20 inset-0 flex items-center font-lobster justify-center text-white text-4xl font-bold text-center px-4">
        <Motion.div
          key={images[current].text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          {images[current].text}
        </Motion.div>
      </div>
    </div>
  );
};

export default AceternitySlider;
