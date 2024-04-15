import { axiosInstance } from ".";

export const AddInventory = (data) => {
  return axiosInstance("post", "/api/inventory/add", data);
};

export const GetInventory = () => {
  return axiosInstance("get", "/api/inventory/get");
};

export const GetInventorywithFilters = (filters, limit) => {
  return axiosInstance("post", "/api/inventory/filter", { filters, limit });
};

export const DeleteInventory = (id) => {
  return axiosInstance("delete", `/api/inventory/delete/${id}`);
};

export const UpdateInventory = (id, data) => {
  return axiosInstance("put", `/api/inventory/update/${id}`, data);
};
