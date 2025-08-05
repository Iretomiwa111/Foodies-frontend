import { useAuth } from "@/pages/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute check:", { user, authLoading });

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="animate-pulse text-xl text-gray-500 dark:text-gray-300">
          Checking authentication...
        </span>
      </div>
    );
  }

  if (!user) {
    // ✅ Preserve original location in state
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
