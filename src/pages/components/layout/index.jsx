import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/pages/context/AuthProvider";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <AuthProvider>
      <Toaster position="top-center" />
      {/* your navbar/header/footer */}
      <Outlet />
    </AuthProvider>
  );
};

export default Layout;
