import React from "react";
import NavBar from "../components/layout/NavBar";
import HeroSection from "./HeroSection";
import ImageSlider from "./SecSection";
import AboutUs from "./AboutUs";
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo";
import ReservationSection from "./ReserveSection";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "50px" }}>
        <HeroSection />
        <ImageSlider />
        <AboutUs />
        <AnimatedTestimonialsDemo />
        <ReservationSection />
        <div className="bg-[rgba(30,30,30,0.5)]">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
