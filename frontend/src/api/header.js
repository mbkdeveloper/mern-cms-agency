 
 
export const API_BASE = "http://localhost:3002";

export const HeaderApi = {
  listHeaders: `${API_BASE}/api/headers`,
  addHeader: `${API_BASE}/api/headers/add`,
  editHeader: (id) => `${API_BASE}/api/headers/edit/${id}`,
  removeHeader: (id) => `${API_BASE}/api/headers/remove/${id}`,

};