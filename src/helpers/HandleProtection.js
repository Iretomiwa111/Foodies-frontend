import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/pages/context/AuthContext";

export const useProtectedAction = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

 const check = (callback, nextPath = "/") => {
  if (!user) {
    toast.warning("Please login or sign up first");
    setTimeout(() => {
      navigate("/auth", { state: { from: nextPath } }); 
    }, 1200);
    return;
  }
  callback();
};
  return check;
};
