import API from "./api";

export const getOwnerDashboard = () =>
  API.get("/owner/dashboard");