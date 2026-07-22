import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/copilot",
});

export const askCopilot = async (message) => {
  const response = await API.post("/chat", {
    message,
  });

  return response.data;
};