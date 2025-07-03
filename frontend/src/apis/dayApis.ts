import apiClient from "./apiClient";

export const getAllDays = async () => {
  try {
    const response = await apiClient.get("/days");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching grades :", error);
  }
};
