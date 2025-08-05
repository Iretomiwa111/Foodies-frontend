import React from "react";
import { motion as Motion } from "framer-motion";
import "./splash.css";

const SplashScreen = () => {
  const text = "Foodies";

  const letterVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0 },
  };

  return (
     <Motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <h1 className="splash-text">
        {text.split("").map((char, index) => (
          <Motion.span
            key={index}
            className="splash-char"
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            {char}
          </Motion.span>
        ))}
      </h1>
    </Motion.div>
  );
};

export default SplashScreen;
