import axios from "axios";
import { apiBaseUrl } from "./constants";

const baseUrl = apiBaseUrl ?? "http://localhost:8000/api/";

const publicAgent = axios.create({
  baseURL: baseUrl,
});

export const getPolicies = async (page = 1, pageSize = 10, q = "") => {
  return await publicAgent.get(
    `policies/?page=${page}&page_size=${pageSize}&q=${q}`
  );
};

export const getPolicy = async (id) => {
  return await publicAgent.get(`policies/${id}/`);
};

export const updatePolicy = async (id, policy) => {
  return await publicAgent.put(`policies/${id}/`, policy);
};

export const getPoliciesStat = async (region = "") => {
  return await publicAgent.get(`policies/stat/?region=${region}`);
};
