import axios from "axios";
import { TestimonialApi } from "../api/testimonial";
import { useState } from "react";

const useTestimonials = () => {
  const [testimonialsSections, setTestimonialsSections] = useState([]);

  const fetchTestimonialsSections = async () => {
    try {
      const res = await axios.get(TestimonialApi.listTestimonialsSections);
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
      const res = await axios.post(
        TestimonialApi.addTestimonialsSection,
        newSection
      );
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
        TestimonialApi.updateTestimonialsSection(id),
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
      const res = await axios.delete(
        TestimonialApi.removeTestimonialsSection(id)
      );
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
      const res = await axios.post(
        TestimonialApi.addTestimonialItem(sectionId),
        newItem
      );
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
        TestimonialApi.updateTestimonialItem(sectionId, itemId),
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
        TestimonialApi.removeTestimonialItem(sectionId, itemId)
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
  return {
    testimonialsSections,
    fetchTestimonialsSections,
    addTestimonialsSection,
    updateTestimonialsSection,
    removeTestimonialsSection,
    addTestimonialItem,
    updateTestimonialItem,
    removeTestimonialItem,
  };
};

export default useTestimonials;
