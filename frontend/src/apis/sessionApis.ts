import { ISession } from "@/types/sessionTypes";
import apiClient from "./apiClient";

export const createSession = async (data: ISession) => {
  try {
    const res = await apiClient.post("/sessions", data);
    return res.data.data;
  } catch (err) {
    console.error("Error creating session: ", err);
    return err;
  }
};

export const updateSession = async (data: ISession, sessionId: string) => {
  try {
    const res = await apiClient.put(`/sessions/${sessionId}`, data);
    return res.data.data;
  } catch (err) {
    console.error("Error updating Session: ", err);
    return err;
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    const res = await apiClient.delete(`/sessions/${sessionId}`);
    return res.data.data;
  } catch (err) {
    console.error("Error deleting Session: ", err);
    return err;
  }
};

export const getAllSession = async () => {
  try {
    const res = await apiClient.get("/sessions");
    return res.data;
  } catch (err) {
    console.error("Error fetching sessions: ");
    return err;
  }
};
