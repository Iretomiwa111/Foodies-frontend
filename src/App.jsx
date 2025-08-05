import { Outlet } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default App;

