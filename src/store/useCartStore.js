import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("http://localhost:5000/api/v1/cart", {
        withCredentials: true,
      });
      set({ cart: res.data });
    } catch {
      toast.error("Failed to fetch cart");
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (menuItem) => {
    try {
      console.log("Sending to backend:", {
        menuItem: typeof menuItem === "string" ? menuItem : menuItem._id,
        quantity: 1,
      });

      await axios.post(
      "http://localhost:5000/api/v1/cart",
      { menuItemId: menuItem._id, quantity: 1 }, // ✅ send menuItemId instead of menuItem
      { withCredentials: true }
    );

      toast.success("Added to cart!");
      await get().fetchCart();
    } catch {
      toast.error("Could not add to cart");
    }
  },

  removeCartItem: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/cart/${id}`, {
        withCredentials: true,
      });
      toast.success("Item removed");
      await get().fetchCart();
    } catch {
      toast.error("Remove failed");
    }
  },

  updateCartItemQuantity: async (id, quantity) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/cart/${id}`,
        { quantity },
        { withCredentials: true }
      );
      toast.success("Quantity updated!");
      await get().fetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  },
}));
