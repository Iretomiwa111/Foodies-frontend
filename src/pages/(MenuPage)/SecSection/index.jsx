"use client";
import { motion as Motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";

const MenuGrid = ({ dishes, user, onMenuUpdate, onEdit }) => {
  console.log("Dishes received:", dishes);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };
  const handleAddToCart = (dish) => {
    addToCart(dish);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/menu/${pendingDeleteId}`,
        {
          withCredentials: true,
        }
      );
      onMenuUpdate();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  if (!Array.isArray(dishes))
    return <div className="text-center py-10">Loading menu...</div>;
  if (dishes.length === 0)
    return (
      <div className="text-white font-tangerine text-3xl">No dishes found</div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {dishes.map((dish, index) => (
          <Motion.div
            key={dish._id}
            className="bg-[#2b2b2b] rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col w-full h-[500px] mx-auto"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            {/* Bigger image section */}
            <div className="h-72 w-full p-2 flex items-center justify-center">
              <img
                src={`http://localhost:5000/${dish.image}`}
                alt={dish.name}
                className="w-full h-full object-contain rounded-full transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300";
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-1">
              <h3 className="text-2xl font-lobster text-[#ddd] font-semibold truncate">
                {dish.name}
              </h3>
              <p className="text-gray-400 font-tangerine text-4xl">
                {dish.category}
              </p>
              <p className="text-base font-lobster tracking-wide font-bold text-[#fff]">
                ₦ {dish.price}
              </p>

              {!dish.available && (
                <p className="text-sm text-red-500 font-lobster font-medium">
                  Currently Unavailable
                </p>
              )}

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  disabled={!dish.available}
                  onClick={() => {
                    console.log("Adding to cart with ID:", dish._id);
                    handleAddToCart(dish);
                  }}
                  className={`px-4 py-2 font-lobster rounded-md text-sm transition ${
                    dish.available
                      ? "bg-[#34a85a] hover:bg-[#4CAF50] text-[#333]"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  {dish.available ? "Add to Cart" : "Unavailable"}
                </button>

                {user?.role === "admin" && (
                  <div className="flex gap-1">
                    <button
                      className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                      onClick={() => onEdit(dish)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      onClick={() => requestDelete(dish._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      {/*  Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          >
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm"
            >
              <h2 className="text-lg font-semibold mb-4 font-lobster text-black">
                Delete This Dish?
              </h2>
              <p className="text-sm text-gray-600 mb-6 font-lobster">
                Are you sure you want to permanently delete this menu item?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    setPendingDeleteId(null);
                  }}
                  className="px-4 py-2 text-sm text-black font-lobster rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-lobster rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuGrid;
