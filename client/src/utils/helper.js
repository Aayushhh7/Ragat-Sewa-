export const getLoggedInUserName = (user) => {
  if (user.userType === "donor") {
    return user.name;
  } else if (user.userType === "organization") {
    return user.organizationName;
  } else if (user.userType === "hospital") {
    return user.hospitalName;
  }
};
