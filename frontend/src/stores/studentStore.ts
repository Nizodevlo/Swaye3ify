import { createStudent, deleteStudent, getAllStudents, updateStudent } from "@/apis/studentApis"; // Corrected import path
import { IStudent, IStudentResponse, IStudentState, IStudentActions } from "@/types/studentTypes"; // Corrected import path
import { IStore } from "@/types/globalType"; // Assuming globalType.ts exists
import { toast } from "sonner";
import { create } from "zustand";

const useStudentStore = create<IStore<IStudentState, IStudentActions>>((set) => ({
    students: [],
    loading: false,
    error: '',
    actions: {
        // Create student 
        addStudent: async (data: IStudent) => {
            try {
                set({ loading: true, error: "" });
                await createStudent(data);
                toast.success('Student created successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                // After successful creation, fetch all students to update the state
                set({ loading: false, error: "" });
                useStudentStore.getState().actions.getAllStudents(); // Directly call getAllStudents
            } catch (error: any) { // Type 'any' for error for now, consider a more specific error type if available
                set({ loading: false, error: error.message || "Failed to create student" });
                toast.error(`Failed to create student ❌: ${error.message || ''}`, {
                    duration: 4000,
                    icon: "❌"
                });
            }
        },
        editStudent: async (data: IStudent, studentId: string) => {
            try {
                set({ loading: true, error: "" });
                await updateStudent(data, studentId);
                toast.success('Student updated successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                // After successful update, fetch all students to update the state
                set({ loading: false, error: "" });
                useStudentStore.getState().actions.getAllStudents(); // Directly call getAllStudents
            } catch (error: any) {
                set({ loading: false, error: error.message || "Failed to update student" });
                toast.error(`Failed to update student ❌: ${error.message || ''}`, {
                    duration: 4000,
                    icon: "❌"
                });
            }
        },
        removeStudent: async (studentId: string) => {
            try {
                set({ loading: true, error: "" });
                await deleteStudent(studentId);
                toast.success('Student deleted successfully ✅', {
                    duration: 4000,
                    icon: "✅"
                });
                // After successful deletion, fetch all students to update the state
                set({ loading: false, error: "" });
                useStudentStore.getState().actions.getAllStudents(); // Directly call getAllStudents
            } catch (error: any) {
                set({ loading: false, error: error.message || "Failed to delete student" });
                toast.error(`Failed to delete student ❌: ${error.message || ''}`, {
                    duration: 4000,
                    icon: "❌"
                });
            }
        },
        getAllStudents: async () => {
            try {
                set({ loading: true, error: "" });
                const data = await getAllStudents();
                console.log("Fetched students:", data); // Log the data to inspect its structure
                if (data && data.data && data.data.Students) { // Adjusted based on your controller's ApiResponse format
                    set({ students: data.data.Students, loading: false, error: "" });
                    toast.success('Students fetched successfully ✅', {
                        duration: 4000,
                        icon: "✅"
                    });
                } else {
                    set({ students: [], loading: false, error: "Unexpected data format" });
                    toast.error('Failed to fetch students: Unexpected data format ❌', {
                        duration: 4000,
                        icon: "❌"
                    });
                }
            } catch (error: any) {
                set({ loading: false, error: error.message || "Failed to fetch students" });
                toast.error(`Failed to fetch students ❌: ${error.message || ''}`, {
                    duration: 4000,
                    icon: "❌"
                });
            }
        }
    }
}));

export const useStudents = () => useStudentStore((state) => state.students);
export const useStudentActions = () => useStudentStore((state) => state.actions);