import { useState } from "react";
import { GalerieApi } from "../api/galerie";
import axios from "axios";

const useGalerie = () => {
  const [token, ] = useState(localStorage.getItem("token") || "");
  const [galerie, setGalerie] = useState([]);
  const fetchGalerie = async () => {
    try {
      const res = await axios.get(GalerieApi.listGalerie);
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

      const { data } = await axios.post(GalerieApi.addGalerie, formData, config);
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

      const { data } = await axios.put(GalerieApi.editGalerie(id), formData, config);
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
      await axios.delete(GalerieApi.removeGalerie(id), config);
      setGalerie((prev) => prev.filter((g) => g._id !== id));
      return true;
    } catch (err) {
      console.error("Error deleting galerie:", err.response || err);
      return false;
    }
  };
  return {
    galerie,
    fetchGalerie,
    addGalerie,
    editGalerie,
    deleteGalerie,
  };
};

export default useGalerie;
