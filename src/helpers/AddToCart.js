import axios from "axios";
import { toast } from "sonner";

export const handleAddToCart = async (menuItemId, quantity = 1) => {
  try {
    console.log("Adding to cart with ID:", menuItemId);
    const res = await axios.post(
      "http://localhost:5000/api/v1/cart",
      {  menuItemId: menuItemId, quantity },
      { withCredentials: true }
    );
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
