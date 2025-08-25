export const ServiceApi = {
  // Service Sections
  listServiceSections: `/api/services`,
  addServiceSection: `/api/services/add`,
  updateServiceSection: (id) => `/api/services/edit/${id}`,
  removeServiceSection: (id) => `/api/services/remove/${id}`,

  // Service Items
  addServiceItem: (id) => `/api/services/${id}/item/add/`,
  listServiceItem: (id) => `/api/services/${id}/items`,
  updateServiceItem: (id, itemId) => `/api/services/${id}/item/edit/${itemId}`,
  removeServiceItem: (id, itemId) => `/api/services/${id}/item/remove/${itemId}`,

  // Service Details
  getServiceDetails: (sectionId, itemId) => `/api/services/${sectionId}/item/${itemId}/details`,
  addServiceDetails: (sectionId, itemId) => `/api/services/${sectionId}/item/${itemId}/details/add`,
  updateServiceDetails: (sectionId, itemId) => `/api/services/${sectionId}/item/${itemId}/details/edit`,
  removeServiceDetails: (sectionId, itemId) => `/api/services/${sectionId}/item/${itemId}/details/remove`,
};
