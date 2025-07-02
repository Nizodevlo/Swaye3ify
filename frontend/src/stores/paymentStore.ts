
import { createPaiment, deletePaiment, getAllPaiments, updatePaiment } from '@/apis/paymentApis';
import { IPaiment, IPaimentResponse, IPaiementActions, IPaiementState } from "@/types/paymentTypes"; // Ensure this path and type names are correct
import { IStore } from "@/types/globalType"; // Assuming this defines { <State>, <Actions> }
import { toast } from "sonner";
import { create } from "zustand";

const usePaimentStore = create<IStore<IPaiementState, IPaiementActions>>((set) => ({
    paiements: [],
    loading: false,
    error: null, // Initialize error as null
    actions: {
        // Create Paiment
        addPaiement: async (data: IPaiment) => {
            try {
                set({ loading: true, error: null }); // Reset error on new action
                await createPaiment(data);
                toast.success('Paiement created successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ loading: false, error: null });
                usePaimentStore.getState().actions.getAllPaiements(); // Re-fetch all to ensure list is updated
            } catch (error: any) { // Use 'any' for error type if not strictly defined
                console.error("Error creating paiement:", error);
                set({ loading: false, error: error.message || "Failed to create paiement." });
                toast.error(`Failed to create paiement: ${error.message || "Unknown error"}`);
            };
        },

        // Update Paiment
        updatePaiement: async (data: IPaiment, paiementId: string) => {
            try {
                set({ loading: true, error: null });
                await updatePaiment(data, paiementId);
                toast.success('Paiement updated successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                set({ loading: false, error: null });
                usePaimentStore.getState().actions.getAllPaiements(); // Re-fetch all
            } catch (error: any) {
                console.error("Error updating paiement:", error);
                set({ loading: false, error: error.message || "Failed to update paiement." });
                toast.error(`Failed to update paiement: ${error.message || "Unknown error"}`);
            }
        },

        // Delete Paiment
        deletePaiement: async (paiementId: string) => {
            try {
                set({ loading: true, error: null });
                await deletePaiment(paiementId);
                toast.success('Paiement deleted successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                // Filter out the deleted paiement directly from the state for immediate UI update
                set((state) => ({
                    paiements: state.paiements.filter(
                        (paiement) => paiement._id !== paiementId
                    ),
                    loading: false,
                    error: null,
                }));
            } catch (error: any) {
                console.error("Error deleting paiement:", error);
                set({ loading: false, error: error.message || "Failed to delete paiement." });
                toast.error(`Failed to delete paiement: ${error.message || "Unknown error"}`);
            }
        },

        // Get All Paiments
        getAllPaiements: async () => {
            try {
                set({ loading: true, error: null });
                const response = await getAllPaiments(); // This returns the ApiResponse object: { statusCode, data: [...], message, success }
                console.log("Fetched paiments:", response); // Log the full response to debug if needed
                
                // Assuming the API response structure is { statusCode, data: [...], message, success }
                if (response && Array.isArray(response.data)) {
                    set({ paiements: response.data as IPaimentResponse[], loading: false, error: null });
                    toast.success('Paiments fetched successfully ✅', {
                        duration: 4000,
                        icon: "✅"
                    });
                } else {
                    console.warn("API response for getAllPaiments did not contain an array in 'data':", response);
                    set({ loading: false, error: "Invalid data format received for paiments." });
                    toast.error("Failed to load paiments: Invalid data received.");
                }
            } catch (error: any) {
                console.error("Error fetching paiments:", error);
                set({ loading: false, error: error.message || "Failed to fetch paiments." });
                toast.error(`Failed to fetch paiments: ${error.message || "Unknown error"}`);
            }
        }
    }
}));

// Custom hooks for consuming the store parts
export const usePaiements = () => usePaimentStore((state) => state.paiements);
export const usePaiementLoading = () => usePaimentStore((state) => state.loading);
export const usePaiementError = () => usePaimentStore((state) => state.error);
export const usePaiementActions = () => usePaimentStore((state) => state.actions);