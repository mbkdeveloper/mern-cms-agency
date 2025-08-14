import { useState } from "react";
import {HeaderApi } from "../api/header";
import axios from "axios";

const useHeaders = () => {
  const [headers, setHeaders] = useState([]);
    const fetchHeaders = async () => {
    try {
      const res = await axios.get(HeaderApi.listHeaders);
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

    const res = await axios.post(HeaderApi.addHeader, formData, {
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

      const res = await axios.put(HeaderApi.editHeader(id), formData, {
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
      await axios.delete(HeaderApi.removeHeader(id));
      setHeaders((prev) => prev.filter((h) => h._id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete header:", err);
      return false;
    }
  };
  return {
    headers,
    fetchHeaders,
    addHeader,
    editHeader,
    deleteHeader,
  };
};

export default useHeaders;
