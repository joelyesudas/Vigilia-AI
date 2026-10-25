import axios from "axios";

const API = axios.create({
  baseURL: "/api/copilot",
});

// Existing Gemini Copilot chat
export const askCopilot = async (message) => {
  const response = await API.post("/chat", {
    message,
  });

  return response.data;
};

// New AI Agent investigation
export const investigateIncident = async () => {
  const response = await API.post("/investigate", {});

  return response.data;
};
