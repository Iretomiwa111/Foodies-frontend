// import { useState } from "react";
// import { apiClient } from "@/lib/client";
// import { toast } from "sonner";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return toast.error("Please enter your email");

//     setLoading(true);
//     try {
//       await apiClient.post("/auth/forgot-password", { email });
//       toast.success("Password reset link sent! Check your email.");
//       setEmail("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { apiClient } from "@/lib/client";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./forgot.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      await apiClient.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent! Check your email.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-bg">
      <div className="forgot-card">
        <button
          className="back-arrow"
          type="button"
          onClick={() => navigate("/login")}
          aria-label="Back to Login"
        >
          <FaArrowLeft size={22} />
        </button>
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-desc">
          Enter your email or phone number to reset your password quickly.
        </p>
        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="forgot-btn" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}