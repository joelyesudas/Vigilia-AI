import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getMonitoringOverview = async (token) => {
  const response = await API.get("/monitoring/overview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};