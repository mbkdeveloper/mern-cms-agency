 
 
export const API_BASE = "http://localhost:3002";

export const TestimonialApi = {
  listTestimonialsSections: `${API_BASE}/api/testimonials`,
  addTestimonialsSection: `${API_BASE}/api/testimonials/add`,
  updateTestimonialsSection: (id) => `${API_BASE}/api/testimonials/edit/${id}`,
  removeTestimonialsSection: (id) => `${API_BASE}/api/testimonials/remove/${id}`,
  addTestimonialItem: (id) => `${API_BASE}/api/testimonials/${id}/item/add/`,
  updateTestimonialItem: (id, itemId) => `${API_BASE}/api/testimonials/${id}/item/edit/${itemId}`,
  removeTestimonialItem: (id, itemId) => `${API_BASE}/api/testimonials/${id}/item/remove/${itemId}`,
};