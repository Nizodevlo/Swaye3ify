import { createInscription, deleteInscription, getAllInscriptions, updateInscription } from "@/apis/inscriptionApis";
import { IInscription, IInscriptionResponse, IInscriptionActions, IInscriptionState } from "@/types/inscriptionTypes";
import { IStore } from "@/types/globalType"; // Assuming this defines { <State>, <Actions> }
import { toast } from "sonner";
import { create } from "zustand";

const useInscriptionStore = create<IStore<IInscriptionState, IInscriptionActions>>((set) => ({
    inscriptions: [],
    loading: false,
    error: null, // Initialize error as null
    actions: {
        // Create Inscription
        addInscription: async (data: IInscription) => {
            try {
                set({ loading: true, error: null }); // Reset error on new action
                await createInscription(data);
                toast.success('Inscription created successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                // After successful creation, re-fetch all inscriptions to update the list
                // Or you can optimistically add the new inscription to the state if your API returns the full object
                set({ loading: false, error: null });
                useInscriptionStore.getState().actions.getAllInscriptions(); // Re-fetch all to ensure list is updated
            } catch (error: any) { // Use 'any' for error type if not strictly defined
                console.error("Error creating inscription:", error);
                set({ loading: false, error: error.message || "Failed to create inscription." });
                toast.error(`Failed to create inscription: ${error.message || "Unknown error"}`);
            };
        },

        // Update Inscription
        updateInscription: async (data: IInscription, inscriptionId: string) => {
            try {
                set({ loading: true, error: null });
                await updateInscription(data, inscriptionId);
                toast.success('Inscription updated successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ loading: false, error: null });
                useInscriptionStore.getState().actions.getAllInscriptions(); // Re-fetch all
            } catch (error: any) {
                console.error("Error updating inscription:", error);
                set({ loading: false, error: error.message || "Failed to update inscription." });
                toast.error(`Failed to update inscription: ${error.message || "Unknown error"}`);
            }
        },

        // Delete Inscription
        deleteInscription: async (inscriptionId: string) => {
            try {
                set({ loading: true, error: null });
                await deleteInscription(inscriptionId);
                toast.success('Inscription deleted successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                // Filter out the deleted inscription directly from the state for immediate UI update
                set((state) => ({
                    inscriptions: state.inscriptions.filter(
                        (inscription) => inscription._id !== inscriptionId
                    ),
                    loading: false,
                    error: null,
                }));
            } catch (error: any) {
                console.error("Error deleting inscription:", error);
                set({ loading: false, error: error.message || "Failed to delete inscription." });
                toast.error(`Failed to delete inscription: ${error.message || "Unknown error"}`);
            }
        },

        // Get All Inscriptions
        getAllInscriptions: async () => {
            try {
                set({ loading: true, error: null });
                const response = await getAllInscriptions(); // This returns response.data directly (e.g., { inscriptions: [...] })
                console.log("Fetched inscriptions:", response); // Log the full response to debug if needed
                
                // Assuming the API response structure is { inscriptions: [...] }
                if (response && Array.isArray(response.inscriptions)) {
                    set({ inscriptions: response.inscriptions as IInscriptionResponse[], loading: false, error: null });
                    toast.success('Inscriptions fetched successfully ✅', {
                        duration: 4000,
                        icon: "✅"
                    });
                } else {
                    console.warn("API response for getAllInscriptions did not contain an array 'inscriptions':", response);
                    set({ loading: false, error: "Invalid data format received for inscriptions." });
                    toast.error("Failed to load inscriptions: Invalid data received.");
                }
            } catch (error: any) {
                console.error("Error fetching inscriptions:", error);
                set({ loading: false, error: error.message || "Failed to fetch inscriptions." });
                toast.error(`Failed to fetch inscriptions: ${error.message || "Unknown error"}`);
            }
        }
    }
}));

// Custom hooks for consuming the store parts
export const useInscriptions = () => useInscriptionStore((state) => state.inscriptions);
export const useInscriptionLoading = () => useInscriptionStore((state) => state.loading);
export const useInscriptionError = () => useInscriptionStore((state) => state.error);
export const useInscriptionActions = () => useInscriptionStore((state) => state.actions);