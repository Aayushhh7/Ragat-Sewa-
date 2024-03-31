import { axiosInstance } from ".";

export const PostEvent = (data) => {
  return axiosInstance("post", "/api/events/post-event", data); // Use post method and pass data
};

export const GetEvent = () => {
  return axiosInstance("get", "/api/events/get-event");
};
