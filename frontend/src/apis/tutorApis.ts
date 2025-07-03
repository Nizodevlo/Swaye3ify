// src/apis/tutorApis.ts
import { ITutor } from "@/types/tutorTypes";
import apiClient from "./apiClient";

export const createTutor = async (data: ITutor) => {
  try {
    const response = await apiClient.post("/tutors", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating tutor: ", error);
    throw error;
  }
};

export const updateTutor = async (data: ITutor, tutorId: string) => {
  try {
    const response = await apiClient.put(`/tutors/${tutorId}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating tutor: ", error);
    throw error;
  }
};

export const deleteTutor = async (tutorId: string) => {
  try {
    const response = await apiClient.delete(`/tutors/${tutorId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting tutor: ", error);
    throw error;
  }
};

export const getAllTutors = async () => {
  try {
    const response = await apiClient.get(`/tutors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tutors: ", error);
    throw error;
  }
};
