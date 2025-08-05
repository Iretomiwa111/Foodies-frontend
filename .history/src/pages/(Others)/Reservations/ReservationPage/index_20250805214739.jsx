import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/client";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: ,
    notes: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/reservations", formData);
      toast.success("Reservation made successfully!");
      navigate("/reserve-confirmation");

      setFormData({
        name: "",
        email: "",
        date: "",
        time: "",
        guests: 1,
        notes: "",
        contact: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const underlineInput =
    "w-full bg-transparent border-b border-white/70 placeholder-gray rounded-sm placeholder:text-base font-medium py-4 text-base px-2 text-white tracking-wide focus:outline-none focus:border-white";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/8c/c7/18/8cc718fdc522daf67157feee83e5da1e.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          Book a Reservation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className={underlineInput}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className={underlineInput}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={underlineInput}
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className={underlineInput}
          />
          <input
            type="number"
            name="guests"
            min={1}
            value={formData.guests}
            onChange={handleChange}
            placeholder="No. of Guests"
            required
            className={underlineInput}
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Phone or Alt Contact"
            required
            className={underlineInput}
          />
        </div>

        {/* Contact - full width input */}
        <div className="mt-6"></div>

        <input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Special Requests (optional)"
          className={`${underlineInput} mt-6 text-center`}
          rows={3}
        />

        <button
          type="submit"
          className="w-full mt-8 bg-red-600 text-white text-sm tracking-wide font-medium py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationPage;
