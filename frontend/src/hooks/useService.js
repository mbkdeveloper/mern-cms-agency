import axios from "axios";
import { useState } from "react";
import { ServiceApi } from "../api/service";

// helper to normalize sections
const normalizeSections = (sections) =>
  (sections || []).map((sec) => ({
    ...sec,
    services: sec.services || [], // always array
  }));

const useServices = () => {
  const [servicesSections, setServicesSections] = useState([]);

  // Fetch all service sections
  const fetchServiceSections = async () => {
    try {
      const res = await axios.get(ServiceApi.listServiceSections);
      if (res.data.success) {
        setServicesSections(normalizeSections(res.data.data));
      } else {
        setServicesSections([]);
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
        setServicesSections((prev) => [
          ...prev,
          { ...res.data.data, services: res.data.data.services || [] },
        ]);
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
          prev.map((sec) =>
            sec._id === id
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
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
      const res = await axios.post(ServiceApi.addServiceItem(sectionId), newItem);
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) =>
            sec._id === sectionId
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
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
          prev.map((sec) =>
            sec._id === sectionId
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
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
          prev.map((sec) =>
            sec._id === sectionId
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error removing service item:", err);
      return false;
    }
  };

  // ----------------- Service Details CRUD -----------------
  const getServiceDetails = async (sectionId, itemId) => {
    try {
      const res = await axios.get(ServiceApi.getServiceDetails(sectionId, itemId));
      if (res.data.success) return res.data.data;
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const addServiceItemDetails = async (sectionId, itemId, details) => {
    try {
      const res = await axios.post(
        ServiceApi.addServiceDetails(sectionId, itemId),
        details
      );
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) =>
            sec._id === sectionId
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const updateServiceItemDetails = async (sectionId, itemId, details) => {
    try {
      const res = await axios.put(
        ServiceApi.updateServiceDetails(sectionId, itemId),
        details
      );
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) =>
            sec._id === sectionId
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const removeServiceItemDetails = async (sectionId, itemId) => {
    try {
      const res = await axios.delete(
        ServiceApi.removeServiceDetails(sectionId, itemId)
      );
      if (res.data.success) {
        setServicesSections((prev) =>
          prev.map((sec) =>
            sec._id === sectionId
              ? { ...res.data.data, services: res.data.data.services || [] }
              : sec
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
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
    getServiceDetails,
    addServiceItemDetails,
    updateServiceItemDetails,
    removeServiceItemDetails,
  };
};

export default useServices;
