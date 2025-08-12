export const API_BASE = "http://localhost:3002";

export const API = {
  login: `${API_BASE}/api/users/login`,
  register: `${API_BASE}/api/users/register`,
  myProfile: `${API_BASE}/api/users/profile/me`,
  updateProfile: `${API_BASE}/api/users/profile/me`,
  deleteProfile: `${API_BASE}/api/users/profile/me`,

    // Header
  listHeaders: `${API_BASE}/api/headers`,
  addHeader: `${API_BASE}/api/headers/add`,
  editHeader: (id) => `${API_BASE}/api/headers/edit/${id}`,
  removeHeader: (id) => `${API_BASE}/api/headers/remove/${id}`,
  
  // Galerie
  listGalerie: `${API_BASE}/api/galeries`,
  addGalerie: `${API_BASE}/api/galeries/add`,
  editGalerie: (id) =>`${API_BASE}/api/galeries/edit/${id}`,
  removeGalerie:  (id) =>`${API_BASE}/api/galeries/remove/${id}`,

  // Services
  listServiceSections: `${API_BASE}/api/services`,
  addServiceSection: `${API_BASE}/api/services/add`,
  updateServiceSection: (id) =>`${API_BASE}/api/services/edit/${id}`,
  removeServiceSection: (id) =>`${API_BASE}/api/services/remove/${id}`,
  addServiceItem: (id) =>`${API_BASE}/api/services/${id}/item/add/`,
  listServiceItem: (id) =>`${API_BASE}/api/services/${id}/items`,
  updateServiceItem: (id, itemId) =>`${API_BASE}/api/services/${id}/item/edit/${itemId}`,
  removeServiceItem: (id, itemId) =>`${API_BASE}/api/services/${id}/item/remove/${itemId}`,

  // Testimonials
  listTestimonialsSections: `${API_BASE}/api/testimonials`,
  addTestimonialsSection: `${API_BASE}/api/testimonials/add`,
  updateTestimonialsSection: (id) => `${API_BASE}/api/testimonials/edit/${id}`,
  removeTestimonialsSection: (id) => `${API_BASE}/api/testimonials/remove/${id}`,
  addTestimonialItem: (id) => `${API_BASE}/api/testimonials/${id}/item/add/`,
  updateTestimonialItem: (id, itemId) => `${API_BASE}/api/testimonials/${id}/item/edit/${itemId}`,
  removeTestimonialItem: (id, itemId) => `${API_BASE}/api/testimonials/${id}/item/remove/${itemId}`,
};