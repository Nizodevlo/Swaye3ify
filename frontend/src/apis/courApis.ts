import { ICour } from "@/types/courTypes";
import apiClient from "./apiClient";

export const createCour = async (data: ICour) => {
  try {
    const response = await apiClient.post("/cours", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating cour: ", error);
    return error;
  }
};

export const updateCour = async (data: ICour, courId: string) => {
  try {
    const response = await apiClient.put(`/cours/${courId}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating cour: ", error);
    return error;
  }
};

export const deleteCour = async (courId: string) => {
  try {
    const response = await apiClient.delete(`/cours/${courId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting cour: ", error);
    return error;
  }
};

export const getAllCours = async () => {
  try {
    const response = await apiClient.get(`/cours`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cours: ", error);
    return error;
  }
};
