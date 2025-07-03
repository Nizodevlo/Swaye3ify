// src/stores/tutorStore.ts
import {
  createTutor,
  deleteTutor,
  getAllTutors,
  updateTutor,
} from "@/apis/tutorApis";
import {
  ITutor,
  ITutorResponse,
  ITutorState,
  ITutorActions,
} from "@/types/tutorTypes";
import { toast } from "sonner";
import { create } from "zustand";

const useTutorStore = create<
  ITutorState & {
    loading: boolean;
    error: string;
    actions: ITutorActions;
  }
>((set) => ({
  tutors: [],
  loading: false,
  error: "",
  actions: {
    addTutor: async (data: ITutor) => {
      try {
        set({ loading: true, error: "" });
        await createTutor(data);
        toast.success("Tutor created successfully ✅", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
        useTutorStore.getState().actions.getAllTutors();
      } catch (error: any) {
        set({
          loading: false,
          error: error.message || "Failed to create tutor",
        });
        toast.error(`Failed to create tutor ❌: ${error.message || ""}`, {
          duration: 4000,
          icon: "❌",
        });
      }
    },
    editTutor: async (data: ITutor, tutorId: string) => {
      try {
        set({ loading: true, error: "" });
        await updateTutor(data, tutorId);
        toast.success("Tutor updated successfully ✅", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
        useTutorStore.getState().actions.getAllTutors();
      } catch (error: any) {
        set({
          loading: false,
          error: error.message || "Failed to update tutor",
        });
        toast.error(`Failed to update tutor ❌: ${error.message || ""}`, {
          duration: 4000,
          icon: "❌",
        });
      }
    },
    removeTutor: async (tutorId: string) => {
      try {
        set({ loading: true, error: "" });
        await deleteTutor(tutorId);
        toast.success("Tutor deleted successfully ✅", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
        useTutorStore.getState().actions.getAllTutors();
      } catch (error: any) {
        set({
          loading: false,
          error: error.message || "Failed to delete tutor",
        });
        toast.error(`Failed to delete tutor ❌: ${error.message || ""}`, {
          duration: 4000,
          icon: "❌",
        });
      }
    },
    getAllTutors: async () => {
      try {
        set({ loading: true, error: "" });
        const data = await getAllTutors();
        if (data && data.data && data.data.tutors) {
          set({ tutors: data.data.tutors, loading: false, error: "" });
          toast.success("Tutors fetched successfully ✅", {
            duration: 4000,
            icon: "✅",
          });
        } else {
          set({ tutors: [], loading: false, error: "Unexpected data format" });
          toast.error("Failed to fetch tutors: Unexpected data format ❌", {
            duration: 4000,
            icon: "❌",
          });
        }
      } catch (error: any) {
        set({
          loading: false,
          error: error.message || "Failed to fetch tutors",
        });
        toast.error(`Failed to fetch tutors ❌: ${error.message || ""}`, {
          duration: 4000,
          icon: "❌",
        });
      }
    },
  },
}));

export const useTutors = () => useTutorStore((state) => state.tutors);
export const useTutorActions = () => useTutorStore((state) => state.actions);
export const useTutorLoading = () => useTutorStore((state) => state.loading);
export const useTutorError = () => useTutorStore((state) => state.error);
