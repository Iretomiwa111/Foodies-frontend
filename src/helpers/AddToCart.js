import { toast } from "sonner";
import { privateApiClient } from "@/lib/client";

export const handleAddToCart = async (menuItemId, quantity = 1) => {
  try {
    console.log("Adding to cart with ID:", menuItemId);
    const res = await privateApiClient.post("/api/v1/cart", {
      menuItemId,
      quantity,
    });

    toast.success("Added to cart!");
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      toast.error("Please login to add items to cart");
    } else {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
    console.error("Add to cart error:", err);
    return null;
  }
};
