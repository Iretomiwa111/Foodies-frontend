import React from "react";
import { toast } from "sonner";
import "./contact.css";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import NavBar from "@/pages/components/layout/NavBar";

const Contact = () => {
  const handleSubmit = (e) => {
  e.preventDefault();
  toast.success("Message sent! We'll get back to you shortly.");
  e.target.reset();
};

  return (
    <div>
      <NavBar/>
      <div className="contact-page">
        <div className="contact-hero">
          <div className="overlay">
            <h1 className="font-lobster">Contact Us</h1>
            <p>
              We’re here to serve you — dine-in, takeout, or host your next
              event!
            </p>
          </div>
        </div>

        <section className="contact-details">
          <div className="contact-box">
            <h2>📍 Headquarters</h2>
            <p>123 Flavor Street, Victoria Island, Lagos, Nigeria</p>
            <p>Open Daily: 9AM – 10PM</p>
          </div>

          <div className="contact-box">
            <h2>📞 Contact</h2>
            <p>Phone: +234 810 000 1234</p>
            <p>Email: contact@foodies.com</p>
          </div>

          <div className="contact-box">
            <h2>🌍 Global Expansion</h2>
            <p>🇺🇸 Coming Soon: New York, USA</p>
            <p>🇬🇧 London, UK</p>
            <p>🇿🇦 Johannesburg, South Africa</p>
          </div>
        </section>

        <h1 className="font-lobster">We Can Provide You With</h1>
        <section className="extras">
          <div className="extra-box">
            <h3>🍽️ Dine-In Experience</h3>
            <p>
              Enjoy ambient lighting, cozy seating (up to 120 guests), and live
              music on weekends.
            </p>
          </div>
          <div className="extra-box">
            <h3>🛍️ Takeout & Delivery</h3>
            <p>
              Fast delivery via Jumia Food, Glovo & BoltFood. Estimated
              delivery: 20–30 mins.
            </p>
          </div>
          <div className="extra-box">
            <h3>🎉 Catering & Events</h3>
            <p>
              We cater birthdays, weddings, and office parties. Custom menus
              available!
            </p>
          </div>
          <div className="extra-box">
            <h3>🍾 Private Reservations</h3>
            <p>
              Book exclusive tables or private rooms for special moments. Call
              ahead!
            </p>
          </div>
          <div className="extra-box">
            <h3>🎁 Loyalty Program</h3>
            <p>Join FoodiePoints — earn rewards & discounts with every meal!</p>
          </div>
        </section>

        <section className="socials">
          <h2>Connect With Us</h2>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </section>

        <div className="map-container">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.6201947887425!2d3.421400877006065!3d6.426378823208822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf49f546cb0fd%3A0x2d303d8e4063d37!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1658797278811"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "10px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <section className="contact-touch-section">
          <div className="contact-container">
            <h2>Let’s Talk</h2>
            <p>
              We’d love to hear from you. Whether you have a question or just
              want to say hello, feel free to reach out.
            </p>

            <form className="contact-touch-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <textarea placeholder="Your Message" rows="6" required></textarea>
              <button type="submit">Send Message</button>
            </form>
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

export default Contact;
