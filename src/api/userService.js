// src/api/userService.js

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all users
 */
export const getUsers = async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
};

/**
 * Fetch single user
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
};

/**
 * Create user
 */
export const createUser = async (user) => {
  try {
    const response = await api.post("/", user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user.");
  }
};

/**
 * Update user
 */
export const updateUser = async (id, user) => {
  try {
    const response = await api.put(`/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user.");
  }
};

/**
 * Delete user
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete user.");
  }
};