import { ISalle } from "@/types/salleTypes";
import apiClient from "./apiClient";

export const createSalle = async (data: ISalle) => {
  try {
    const res = await apiClient.post("/salles", data);
    return res.data.data;
  } catch (err) {
    console.error("Error creating salle: ", err);
    return err;
  }
};

export const updateSalle = async (data: ISalle, salleId: string) => {
  try {
    const res = await apiClient.put(`/salles/${salleId}`, data);
    return res.data.data;
  } catch (err) {
    console.error("Error updating Salle: ", err);
    return err;
  }
};

export const deleteSalle = async (salleId: string) => {
  try {
    const res = await apiClient.delete(`/salles/${salleId}`);
    return res.data.data;
  } catch (err) {
    console.error("Error deleting Salle: ", err);
    return err;
  }
};

export const getAllSalles = async () => {
  try {
    const res = await apiClient.get("/salles");
    return res.data;
  } catch (err) {
    console.error("Error fetching salles: ");
    return err;
  }
};
