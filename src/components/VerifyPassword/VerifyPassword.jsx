import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import "./pass.css";

const PasswordVerifyModal = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/verify-password",
        { password },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      onSuccess(); // Continue the protected action
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Re-enter Your Password</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordVerifyModal;
