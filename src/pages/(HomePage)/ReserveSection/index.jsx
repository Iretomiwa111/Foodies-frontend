import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/pages/context/AuthContext";

export default function ReservationSection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProtectedClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      toast.warning("Please login or sign up first");
      setTimeout(() => navigate(`/auth?next=${path}`), 1200);
    }
  };

  return (
    <div>
      <h1 className="font-tangerine text-6xl mb-10">Reserve a Table Now</h1>
      <section className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen bg-white">
        {/* Left Image */}
        <div className="w-full md:w-1/2 h-[400px] md:h-screen">
          <img
            src="/reserveres.avif"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 h-full bg-white/30 backdrop-blur-lg p-8 md:p-16 flex flex-col justify-center items-start text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Reserve Your Seat
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Whether it’s a romantic dinner or a gathering with friends, book
            your table and enjoy an unforgettable experience.
          </p>
          <Link
            to="/reserve"
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            onClick={(e) => handleProtectedClick(e, "/reserve")}
          >
            Book a Table
          </Link>
        </div>
      </section>
    </div>
  );
}
