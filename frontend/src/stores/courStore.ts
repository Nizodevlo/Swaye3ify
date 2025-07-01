import { createCour, deleteCour, getAllCours, updateCour } from "@/apis/courApis";
import { ICour, ICourActions, ICourState } from "@/types/courTypes";
import { IStore } from "@/types/globalType";
import { toast } from "sonner";
import { create } from "zustand";

const useCourStore = create<IStore<ICourState, ICourActions>>((set) => ({
    cours: [],
    loading: false,
    error: '',
    actions: {
        // Create cour 
        addCour: async (data: ICour) => {
            try {
                set({ loading: true, error: ""});
                await createCour(data);
                toast.success('Cour create successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ loading: false, error: ""});
            } catch (error) {
                set({ loading: false, error: error.message || null});
            };
        },
        updateCour: async (data: ICour, courId: string) => {
            try {
                set({ loading: true, error: ""});
                await updateCour(data, courId);
                toast.success('Cour updated successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ loading: false, error: ""});
            } catch (error) {
                set({ loading: false, error: error.message || null});
            }
        },
        deleteCour: async (courId: string) => {
            try {
                set({ loading: true, error: ""});
                await deleteCour(courId);
                toast.success('Cour deleted successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ loading: false, error: ""});
            } catch (error) {
                set({ loading: false, error: error.message || null});
            }
        },
        getAllCours: async () => {
            try {
                set({ loading: true, error: ""});
                const data = await getAllCours();
                console.log(data)
                toast.success('Cours fetched successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ cours: data.data.cours, loading: false, error: ""});
            } catch (error) {
                set({ loading: false, error: error.message || null});
            }
        }
    }
}));

export const useCours = () => useCourStore((state) => state.cours);
export const useCourActions = () => useCourStore((state) => state.actions);