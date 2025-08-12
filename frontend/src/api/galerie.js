 
 
export const API_BASE = "http://localhost:3002";

export const GalerieApi = {
  listGalerie: `${API_BASE}/api/galeries`,
  addGalerie: `${API_BASE}/api/galeries/add`,
  editGalerie: (id) =>`${API_BASE}/api/galeries/edit/${id}`,
  removeGalerie:  (id) =>`${API_BASE}/api/galeries/remove/${id}`,

};