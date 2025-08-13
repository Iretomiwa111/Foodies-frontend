// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { apiClient } from "@/lib/client";
// import { toast } from "sonner";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!password || !confirmPassword) return toast.error("Fill all fields");
//     if (password !== confirmPassword) return toast.error("Passwords do not match");

//     setLoading(true);
//     try {
//       await apiClient.post(`/auth/reset-password/${token}`, { password });
//       toast.success("Password reset successful! Please login.");
//       navigate("/auth");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-page">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="New password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button disabled={loading}>
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// }





import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/client";
import { toast } from "sonner";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import "./reset.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return toast.error("Fill all fields");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await apiClient.post(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful! Please login.");
      navigate("/auth");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-bg">
      <div className="reset-card">
        <button
          className="back-arrow"
          type="button"
          onClick={() => navigate("/auth")}
          aria-label="Back to Login"
        >
          <FaArrowLeft size={22} />
        </button>
        <h2 className="reset-title">Reset Password</h2>
        <p className="reset-desc">
          Create your new password and confirm it below.
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type={showPass ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="show-hide"
              onClick={() => setShowPass((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="input-group">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="show-hide"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button className="reset-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}