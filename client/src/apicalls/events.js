import { axiosInstance } from ".";

export const PostEvent = (data) => {
  return axiosInstance("post", "/api/events/post-event", data);
};

export const GetEvent = () => {
  return axiosInstance("get", "/api/events/get-event");
};

export const GetEventsByOrganization = async (organizationId) => {
  try {
    const response = await axiosInstance(
      "get",
      `/api/events/get-events-by-organization?userId=${organizationId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};


