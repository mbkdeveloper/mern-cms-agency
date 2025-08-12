 
 
export const API_BASE = "http://localhost:3002";

export const ServiceApi = {
  listServiceSections: `${API_BASE}/api/services`,
  addServiceSection: `${API_BASE}/api/services/add`,
  updateServiceSection: (id) =>`${API_BASE}/api/services/edit/${id}`,
  removeServiceSection: (id) =>`${API_BASE}/api/services/remove/${id}`,
  addServiceItem: (id) =>`${API_BASE}/api/services/${id}/item/add/`,
  listServiceItem: (id) =>`${API_BASE}/api/services/${id}/items`,
  updateServiceItem: (id, itemId) =>`${API_BASE}/api/services/${id}/item/edit/${itemId}`,
  removeServiceItem: (id, itemId) =>`${API_BASE}/api/services/${id}/item/remove/${itemId}`,
};