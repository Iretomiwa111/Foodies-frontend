import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { toast } from "sonner";
import { privateApiClient } from "@/lib/client";

const AdminReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await privateApiClient.get("/reservations");
      setReservations(res.data);
    } catch {
      toast.error("Failed to fetch reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

   return (
    <Motion.div
      className="p-6 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6">Admin Reservations</h1>

      {loading ? (
        <p>Loading reservations...</p>
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left text-sm uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Guests</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Request</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {reservations.map((res) => (
                <Motion.tr
                  key={res._id}
                  className="border-t border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-4 py-2">{res.user?.name || "-"}</td>
                  <td className="px-4 py-2">{res.guests}</td>
                  <td className="px-4 py-2">{res.date?.split("T")[0]}</td>
                  <td className="px-4 py-2">{res.time}</td>
                  <td className="px-4 py-2">{res.user?.email ? res.user.email : "-"}</td>
                  <td className="px-4 py-2">{res.notes || "-"}</td>
                </Motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Motion.div>
  );

}

export default AdminReservationPage