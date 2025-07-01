import apiClient from "./apiClient"

export const getAllSubjects = async () => {
    try {
        const response = await apiClient.get('/subjects');
        console.log(response.data.data);
        return response.data.data
    } catch (error) {
        console.error("Error fetching subjects :", error);
    };
};