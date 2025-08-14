import { useState, useEffect, useContext } from "react";
import { ClientApi } from "../api/client";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const useClient = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userProfile, setUserProfile] = useState(null);
    const { logout} = useContext(AuthContext);

  const fetchMyProfile = async () => {
    try {
      const res = await axios.get(ClientApi.myProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success && res.data.user) {
        setUserProfile(res.data.user);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  const updateProfile = async (formData) => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      return { success: false, message: "Passwords do not match." };
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      if (formData.photo) data.append("photo", formData.photo);
      if (formData.password) data.append("password", formData.password);

      const res = await axios.put(ClientApi.updateProfile, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setUserProfile(res.data.user);
        return { success: true, message: "Profile updated successfully." };
      } else {
        return {
          success: false,
          message: res.data.message || "Update failed.",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.message || "Failed to update profile.",
      };
    }
  };

  const deleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?"))
      return { success: false, message: "Deletion cancelled." };

    try {
      const res = await axios.delete(ClientApi.deleteProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        logout();
        return {
          success: true,
          message: "Profile deleted. You have been logged out.",
        };
      } else {
        return { success: false, message: "Failed to delete profile." };
      }
    } catch (err) {
      return {
        success: false,
        message: err.message || "Failed to delete profile.",
      };
    }
  };

  useEffect(() => {
    if (token) fetchMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    token,
    setToken,
    userProfile,
    setUserProfile,
    fetchMyProfile,
    updateProfile,
    deleteProfile,
  };
}

export default useClient;