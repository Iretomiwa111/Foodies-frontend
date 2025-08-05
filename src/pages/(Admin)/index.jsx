"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "sonner";
import { privateApiClient } from "@/lib/client";

const AdminMenu = ({ isOpen, onClose, mode, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    available: true,
    image: null,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "",
        price: initialData.price || "",
        available: initialData.available || false,
        image: null,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        available: true,
        image: null,
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting menu form:", formData);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("available", formData.available);
    if (formData.image) data.append("image", formData.image);

    try {
      if (mode === "edit") {
        await privateApiClient.put(`/menu/${initialData._id}`, data);
        toast.success("Menu item updated!");
      } else {
        await privateApiClient.post("/menu", data);
        toast.success("Menu item created!");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Something went wrong.");
      console.error("Modal submit error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 text-black ">
        <Dialog.Panel className="bg-white rounded-xl w-full max-w-lg p-6 space-y-4 shadow-lg">
          <Dialog.Title className="text-xl font-bold">
            {mode === "edit" ? "Edit Dish" : "Create Dish"}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded placeholder:text-gray-800"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded placeholder:text-gray-800"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded placeholder:text-gray-800"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded placeholder:text-gray-800"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
              />
              Available
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full placeholder:text-gray-800"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {mode === "edit" ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AdminMenu;
