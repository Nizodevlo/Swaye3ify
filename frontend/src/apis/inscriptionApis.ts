import { IInscription } from "@/types/inscriptionTypes"; // You'll need to define IInscription
import apiClient from "./apiClient";

export const createInscription = async (data: IInscription) => {
    try {
        const response = await apiClient.post('/inscriptions', data);
        return response.data.data;
    } catch (error) {
        console.error("Error creating inscription: ", error);
        throw error; // Re-throwing the error to be handled by the caller (e.g., in useStudentActions)
    };
};

export const updateInscription = async (data: IInscription, inscriptionId: string) => {
    try {
        const response = await apiClient.put(`/inscriptions/${inscriptionId}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating inscription: ", error);
        throw error;
    };
};

export const deleteInscription = async (inscriptionId: string) => {
    try {
        const response = await apiClient.delete(`/inscriptions/${inscriptionId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error deleting inscription: ", error);
        throw error;
    };
};

export const getAllInscriptions = async () => {
    try {
        const response = await apiClient.get(`/inscriptions`);
        return response.data; // The controller returns { inscriptions: [...] }
    } catch (error) {
        console.error("Error fetching inscriptions: ", error);
        throw error;
    };
};