import API from "./api";

export const getStores = (params) =>
  API.get("/user/stores", { params });

export const rateStore = (data) =>
  API.post("/user/rate", data);