import { IStudent } from "@/types/studentTypes"; // Assuming you have a studentTypes.ts for interface
import apiClient from "./apiClient";

export const createStudent = async (data: IStudent) => {
  try {
    const response = await apiClient.post('/students', data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating student: ", error);
    throw error; // Re-throwing the error for better error handling in components
  }
};

export const updateStudent = async (data: IStudent, studentId: string) => {
  try {
    const response = await apiClient.put(`/students/${studentId}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating student: ", error);
    throw error; // Re-throwing the error for better error handling in components
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    const response = await apiClient.delete(`/students/${studentId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error deleting student: ", error);
    throw error; // Re-throwing the error for better error handling in components
  }
};

export const getAllStudents = async () => {
  try {
    const response = await apiClient.get(`/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students: ", error);
    throw error; // Re-throwing the error for better error handling in components
  }
};