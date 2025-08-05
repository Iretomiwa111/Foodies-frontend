import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { router } from "./routes";
import SplashScreen from "./pages/Splash/SplashScreen";

const RootApp = () => {

 const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

    return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : (
        <RouterProvider router={router} key="app" />
      )}
    </AnimatePresence>
  );
};
export default RootApp;
