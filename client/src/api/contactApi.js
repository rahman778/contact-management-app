import apiClient from "../base/apiClient";
import apiFactory from "../base/apiFactory";

const URL = "contacts";

const api = apiFactory(URL);

export const {
  getOne: getContactById,
  getAll: getContacts,
  create: createContact,
  update: updateContact,
  delete: deleteContact,
} = api;

export const searchContacts = (query, sortField) => {
  return apiClient.get(`/${URL}/search`, {
    params: {
      query,
      sortField
    },
  });
};
