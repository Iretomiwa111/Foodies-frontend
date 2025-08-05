"use client";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import NavBar from "../../components/layout/NavBar";
import AceternitySlider from "../FirstSection";
import MenuGrid from "../SecSection";
import AdminMenu from "@/pages/(Admin)";
import Footer from "@/pages/components/layout/Footer";
import FocusCardsDemo from "@/components/focus-cards-demo";

import { privateApiClient } from "@/lib/client";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const resultRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = () => {
    const trimmed = searchValue.trim();

    if (!trimmed) {
      toast.error("Please enter a search term");
      return;
    }

    setSearchTerm(trimmed);
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  const categories = [
    "All",
    "Rice",
    "Pasta",
    "Steak",
    "Seafood",
    "Drinks",
    "Milkshake",
    "Snacks",
    "International Cusine",
    "Others",
  ];


  const fetchMenuAgain = () => {
    privateApiClient
      .get("/menu")
      .then((res) => setMenuItems(res.data.menu || []))
      .catch((err) => console.error("Menu refresh failed:", err));
  };

  useEffect(() => {
    privateApiClient
      .get("/user/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        console.log("User not authenticated, redirecting...");
        navigate("/auth");
      });
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    privateApiClient
      .get("/menu")
      .then((res) => {
        setMenuItems(res.data.menu || []);
      })
      .catch((err) => {
        console.error("Menu fetch failed:", err);
      });
  }, [user]);

  useEffect(() => {
    const filtered = menuItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFilteredItems(filtered);
  }, [menuItems, searchTerm, selectedCategory]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <AceternitySlider />
        <div className="absolute top-0 left-0 w-full z-30">
          <NavBar
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
      </div>

      <section ref={resultRef} className="px-4 py-12 bg-[#1a1a1a]">
        <h2 className="text-3xl font-bold mb-8 text-center  text-white font-lobster">Our Menu</h2>

        {user?.role === "admin" && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setModalOpen(true);
                setModalMode("create");
                setSelectedItem(null);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Create Dish
            </button>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-3 mb-6 ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${
                  selectedCategory === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={resultRef}>
          {searchTerm && (
            <>
              <div className="text-center mb-2">
                <p className="text-gray-500">
                  Showing {filteredItems.length} result
                  {filteredItems.length !== 1 && "s"} for "
                  <span className="font-semibold">{searchTerm}</span>"
                </p>
              </div>

              <div className="text-center mb-6">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearchValue("");
                    resultRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-green-600 text-sm underline hover:text-green-800 transition"
                >
                  Clear Search
                </button>
              </div>
            </>
          )}

          <MenuGrid
            dishes={filteredItems}
            user={user}
            onMenuUpdate={fetchMenuAgain}
            onEdit={(item) => {
              setModalOpen(true);
              setModalMode("edit");
              setSelectedItem(item);
            }}
          />
        </div>
      </section>

      {/* Admin Modal */}
      <AdminMenu
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        initialData={selectedItem}
        onSuccess={fetchMenuAgain}
      />
    <FocusCardsDemo/>
          <Footer/>
    </>
  );
};

export default MenuPage;
