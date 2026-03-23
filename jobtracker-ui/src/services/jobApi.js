import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5039/api/JobApplications";

const AUTH_BASE_URL = API_BASE_URL.replace("/JobApplications", "/Auth");

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      window.location.href = "/";
    }

    return Promise.reject(error);
  },
);

export const registerUser = async (payload) => {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, payload);
  return response.data;
};

export const getApplications = async (params = {}) => {
  const response = await api.get("", { params });
  return response.data;
};

export const getStats = async () => {
  const response = await api.get("/stats");
  return response.data;
};

export const createApplication = async (application) => {
  const response = await api.post("", application);
  return response.data;
};

export const updateApplication = async (id, application) => {
  const response = await api.put(`/${id}`, application);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const getUpcomingInterviews = async () => {
  const response = await api.get("/interviews/upcoming");
  return response.data;
};
