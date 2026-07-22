import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth",
});

console.log("API Base URL:", API.defaults.baseURL);

// Register
export const registerUser = async (userData) => {
  return (await API.post("/register", userData)).data;
};

// Login
export const loginUser = async (userData) => {
  console.log("Sending login request...", userData);

  const response = await API.post("/login", userData);

  console.log("Login response:", response);

  return response.data;
};

// Get Profile
export const getProfile = async (token) => {
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};