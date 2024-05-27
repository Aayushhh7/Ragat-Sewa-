import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
  const response = await axiosInstance("post", "/api/users/login", payload);
  return response;
};

export const RegisterUser = async (payload) => {
  const response = await axiosInstance("post", "/api/users/register", payload);
  return response;
};

export const GetCurrentUser = async () => {
  const response = await axiosInstance("get", "/api/users/get-current-user");
  return response;
};

export const GetAllDonorsofOrganization = () => {
  return axiosInstance("get", "/api/users/get-all-donors");
};

export const GetAllHospitalsOfOrganization = () => {
  return axiosInstance("get", "/api/users/get-all-hospitals");
};

export const GetAllOrganizationofDonor = () => {
  return axiosInstance("get", "/api/users/get-all-organizations-of-a-donor");
};

export const GetAllOrganizationofHospital = () => {
  return axiosInstance("get", "/api/users/get-all-organizations-of-a-hospital");
};

export const UpdateUser = async (payload) => {
  const response = await axiosInstance("put", "/api/users/update-profile", payload);
  return response;
};

export const ChangePassword = async (payload) => {
  const response = await axiosInstance("put", "/api/users/change-password", payload);
  return response;
};