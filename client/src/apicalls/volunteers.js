import { axiosInstance } from ".";

// Function to create a new volunteer registration
export const createVolunteerRegistration = (data) => {
  return axiosInstance("post", "/api/volunteers/register-volunteers", data);
};

export const GetAllEventVolunteers = () => {
  return axiosInstance("get", "/api/volunteers/eventVolunteers");
};
