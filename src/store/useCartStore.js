import { create } from "zustand";
import { toast } from "sonner";
import { privateApiClient } from "@/lib/client";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await privateApiClient.get("/cart");
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

      await privateApiClient.post("/cart", {
        menuItemId: menuItem._id,
        quantity: 1,
      });

      toast.success("Added to cart!");
      await get().fetchCart();
    } catch {
      toast.error("Could not add to cart");
    }
  },

  removeCartItem: async (id) => {
    try {
      await privateApiClient.delete(`/cart/${id}`);
      toast.success("Item removed");
      await get().fetchCart();
    } catch {
      toast.error("Remove failed");
    }
  },

  updateCartItemQuantity: async (id, quantity) => {
    try {
      await privateApiClient.patch(`/cart/${id}`, { quantity });
      toast.success("Quantity updated!");
      await get().fetchCart();
    } catch {
      toast.error("Failed to update quantity");
    }
  },
}));
