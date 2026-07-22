import axios from "axios";

const API = axios.create({
  baseURL: "/api/copilot",
});

export const askCopilot = async (message) => {
  const response = await API.post("/chat", {
    message,
  });

  return response.data;
};