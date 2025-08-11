// StoreContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API, API_BASE } from "./api";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userProfile, setUserProfile] = useState(null);
  const [galerie, setGalerie] = useState([]);
  const [servicesSections, setServicesSections] = useState([]);

  const fetchMyProfile = async () => {
    try {
      const res = await axios.get(API.myProfile, {
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

  const loginUser = async (data, isLogin = true) => {
    const url = isLogin ? API.login : API.register;
    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        // await fetchMyProfile();
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

  const logout = () => {
    setToken("");
    setUserProfile(null);
    localStorage.removeItem("token");
    window.history.pushState(null, "", "/login");
    window.onpopstate = () => {
      window.history.go(1);
    };
  };

  useEffect(() => {
    if (token) fetchMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Fetch all galerie
  const fetchGalerie = async () => {
    try {
      const res = await axios.get(API.listGalerie);
      // Make sure galerie is always an array
      setGalerie(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Error fetching galerie:", err);
      setGalerie([]);
    }
  };

  // StoreContext.jsx additions

  // Add new galerie with file upload
  const addGalerie = async (newItem) => {
    try {
      const formData = new FormData();
      formData.append("title", newItem.title || "");
      formData.append("alt", newItem.alt || "");
      if (newItem.image) {
        formData.append("image", newItem.image); // newItem.image is a File object
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(API.addGalerie, formData, config);
      setGalerie((prev) => [...prev, data.data || data]); // Adjust based on backend response
      return true;
    } catch (err) {
      console.error("Error adding galerie:", err);
      return false;
    }
  };

  // Edit galerie with file upload
  const editGalerie = async (id, updatedItem) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedItem.title || "");
      formData.append("alt", updatedItem.alt || "");
      formData.append("image", updatedItem.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(API.editGalerie(id), formData, config);
      setGalerie((prev) =>
        prev.map((g) => (g._id === id ? data.data || data : g))
      );
      return true;
    } catch (err) {
      console.error("Error editing galerie:", err);
      return false;
    }
  };

  // Delete galerie
  const deleteGalerie = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(API.removeGalerie(id), config);
      setGalerie((prev) => prev.filter((g) => g._id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting galerie:", err.response || err);
      return false;
    }
  };
  // Service
  // Fetch all service sections
  const fetchServiceSections = async () => {
    try {
      const res = await axios.get(API.listServiceSections);
      if (res.data.success) {
        setServicesSections(res.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching service sections:", err);
      setServicesSections([]);
    }
  };

  // Add new service section
  const addServiceSection = async (newSection) => {
    try {
      const res = await axios.post(API.addServiceSection, newSection);
      if (res.data.success) {
        setServicesSections((prev) => [...prev, res.data.data]);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding service section:", err);
      return false;
    }
  };

  // Update service section
  const updateServiceSection = async (id, updatedSection) => {
    try {
      const res = await axios.put(API.updateServiceSection(id), updatedSection);
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) => (sec._id === id ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating service section:", err);
      return false;
    }
  };

  // Remove service section
  const removeServiceSection = async (id) => {
    try {
      const res = await axios.delete(API.removeServiceSection(id));
      if (res.data.success) {
        setServicesSections((prev) => prev.filter((sec) => sec._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing service section:", err);
      return false;
    }
  };

  // Fetch all service sections and their items
  const listServiceSections = async () => {
    try {
      const res = await axios.get(API.listServiceSections);
      if (res.data.success) {
        setServicesSections(res.data.data || []);
        return true;
      }
      setServicesSections([]);
      return false;
    } catch (err) {
      console.error("Error fetching service sections:", err);
      setServicesSections([]);
      return false;
    }
  };

  // Add service item to a section
  const addServiceItem = async (sectionId, newItem) => {
    try {
      const res = await axios.post(API.addServiceItem(sectionId), newItem);
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) => (sec._id === sectionId ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding service item:", err);
      return false;
    }
  };

  // Update service item in a section
  const updateServiceItem = async (sectionId, itemId, updatedItem) => {
    try {
      const res = await axios.put(
        API.updateServiceItem(sectionId, itemId),
        updatedItem
      );
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) => (sec._id === sectionId ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating service item:", err);
      return false;
    }
  };

  // Remove service item from a section
  const removeServiceItem = async (sectionId, itemId) => {
    try {
      const res = await axios.delete(API.removeServiceItem(sectionId, itemId));
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) => (sec._id === sectionId ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing service item:", err);
      return false;
    }
  };
  return (
    <StoreContext.Provider
      value={{
        token,
        API,
        API_BASE,
        setToken,
        userProfile,
        setUserProfile,
        fetchMyProfile,
        loginUser,
        logout,
        galerie,
        fetchGalerie,
        addGalerie,
        editGalerie,
        deleteGalerie,
        servicesSections,
        fetchServiceSections,
        addServiceSection,
        updateServiceSection,
        removeServiceSection,
        listServiceSections,
        addServiceItem,
        updateServiceItem,
        removeServiceItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
