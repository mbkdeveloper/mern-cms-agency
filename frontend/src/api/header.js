 
 

export const HeaderApi = {
  listHeaders: `/api/headers`,
  addHeader: `/api/headers/add`,
  editHeader: (id) => `/api/headers/edit/${id}`,
  removeHeader: (id) => `/api/headers/remove/${id}`,

};