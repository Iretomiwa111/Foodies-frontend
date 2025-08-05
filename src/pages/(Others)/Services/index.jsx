import React from "react";
import {
  FaUtensils,
  FaMotorcycle,
  FaConciergeBell,
  FaGlassCheers,
  FaGift,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import "./services.css";
import NavBar from "@/pages/components/layout/NavBar";
import useAnimateOnScroll from "@/pages/hooks/useAnimateOnScroll";

const ServicePage = () => {
  const [ctaRef, ctaVisible] = useAnimateOnScroll();
  return (
    <div>
      <NavBar />
      <div className="services-page">
        <section className="services-hero">
          <h1>Our Services</h1>
          <p>Experience the best of dining, delivery, and more.</p>
        </section>

        <section className="service-cards">
          <div className="card">
            <FaUtensils className="icon" />
            <h3>Dine-In Experience</h3>
            <p>
              Enjoy a cozy ambiance, spacious seating, and top-tier service at
              our Lagos location.
            </p>
          </div>
          <div className="card">
            <FaMotorcycle className="icon" />
            <h3>Takeout & Delivery</h3>
            <p>
              Partnered with Jumia Food, Glovo, and BoltFood. Fast delivery
              across Lagos & expanding.
            </p>
          </div>
          <div className="card">
            <FaConciergeBell className="icon" />
            <h3>Catering</h3>
            <p>
              Perfect for weddings, birthdays, and corporate events. Customized
              menus available.
            </p>
          </div>
          <div className="card">
            <FaGlassCheers className="icon" />
            <h3>Private Events</h3>
            <p>
              Reserve our exclusive dining space for your private parties or
              special occasions.
            </p>
          </div>
          <div className="card">
            <FaGift className="icon" />
            <h3>Loyalty Program</h3>
            <p>
              Earn points, enjoy exclusive discounts and birthday perks when you
              join our loyalty program.
            </p>
          </div>
        </section>

        <section className="why-choose">
          <h2>Why Choose Us?</h2>
          <div className="highlights">
            <div className="highlight">
              <FaCheckCircle /> Fresh Ingredients Daily
            </div>
            <div className="highlight">
              <MdFastfood /> Award-Winning Chefs
            </div>
            <div className="highlight">
              <GiTakeMyMoney /> Fast Delivery & Tracking
            </div>
            <div className="highlight">
              <FaStar /> 4.8 Star Customer Reviews
            </div>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <h3>1. Browse Menu</h3>
              <p>Explore our rich variety of local and international dishes.</p>
            </div>
            <div className="step">
              <h3>2. Place Order</h3>
              <p>Order online or reserve a table in a few simple clicks.</p>
            </div>
            <div className="step">
              <h3>3. Enjoy Meal</h3>
              <p>Delivered to your door or served in-house with style.</p>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Customers Say</h2>
          <div className="testimonial-box">
            <p>“Their catering service made our wedding unforgettable!”</p>
            <span>- Jane O., Lagos</span>
          </div>
          <div className="testimonial-box">
            <p>“Love the loyalty rewards, I get discounts almost weekly!”</p>
            <span>- Tunde A., VI</span>
          </div>
        </section>

        <section className={`cta ${ctaVisible ? "animate" : ""}`} ref={ctaRef}>
          <h2>Ready to experience our services?</h2>
          <div className="cta-buttons">
            <button className="reserve-btn">Reserve a Table</button>
            <button className="join-btn">Join Loyalty Program</button>
          </div>
        </section>
          <div className="footer">
          <p>&copy; 2025 Foodies. All rights reserved.</p>
          <p>Follow us on social media for the latest updates!</p>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
