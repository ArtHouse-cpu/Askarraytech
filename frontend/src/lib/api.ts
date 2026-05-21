import axios from "axios";

const getBackendUrl = () => {
  const envVal = process.env.REACT_APP_BACKEND_URL || "";
  if (envVal.includes(",")) {
    const urls = envVal.split(",");
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    return isLocal ? urls[0] : (urls[1] || urls[0]);
  }
  return envVal;
};

const BACKEND_URL = getBackendUrl();
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const TOKEN_KEY = "aat_admin_token";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getApiErrorMessage(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}
