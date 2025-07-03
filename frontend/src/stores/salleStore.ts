import {
  createSalle,
  deleteSalle,
  getAllSalles,
  updateSalle,
} from "@/apis/salleApis";
import { IStore } from "@/types/globalType";
import { ISalle, ISalleAction, ISalleState } from "@/types/salleTypes";
import { toast } from "sonner";
import { create } from "zustand";

const useSalleStore = create<IStore<ISalleState, ISalleAction>>((set) => ({
  salles: [],
  loading: false,
  error: "",
  actions: {
    addSalle: async (data: ISalle) => {
      try {
        set({ loading: true, error: "" });
        await createSalle(data);
        toast.success("Salle created successfully", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
      } catch (err) {
        set({ loading: false, error: err.message || null });
      }
    },
    updateSalle: async (data: ISalle, salleId: string) => {
      try {
        set({ loading: true, error: "" });
        await updateSalle(data, salleId);
        toast.success("Salle updated successfully", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
      } catch (err) {
        set({ loading: false, error: err.message || null });
      }
    },
    deleteSalle: async (salleId: string) => {
      try {
        set({ loading: true, error: "" });
        await deleteSalle(salleId);
        toast.success("Salle deleted successfully", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
      } catch (err) {
        set({ loading: false, error: err.message || null });
      }
    },
    getAllSalle: async () => {
      try {
        set({ loading: true, error: "" });
        await getAllSalles();
        toast.success("Salle fetched successfully", {
          duration: 4000,
          icon: "✅",
        });
        set({ loading: false, error: "" });
      } catch (err) {
        set({ loading: false, error: err.message || null });
      }
    },
  },
}));

export const useSalles = () => useSalleStore((state) => state.salles);
export const useSallesActions = () => useSalleStore((state) => state.actions);
