 
 

export const GalerieApi = {
  listGalerie: `/api/galeries`,
  addGalerie: `/api/galeries/add`,
  editGalerie: (id) =>`/api/galeries/edit/${id}`,
  removeGalerie:  (id) =>`/api/galeries/remove/${id}`,

};