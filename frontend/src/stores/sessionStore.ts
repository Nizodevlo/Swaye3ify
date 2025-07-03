// sessionStore.ts
import {
  createSession,
  deleteSession,
  getAllSession,
  updateSession,
} from "@/apis/sessionApis";
import { IStore } from "@/types/globalType";
import {
  ISession,
  ISessionAction,
  ISessionState,
  ISessionPop, // Import ISessionPop as well
} from "@/types/sessionTypes"; // Make sure ISessionPop is imported
import { toast } from "sonner";
import { create } from "zustand";

const useSessionStore = create<IStore<ISessionState, ISessionAction>>(
  (set) => ({
    sessions: [],
    loading: false,
    error: "",
    actions: {
      addSession: async (data: ISession) => {
        try {
          set({ loading: true, error: "" });
          await createSession(data);
          toast.success("Session created successfully", {
            duration: 4000,
            icon: "✅",
          });
          // After successful creation, re-fetch all sessions to update the store
          const res = await getAllSession();
          set({ sessions: res.data, loading: false, error: "" }); // Assuming res.data is an array of ISessionPop
        } catch (err: any) {
          set({ loading: false, error: err.message || null });
          toast.error("Failed to create session", {
            duration: 4000,
            icon: "❌",
          });
        }
      },
      updateSession: async (data: ISession, sessionId: string) => {
        try {
          set({ loading: true, error: "" });
          await updateSession(data, sessionId);
          toast.success("Session updated successfully", {
            duration: 4000,
            icon: "✅",
          });
          // After successful update, re-fetch all sessions to update the store
          const res = await getAllSession();
          set({ sessions: res.data, loading: false, error: "" }); // Assuming res.data is an array of ISessionPop
        } catch (err: any) {
          set({ loading: false, error: err.message || null });
          toast.error("Failed to update session", {
            duration: 4000,
            icon: "❌",
          });
        }
      },
      deleteSession: async (sessionId: string) => {
        try {
          set({ loading: true, error: "" });
          await deleteSession(sessionId);
          toast.success("Session deleted successfully", {
            duration: 4000,
            icon: "✅",
          });
          // After successful deletion, re-fetch all sessions to update the store
          const res = await getAllSession();
          set({ sessions: res.data, loading: false, error: "" }); // Assuming res.data is an array of ISessionPop
        } catch (err: any) {
          set({ loading: false, error: err.message || null });
          toast.error("Failed to delete session", {
            duration: 4000,
            icon: "❌",
          });
        }
      },
      getAllSession: async () => {
        try {
          set({ loading: true, error: "" });
          const res = await getAllSession();
          set({ sessions: res.data, loading: false, error: "" }); // Assuming res.data is an array of ISessionPop
          toast.success("Sessions fetched successfully", {
            duration: 4000,
            icon: "✅",
          });
        } catch (err: any) {
          set({ loading: false, error: err.message || null });
          toast.error("Failed to fetch sessions", {
            duration: 4000,
            icon: "❌",
          });
        }
      },
    },
  })
);

export const useSessions = () => useSessionStore((state) => state.sessions);
export const useSessionsActions = () =>
  useSessionStore((state) => state.actions);
// import {
//   createSession,
//   deleteSession,
//   getAllSession,
//   updateSession,
// } from "@/apis/sessionApis";
// import { IStore } from "@/types/globalType";
// import { ISession, ISessionAction, ISessionState } from "@/types/sessionTypes";
// import { toast } from "sonner";
// import { create } from "zustand";

// const useSessionStore = create<IStore<ISessionState, ISessionAction>>(
//   (set) => ({
//     sessions: [],
//     loading: false,
//     error: "",
//     actions: {
//       addSession: async (data: ISession) => {
//         try {
//           set({ loading: true, error: "" });
//           await createSession(data);
//           toast.success("Session created successfully", {
//             duration: 4000,
//             icon: "✅",
//           });
//           set({ loading: false, error: "" });
//         } catch (err) {
//           set({ loading: false, error: err.message || null });
//         }
//       },
//       updateSession: async (data: ISession, sessionId: string) => {
//         try {
//           set({ loading: true, error: "" });
//           await updateSession(data, sessionId);
//           toast.success("Session updated successfully", {
//             duration: 4000,
//             icon: "✅",
//           });
//           set({ loading: false, error: "" });
//         } catch (err) {
//           set({ loading: false, error: err.message || null });
//         }
//       },
//       deleteSession: async (sessionId: string) => {
//         try {
//           set({ loading: true, error: "" });
//           await deleteSession(sessionId);
//           toast.success("Session deleted successfully", {
//             duration: 4000,
//             icon: "✅",
//           });
//           set({ loading: false, error: "" });
//         } catch (err) {
//           set({ loading: false, error: err.message || null });
//         }
//       },
//       getAllSession: async () => {
//         try {
//           set({ loading: true, error: "" });
//           await getAllSession();
//           toast.success("Session fetched successfully", {
//             duration: 4000,
//             icon: "✅",
//           });
//           set({ loading: false, error: "" });
//         } catch (err) {
//           set({ loading: false, error: err.message || null });
//         }
//       },
//     },
//   })
// );

// export const useSessions = () => useSessionStore((state) => state.sessions);
// export const useSessionsActions = () =>
//   useSessionStore((state) => state.actions);
