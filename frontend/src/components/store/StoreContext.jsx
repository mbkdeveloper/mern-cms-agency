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
  const [testimonialsSections, setTestimonialsSections] = useState([]);
  const [headers, setHeaders] = useState([]);

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

      const res = await axios.put(API.updateProfile, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setUserProfile(res.data.user);
        return { success: true, message: "Profile updated successfully." };
      } else {
        return { success: false, message: res.data.message || "Update failed." };
      }
    } catch (err) {
      return { success: false, message: err.message || "Failed to update profile." };
    }
  };

  const deleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?"))
      return { success: false, message: "Deletion cancelled." };

    try {
      const res = await axios.delete(API.deleteProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        logout();
        return { success: true, message: "Profile deleted. You have been logged out." };
      } else {
        return { success: false, message: "Failed to delete profile." };
      }
    } catch (err) {
      return { success: false, message: err.message || "Failed to delete profile." };
    }
  };

  useEffect(() => {
    if (token) fetchMyProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loginUser = async (data, isLogin = true) => {
    const url = isLogin ? API.login : API.register;
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
  const fetchTestimonialsSections = async () => {
    try {
      const res = await axios.get(API.listTestimonialsSections);
      if (res.data.success) {
        setTestimonialsSections(res.data.data || []);
        return true;
      }
      setTestimonialsSections([]);
      return false;
    } catch (err) {
      console.error("Error fetching testimonials sections:", err);
      setTestimonialsSections([]);
      return false;
    }
  };

  const addTestimonialsSection = async (newSection) => {
    try {
      const res = await axios.post(API.addTestimonialsSection, newSection);
      if (res.data.success) {
        setTestimonialsSections((prev) => [...prev, res.data.data]);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding testimonials section:", err);
      return false;
    }
  };

  const updateTestimonialsSection = async (id, updatedSection) => {
    try {
      const res = await axios.put(
        API.updateTestimonialsSection(id),
        updatedSection
      );
      if (res.data.success) {
        setTestimonialsSections((prev) =>
          prev.map((sec) => (sec._id === id ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating testimonials section:", err);
      return false;
    }
  };

  const removeTestimonialsSection = async (id) => {
    try {
      const res = await axios.delete(API.removeTestimonialsSection(id));
      if (res.data.success) {
        setTestimonialsSections((prev) => prev.filter((sec) => sec._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing testimonials section:", err);
      return false;
    }
  };

  const addTestimonialItem = async (sectionId, newItem) => {
    try {
      const res = await axios.post(API.addTestimonialItem(sectionId), newItem);
      if (res.data.success) {
        setTestimonialsSections((prev) =>
          prev.map((sec) => (sec._id === sectionId ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error adding testimonial item:", err);
      return false;
    }
  };

  const updateTestimonialItem = async (sectionId, itemId, updatedItem) => {
    try {
      const res = await axios.put(
        API.updateTestimonialItem(sectionId, itemId),
        updatedItem
      );
      if (res.data.success) {
        setTestimonialsSections((prev) =>
          prev.map((sec) => (sec._id === sectionId ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error updating testimonial item:", err);
      return false;
    }
  };

  const removeTestimonialItem = async (sectionId, itemId) => {
    try {
      const res = await axios.delete(
        API.removeTestimonialItem(sectionId, itemId)
      );
      if (res.data.success) {
        setTestimonialsSections((prev) =>
          prev.map((sec) => (sec._id === sectionId ? res.data.data : sec))
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing testimonial item:", err);
      return false;
    }
  };

  // Fetch headers
  const fetchHeaders = async () => {
    try {
      const res = await axios.get(API.listHeaders);
      // Make sure galerie is always an array
      setHeaders(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (err) {
      console.error("Error fetching headers:", err);
      setHeaders([]);
    }
  };
  

const addHeader = async (headerData) => {
  try {
    const formData = new FormData();
    formData.append("title", headerData.title);
    formData.append("paragraph", headerData.paragraph);
    if (headerData.image instanceof File) {
      formData.append("image", headerData.image);
    }

    const res = await axios.post(API.addHeader, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setHeaders((prev) => [...(Array.isArray(prev) ? prev : []), res.data]);
    return true;
  } catch (err) {
    console.error("Failed to add header:", err);
    return false;
  }
};


  // Edit header
  const editHeader = async (id, updatedData) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("paragraph", updatedData.paragraph);
      if (updatedData.image instanceof File) {
        formData.append("image", updatedData.image);
      }

      const res = await axios.put(API.editHeader(id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setHeaders((prev) => prev.map((h) => (h._id === id ? res.data : h)));
      return true;
    } catch (err) {
      console.error("Failed to edit header:", err);
      return false;
    }
  };

  // Delete header
  const deleteHeader = async (id) => {
    try {
      await axios.delete(API.removeHeader(id));
      setHeaders((prev) => prev.filter((h) => h._id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete header:", err);
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
        updateProfile,
        deleteProfile,
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
        addServiceItem,
        updateServiceItem,
        removeServiceItem,
        testimonialsSections,
        fetchTestimonialsSections,
        addTestimonialsSection,
        updateTestimonialsSection,
        removeTestimonialsSection,
        addTestimonialItem,
        updateTestimonialItem,
        removeTestimonialItem,
        headers,
        fetchHeaders,
        addHeader,
        editHeader,
        deleteHeader,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
