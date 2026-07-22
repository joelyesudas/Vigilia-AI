import axios from "axios";

const API = "http://localhost:5000/api/scans";

export const getLatestScan = async () => {
  const { data } = await axios.get(`${API}/latest`);
  return data;
};

export const getScanHistory = async () => {
  const { data } = await axios.get(`${API}/history`);
  return data;
};

export const runManualScan = async () => {
  const { data } = await axios.post(`${API}/manual`);
  return data;
};