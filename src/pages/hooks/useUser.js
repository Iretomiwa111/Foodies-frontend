
import { useEffect, useState } from "react";
import { privateApiClient } from "@/lib/client";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await privateApiClient.get("/user/me");
        setUser(res.data.user); 
        console.log("USER DATA:", res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, loading };
};
