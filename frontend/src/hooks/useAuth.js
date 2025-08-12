import { useState, useEffect } from "react";
import {ClientApi} from "../api/client";
import  {authApi, API_BASE } from "../api/auth";
import axios from "axios";

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userProfile, setUserProfile] = useState(null);

  const logout = () => {
    setToken("");
    setUserProfile(null);
    localStorage.removeItem("token");
    window.history.pushState(null, "", "/");
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

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

  const loginUser = async (data, isLogin = true) => {
    const url = isLogin ? authApi.login : authApi.register;
    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "An error occurred!",
      };
    }
  };

  return {
    token,
    setToken,
    userProfile,API_BASE,
    setUserProfile,
    fetchMyProfile,
    loginUser,
    logout,
    updateProfile,
    deleteProfile,
  };
}

export default useAuth;