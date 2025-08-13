import React from "react";
import "./about.css";
import { Link } from "react-router-dom";
import { FaUtensils, FaStar, FaTruck, FaSmile } from "react-icons/fa";
import NavBar from "@/pages/components/layout/NavBar";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
  const elements = document.querySelectorAll(".show-on-scroll");

  const callback = () => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", callback);
  callback(); // trigger on load

  return () => window.removeEventListener("scroll", callback);
}, []);
  return (
    <div>
      <NavBar />
     <div className="about-page" style={{ marginBottom: "100px" }}>
        <section className="about-hero">
          <div className="overlay">
            <h1>About Us</h1>
            <p>Get to know our story, vision, and what makes us special.</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="about-section story">
          <h2>Our Story</h2>
          <p>
            From humble beginnings in Lagos, Nigeria, our restaurant was born
            out of a passion for bringing people together through great food and
            memorable experiences. Now, we're expanding globally with branches
            opening soon in the USA and beyond.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="about-section mission-vision">
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To serve exceptional dishes with love and hospitality that make
              every meal unforgettable.
            </p>
          </div>
          <div className="card">
            <h3>Our Vision</h3>
            <p>
              To become a global symbol of culinary excellence, connecting
              cultures one dish at a time.
            </p>
          </div>
        </section>

        {/* Our Space */}
        <section className="about-section our-space">
          <h2>Our Space</h2>
          <p>
            Step inside and experience our elegant, cozy, and welcoming
            ambiance.
          </p>
          <div className="space-gallery">
            <img
              src="/interior1.webp"
              alt="Interior 1"
            />
            <img
              src="/interior2.webp"
              alt="Interior 2"
            />
            <img
              src="/interior3.webp"
              alt="Interior 3"
            />
            <img
              src="/interior4.webp"
              alt="Interior 4"
            />
            <img
              src="/interior5.webp"
              alt="Interior 5"
            />
            <img
              src="/interior6.webp"
              alt="Interior 6"
            />
            <img
              src="/interior7.webp"
              alt="Interior 7"
            />
            <img
              src="/interior8.webp"
              alt="Interior 8"
            />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="about-section why-choose-us">
          <h2>Why Choose Us</h2>
          <div className="reasons">
            <div className="reason">
              <FaUtensils className="icon" />
              <h4>Quality Food</h4>
              <p>Only the freshest ingredients and perfected recipes.</p>
            </div>
            <div className="reason">
              <FaStar className="icon" />
              <h4>Ambiance</h4>
              <p>A cozy, modern space perfect for any occasion.</p>
            </div>
            <div className="reason">
              <FaTruck className="icon" />
              <h4>Fast Delivery</h4>
              <p>Get your favorite meals at your doorstep in no time.</p>
            </div>
            <div className="reason">
              <FaSmile className="icon" />
              <h4>Great Service</h4>
              <p>Friendly staff always ready to serve you with a smile.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
       <section className="about-section cta fadeUp show-on-scroll">
          <h2>Join Our Journey</h2>
          <div className="cta-buttons">
            <Link to="/menu">
              <button>View Our Menu</button>
            </Link>
            <Link to="/reserve">
              <button>Book a Table</button>
            </Link>
            {/* <Link to="/story"> */}
              <button>Join Our Story</button>
            {/* </Link> */}
          </div>
        </section>
      </div>
       <div className="footer">
          <p>&copy; 2025 Foodies. All rights reserved.</p>
          <p>Follow us on social media for the latest updates!</p>
        </div>
    </div>
  );
};

export default AboutPage;
