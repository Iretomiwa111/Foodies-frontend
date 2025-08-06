import { createBrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Layout from "./pages/components/layout";
import { AuthProvider } from "./pages/context/AuthProvider";
import Profile from "./pages/profile";
import MenuPage from "./pages/(MenuPage)/Meun";
import PrivateRoute from "./components/PrivateRoute";
import CartPage from "./pages/(AddToCart)";
import CheckoutPage from "./pages/(Others)/CheckoutPage/CheckoutPage";
import OrderConfirmation from "./pages/(Others)/OrdersPage/OrderConfirmation";
import AdminRoute from "./components/AdminRoute";
import AdminOrderPage from "./pages/(Admin)/AdminOrderPage";
import AdminReservationPage from "./pages/(Admin)/AdminReservationpage";
import HomePage from "./pages/(HomePage)";
import AboutUs from "./pages/(HomePage)/AboutUs";
import ReservationPage from "./pages/(Others)/Reservations/ReservationPage";
import ReservationConfirmation from "./pages/(Others)/Reservations/ReservationConfirmation";
import Services from "./pages/(Others)/Services";
import About from "./pages/(Others)/About";
import Contact from "./pages/(Others)/Contact";
// import ResetPassword from "./pages/(Others)/ResetPassword";
// import ForgotPassword from "./pages/(Others)/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <HomePage />, 
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "auth",
        element: <A/>,
      },
      {
        path: "login",
        element: <Auth />,
      },

      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "menu",
        element: (
          <PrivateRoute>
            <MenuPage />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "order-confirmation",
        element: (
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        ),
      },
      {
        path: "reserve-confirmation",
        element: (
          <PrivateRoute>
            <ReservationConfirmation />
          </PrivateRoute>
        ),
      },
      {
        path: "reserve",
        element: (
          <PrivateRoute>
            <ReservationPage />
          </PrivateRoute>
        ),
      },
      {
        path: "services",
        element: (
          <PrivateRoute>
            <Services />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },

      // ADMIN ROUTES
      {
        path: "admin/orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminOrderPage />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/reservations",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminReservationPage />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // ✅ FUTURE ROUTES
      // {
      //   path: "reset-password/:token",
      //   element: <ResetPassword />,
      // },
      // {
      //   path: "forgot-password",
      //   element: <ForgotPassword />,
      // },
    ],
  },
]);
