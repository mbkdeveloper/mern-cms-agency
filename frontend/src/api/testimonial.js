 
 

export const TestimonialApi = {
  listTestimonialsSections: `/api/testimonials`,
  addTestimonialsSection: `/api/testimonials/add`,
  updateTestimonialsSection: (id) => `/api/testimonials/edit/${id}`,
  removeTestimonialsSection: (id) => `/api/testimonials/remove/${id}`,
  addTestimonialItem: (id) => `/api/testimonials/${id}/item/add/`,
  updateTestimonialItem: (id, itemId) => `/api/testimonials/${id}/item/edit/${itemId}`,
  removeTestimonialItem: (id, itemId) => `/api/testimonials/${id}/item/remove/${itemId}`,
};