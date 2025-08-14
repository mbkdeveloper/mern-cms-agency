import axios from "axios";
import { useState } from "react";
import { ServiceApi } from "../api/service";

const useServices = () => {
  const [servicesSections, setServicesSections] = useState([]);
  // Fetch all service sections
  const fetchServiceSections = async () => {
    try {
      const res = await axios.get(ServiceApi.listServiceSections);
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
      const res = await axios.post(ServiceApi.addServiceSection, newSection);
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
      const res = await axios.put(
        ServiceApi.updateServiceSection(id),
        updatedSection
      );
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
      const res = await axios.delete(ServiceApi.removeServiceSection(id));
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
      const res = await axios.post(
        ServiceApi.addServiceItem(sectionId),
        newItem
      );
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
        ServiceApi.updateServiceItem(sectionId, itemId),
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
      const res = await axios.delete(
        ServiceApi.removeServiceItem(sectionId, itemId)
      );
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
  return {
    servicesSections,
    fetchServiceSections,
    addServiceSection,
    updateServiceSection,
    removeServiceSection,
    addServiceItem,
    updateServiceItem,
    removeServiceItem,
  };
};

export default useServices;
