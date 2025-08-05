import React from "react";

const AboutUs = () => {
  return (
    <div>
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center border border-white/20 rounded-2xl p-8 backdrop-blur-md bg-white/5">
          <div className="space-y-6 text-white">
            <h2 className="text-6xl font-bold">Our Story</h2>
            <p className="text-lg leading-relaxed text-gray-200">
              Welcome to{" "}
              <span className="text-yellow-300 font-semibold">Foodies</span>,
              where passion meets plate. Our journey began in a cozy kitchen
              with a big dream — to bring people together through unforgettable
              food experiences. Over time, we’ve grown into a beloved dining
              destination, known for our handcrafted dishes, fresh local
              ingredients, and a welcoming atmosphere that feels just like home.
              <br />
              <br />
              Every meal we serve is more than just food — it's a story of
              culture, creativity, and care. Whether you're joining us for a
              casual lunch, a special celebration, or a late-night bite, we
              promise flavor that satisfies and service that warms the soul.
            </p>
          </div>

          <div className="border border-white/20 rounded-2xl overflow-hidden">
            <img
              src="https://i.pinimg.com/1200x/81/b4/e3/81b4e392f820324a3beb59e2c9ee1795.jpg"
              alt="Our Kitchen"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
