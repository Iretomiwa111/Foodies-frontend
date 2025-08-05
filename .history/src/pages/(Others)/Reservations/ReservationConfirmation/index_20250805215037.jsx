import React from 'react'
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ReservationConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 text-white"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/8c/c7/18/8cc718fdc522daf67157feee83e5da1e.jpg')",
      }}
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-10 max-w-xl w-full text-center shadow-lg border border-white/20">
        <FaCheckCircle className="text-green-400 text-5xl mx-auto mb-4 drop-shadow" />
        <h2 className="text-4xl font-medium mb-2 drop-shadow">Reservation Confirmed!</h2>
        <p className="mb-6 text-white/80 tracking-wider text-base">
          Thank you for booking with us. We've received your reservation and look forward to seeing you!
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="bg-white text-black font-medium py-2 text-sm rounded hover:bg-gray-200 transition"
          >
            Return to Home
          </Link>
          <Link
            to="/menu"
            className="bg-red-600 text-white font-medium text-sm py-2 rounded hover:bg-red-700 transition"
          >
            View Our Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
