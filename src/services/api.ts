// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://skills-api-zeta.vercel.app/", // Replace with your API's base URL
  timeout: 10000, // Optional: sets a request timeout
});

export const fetchData = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response.data;
};

export default api;
