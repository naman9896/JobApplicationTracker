import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5039/api/JobApplications"; // update this port if needed

const api = axios.create({
  baseURL: API_BASE_URL,
});

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
