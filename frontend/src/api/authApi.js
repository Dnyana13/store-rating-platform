import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// LOGIN
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// SIGNUP
export const signupUser = async (data) => {
  const res = await API.post("/auth/signup", data);
  return res.data;
};