 
 

export const ServiceApi = {
  listServiceSections: `/api/services`,
  addServiceSection: `/api/services/add`,
  updateServiceSection: (id) =>`/api/services/edit/${id}`,
  removeServiceSection: (id) =>`/api/services/remove/${id}`,
  addServiceItem: (id) =>`/api/services/${id}/item/add/`,
  listServiceItem: (id) =>`/api/services/${id}/items`,
  updateServiceItem: (id, itemId) =>`/api/services/${id}/item/edit/${itemId}`,
  removeServiceItem: (id, itemId) =>`/api/services/${id}/item/remove/${itemId}`,
};