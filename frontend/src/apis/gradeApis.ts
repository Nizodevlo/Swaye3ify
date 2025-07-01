import apiClient from "./apiClient"

export const getAllGrades = async () => {
    try {
        const response = await apiClient.get('/grades');
        console.log(response.data.data);
        return response.data.data
    } catch (error) {
        console.error("Error fetching grades :", error);
    };
};