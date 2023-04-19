import axios from "axios";

export const axiosCustom = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});
