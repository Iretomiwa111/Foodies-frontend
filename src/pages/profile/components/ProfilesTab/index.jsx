import { useState } from "react";
import { useAuth } from "@/pages/context/AuthContext";
import { privateApiClient } from "@/lib/client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileTab = () => {
  const { user, setUser, logout } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await privateApiClient.put("/user/update-profile", formData);
      setUser(res.data.user);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-medium tracking-wide">Profile Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="text-xl">
                {user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-black dark:text-gray-300">{user.name}</p>
          </div>

          {/* File Upload + Buttons */}
          <div className="flex flex-col gap-3 w-full">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={loading || !file}
                className="bg-blue-700 text-white hover:bg-blue-800 tracking-wide"
              >
                {loading ? "Uploading..." : "Upload Image"}
              </Button>
              <Button
                variant="destructive"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;


