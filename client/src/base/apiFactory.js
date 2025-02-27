import apiClient from "./apiClient";

function apiFactory(baseURL) {
  return {
    create: (data, params) => {
      return apiClient.post(baseURL, data, { params });
    },
    getAll: (params) => {
      return apiClient.get(baseURL, { params });
    },
    getOne: (id, params) => {
      return apiClient.get(`${baseURL}/${id}`, { params });
    },
    update: (id, data, params) => {
      return apiClient.put(`${baseURL}/${id}`, data, { params });
    },
    delete: (id, params) => {
      return apiClient.delete(`${baseURL}/${id}`, { params });
    },
  };
}

export default apiFactory;
