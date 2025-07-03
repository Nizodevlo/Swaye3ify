// app/admin/sessions/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { SessionFilters } from "./sessionCompos/SessionFilters";
import { SessionTabs } from "./sessionCompos/SessionTabs";
import { SessionDialog } from "./sessionCompos/SessionDialog"; // Import SessionDialog directly
import { SessionStats } from "./sessionCompos/SessionStats";
import { useSessions, useSessionsActions } from "@/stores/sessionStore";
import { ISessionPop, ISession } from "@/types/sessionTypes"; // Import ISession for types

export default function AdminSessions() {
  const [activeTab, setActiveTab] = useState("today"); // Not used yet, but kept
  const sessions = useSessions(); // Get sessions from the store
  const { deleteSession, getAllSession, addSession } = useSessionsActions(); // Get actions from the store

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog open/close
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create"); // State for dialog mode
  const [sessionToEdit, setSessionToEdit] = useState<ISessionPop | undefined>(
    undefined
  ); // State to hold data for editing

  // Fetch all sessions on component mount using the store action
  useEffect(() => {
    getAllSession();
  }, [getAllSession]);

  const handleDelete = async (id: string) => {
    await deleteSession(id); // The store's deleteSession action will now re-fetch sessions automatically
  };

  const handleCreateSessionClick = () => {
    setDialogMode("create");
    setSessionToEdit(undefined); // Clear any previous editing data
    setIsDialogOpen(true); // Open the dialog for creation
  };

  const handleEditSession = (session: ISessionPop) => {
    setDialogMode("edit");
    setSessionToEdit(session); // Set the session data to be edited
    setIsDialogOpen(true); // Open the dialog for editing
  };

  // This function is passed to SessionDialog's onSubmit, but the actual store
  // actions are called directly within SessionDialog. This can be simplified.
  // For now, we'll keep it as a placeholder.
  const handleDialogSubmit = () => {
    // This callback is triggered when the dialog's form is submitted.
    // The actual add/update logic is within SessionDialog using store actions.
    // You might want to re-fetch all sessions here if the store actions don't already.
    // However, since we updated the store actions to call getAllSession, this might be redundant.
    // For now, it simply ensures the dialog closes.
    setIsDialogOpen(false); // Make sure dialog closes after any submission
    setSessionToEdit(undefined); // Clear editing session data
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Session Management
          </h1>
          <p className="text-gray-400">
            Schedule sessions, manage attendance, and track progress
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-gray-600 text-black hover:bg-blue-500 hover:text-white duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {/* Trigger the SessionDialog for creation */}
          <Button
            variant="outline"
            className="inline-flex border-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:text-white"
            onClick={handleCreateSessionClick} // Open dialog for creation
          >
            <Plus className="w-4 h-4 mr-2" /> Schedule New Session
          </Button>
        </div>
      </div>

      <SessionFilters />
      {/* Pass the onEditSession handler to SessionTabs */}
      <SessionTabs
        sessions={sessions}
        onDelete={handleDelete}
        onEditSession={handleEditSession}
      />
      <SessionStats />

      {/* Render the SessionDialog separately and control its open state */}
      <SessionDialog
        mode={dialogMode}
        sessionData={sessionToEdit} // Pass the session data for editing
        open={isDialogOpen} // Control dialog visibility
        onOpenChange={setIsDialogOpen} // Allow dialog to control its own open state (e.g., when closing via escape/overlay)
        onSubmit={handleDialogSubmit} // Callback after submission (dialog will close itself)
      >
        {/* Children prop for SessionDialog is not needed here as it's not a trigger anymore */}
      </SessionDialog>
    </div>
  );
}

// // app/admin/sessions/page.tsx
// "use client"; // Add this directive for client-side components if not already present
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, Download } from "lucide-react";
// import { SessionFilters } from "./sessionCompos/SessionFilters";
// import { SessionTabs } from "./sessionCompos/SessionTabs";
// import { SessionDialog } from "./sessionCompos/SessionDialog";
// import { SessionStats } from "./sessionCompos/SessionStats";
// import { useSessions, useSessionsActions } from "@/stores/sessionStore"; // Import useSessions from your store
// // Removed direct import of getAllSession from apis, as store will handle fetching

// export default function AdminSessions() {
//   const [activeTab, setActiveTab] = useState("today");
//   // Get sessions directly from the store
//   const sessions = useSessions();
//   const { deleteSession, getAllSession } = useSessionsActions(); // Get actions from the store

//   // Fetch all sessions on component mount using the store action
//   useEffect(() => {
//     getAllSession();
//   }, [getAllSession]); // Depend on getAllSession action

//   const handleDelete = async (id: string) => {
//     // The store's deleteSession action will now re-fetch sessions automatically
//     await deleteSession(id);
//     // No need to manually update local state (setSessions) here
//   };

//   // This function is still used by SessionDialog for its onSubmit prop.
//   // The actual session creation logic will be handled within SessionDialog
//   // by calling `addSession` from the store.
//   const handleCreateSession = () => {
//     // This can remain empty or log for debugging, as the store action handles the creation.
//     // The dialog will handle closing itself after the store action completes.
//   };

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Session Management
//           </h1>
//           <p className="text-gray-400">
//             Schedule sessions, manage attendance, and track progress
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             className="border-gray-600 text-black hover:bg-blue-500 hover:text-white duration-300"
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Export
//           </Button>
//           {/* Pass the onSubmit prop for clarity, though actual session creation will be in SessionDialog */}
//           <SessionDialog onSubmit={handleCreateSession}>
//             <Button
//               variant="outline"
//               className="inline-flex border-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:text-white"
//             >
//               <Plus className="w-4 h-4 mr-2" /> Schedule New Session
//             </Button>
//           </SessionDialog>
//         </div>
//       </div>

//       <SessionFilters />
//       {/* Pass sessions from the store to SessionTabs */}
//       <SessionTabs sessions={sessions} onDelete={handleDelete} />
//       <SessionStats />
//     </div>
//   );
// }

// // app/admin/sessions/page.tsx
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, Download } from "lucide-react";
// import { SessionFilters } from "./sessionCompos/SessionFilters";
// import { SessionTabs } from "./sessionCompos/SessionTabs";
// import { SessionDialog } from "./sessionCompos/SessionDialog";
// import { SessionStats } from "./sessionCompos/SessionStats";
// import { useSessionsActions } from "@/stores/sessionStore";
// import { getAllSession } from "@/apis/sessionApis";
// import { ISessionPop } from "@/types/sessionTypes";

// export default function AdminSessions() {
//   const [activeTab, setActiveTab] = useState("today");
//   const [sessions, setSessions] = useState<ISessionPop[]>([]);

//   const { deleteSession } = useSessionsActions();

//   useEffect(() => {
//     const fetchSessions = async () => {
//       if (!sessions || sessions.length === 0) {
//         const seshs = await getAllSession();
//         setSessions(seshs.data);
//       }
//     };
//     fetchSessions();
//   }, [sessions.length, getAllSession]);

//   const handleDelete = async (id: string) => {
//     await deleteSession(id);
//     setSessions((prev) => prev.filter((s) => s._id !== id)); // Update state
//   };

//   const handleCreateSession = (sessionData: any) => {
//     console.log("Creating new session:", sessionData);
//   };

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Session Management
//           </h1>
//           <p className="text-gray-400">
//             Schedule sessions, manage attendance, and track progress
//           </p>
//         </div>
//         <div className="flex space-x-2">
//           <Button
//             variant="outline"
//             className="border-gray-600 text-black hover:bg-blue-500 hover:text-white duration-300"
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Export
//           </Button>
//           <SessionDialog onSubmit={handleCreateSession}>
//             <Button
//               variant="outline"
//               className="inline-flex border-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:text-white"
//             >
//               <Plus className="w-4 h-4 mr-2" /> Schedule New Session
//             </Button>
//           </SessionDialog>
//         </div>
//       </div>

//       <SessionFilters />
//       <SessionTabs sessions={sessions} onDelete={handleDelete} />
//       <SessionStats />
//     </div>
//   );
// }
