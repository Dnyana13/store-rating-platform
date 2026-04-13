import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET STORES
export const getStores = async (token) => {
  const res = await API.get("/admin/stores", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DELETE STORE
export const deleteStore = async (id, token) => {
  const res = await API.delete(`/admin/stores/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//GET USERS
export const getUsers = async (token) => {
  const res = await API.get("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DELETE USER
export const deleteUser = async (id, token) => {
  const res = await API.delete(`/admin/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// DASHBOARD STATS
export const getStats = async (token) => {
  const res = await API.get("/admin/stats", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};