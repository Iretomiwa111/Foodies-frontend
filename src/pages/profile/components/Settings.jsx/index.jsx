import { useState } from "react";
import PasswordVerifyModal from "@/components/VerifyPassword/VerifyPassword";
import { useAuth } from "@/pages/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

const SettingsTab = () => {
  const { user } = useAuth();
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // This gets triggered AFTER password is verified
  const handlePasswordUpdate = async () => {
    try {
      await axios.put("http://localhost:5000/api/v1/user/change-password", {
        currentPassword,
        newPassword,
      }, { withCredentials: true });



      toast.success("Password updated successfully");
      setNewPassword("");
      setCurrentPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  const handleClick = () => {
    if (!newPassword || !currentPassword) {
      return toast.error("Please fill out both fields");
    }
    setShowVerifyModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-xl font-medium mb-2">Change Password</h4>
        <div className="grid gap-2 max-w-sm">
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600 outline-none tracking-wide text-sm"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="px-3 py-2 tracking-wider border rounded dark:bg-gray-800 dark:border-gray-600 text-sm"
          />
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 tracking-wider text-sm"
          >
            Update Password
          </button>
        </div>
        {/* <div>
        <h4 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h4>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Delete Account
        </button>
      </div> */}
      </div>

      {/* Password Verification Modal */}
      {showVerifyModal && (
        <PasswordVerifyModal
          email={user.email}
          onSuccess={() => {
            setShowVerifyModal(false);
            handlePasswordUpdate();
          }}
          onClose={() => setShowVerifyModal(false)}
        />
      )}
    </div>
  );
};

export default SettingsTab;
