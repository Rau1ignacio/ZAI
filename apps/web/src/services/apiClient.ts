import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.zai.local",
  timeout: 10_000,
});
