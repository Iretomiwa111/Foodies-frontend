import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateApiClient } from "@/lib/client";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await privateApiClient.get("/user/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    const timeout = setTimeout(fetchUser, 150);
    return () => clearTimeout(timeout);
  }, []);

  const logout = async () => {
    await privateApiClient.post("/auth/logout");
    setUser(null);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
