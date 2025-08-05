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
              src="https://i.pinimg.com/1200x/3a/e9/a9/3ae9a98ae285f1a697d3e426b8ceb586.jpg"
              alt="Interior 1"
            />
            <img
              src="https://i.pinimg.com/736x/70/60/0e/70600e0776c0db3a21c7485c9b75574b.jpg"
              alt="Interior 2"
            />
            <img
              src="https://i.pinimg.com/736x/3b/92/81/3b92818a0830b031436e04ac0eabf8f4.jpg"
              alt="Interior 3"
            />
            <img
              src="https://i.pinimg.com/736x/8c/c7/18/8cc718fdc522daf67157feee83e5da1e.jpg"
              alt="Interior 1"
            />
            <img
              src="https://i.pinimg.com/1200x/73/f1/d3/73f1d37f94bbc54243f741ce28d7c3d2.jpg"
              alt="Interior 2"
            />
            <img
              src="https://i.pinimg.com/736x/78/11/84/781184aee8ec00c4c2b7971936063a00.jpg"
              alt="Interior 3"
            />
            <img
              src="https://i.pinimg.com/1200x/87/8e/2d/878e2d182770c30dc2c9d6a4e0d08b9f.jpg"
              alt="Interior 2"
            />
            <img
              src="https://i.pinimg.com/736x/c1/63/9e/c1639e03132ad3d293906234179aa040.jpg"
              alt="Interior 3"
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
