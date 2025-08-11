export const API_BASE = "http://localhost:3002";

export const API = {
  login: `${API_BASE}/api/users/login`,
  register: `${API_BASE}/api/users/register`,
  getAllProfiles: `${API_BASE}/api/users/profiles`,
  updateProfile: `${API_BASE}/api/users/profile/me`,
  deleteProfile: `${API_BASE}/api/users/profile/me`,
  myProfile: `${API_BASE}/api/users/profile/me`,
  
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
};