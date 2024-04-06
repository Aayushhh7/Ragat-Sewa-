import { axiosInstance } from ".";

export const sendBloodDonationRequest = async (requestData) => {
  return axiosInstance(
    "post",
    "/api/emailBoardcasting/send-email",
    requestData
  );
};

export const getBloodDonationRequest = async () => {
  return axiosInstance(
    "get",
    "/api/emailBoardcasting/blood-donation-requests",
    requestData
  );
};
