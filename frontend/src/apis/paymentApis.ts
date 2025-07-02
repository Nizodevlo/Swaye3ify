import { IPaiment } from './../types/paymentTypes';
import apiClient from "./apiClient";

export const createPaiment = async (data: IPaiment) => {
    try {
        const response = await apiClient('/paiments', data);
        return response.data.data;
    } catch (error) {
        console.error("Error creating paiment: ", error)
    }
}

export const updatePaiment = async (data: IPaiment, paiementId: string) => {
    try {
        const response = await apiClient.put(`/paiments/${paiementId}`, data);
        // The controller returns new ApiResponse(200, { updatedPaiment }, '...')
        return response.data.data.updatedPaiment;
    } catch (error) {
        console.error("Error updating paiement: ", error);
        throw error;
    } // Removed semicolon
};

export const deletePaiment = async (paiementId: string) => {
    try {
        const response = await apiClient.delete(`/paiments/${paiementId}`);
        // The controller returns new ApiResponse(200, {}, '...')
        return response.data.data; // This will be an empty object {} upon successful deletion
    } catch (error) {
        console.error("Error deleting paiement: ", error);
        throw error;
    } // Removed semicolon
};

export const getAllPaiments = async () => {
    try {
        const response = await apiClient.get(`/paiments`);
        // The controller returns new ApiResponse(200, paiments, '...') where 'paiments' is an array directly
        // So, response.data will be { statusCode, data: [...], message, success }
        return response.data; // This will directly return the { statusCode, data: [], message, success } object
    } catch (error) {
        console.error("Error fetching paiments: ", error);
        throw error;
    } // Removed semicolon
};