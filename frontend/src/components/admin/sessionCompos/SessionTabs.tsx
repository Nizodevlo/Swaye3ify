// components/sessions/SessionTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionCard } from "./SessionCard";
import { ISessionPop, ISession } from "@/types/sessionTypes"; // Import ISession
import { SessionDialog } from "./SessionDialog"; // Import SessionDialog
import { useState } from "react";

type SessionTabsProps = {
  onDelete: (id: string) => Promise<void>;
  sessions: ISessionPop[];
  // New prop to trigger edit dialog from parent (AdminSessions)
  onEditSession: (session: ISessionPop) => void;
};

export const SessionTabs = ({
  onDelete,
  sessions,
  onEditSession, // Receive the edit handler from AdminSessions
}: SessionTabsProps) => {
  return (
    <div>
      {sessions.length > 0 ? (
        sessions.map((sesh) => (
          <SessionCard
            key={sesh._id}
            session={sesh}
            onDelete={onDelete}
            onEdit={onEditSession} // Pass the new onEditSession handler
          />
        ))
      ) : (
        <p className="text-gray-400 text-center mt-8">No sessions available.</p>
      )}
    </div>
  );
};

// // components/sessions/SessionTabs.tsx
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { SessionCard } from "./SessionCard";
// import { ISessionPop } from "@/types/sessionTypes";

// type SessionTabsProps = {
//   onDelete: (id: string) => Promise<void>;
//   sessions: ISessionPop[];
// };

// export const SessionTabs = ({ onDelete, sessions }: SessionTabsProps) => {
//   return (
//     <div>
//       {sessions.map((sesh) => (
//         <SessionCard key={sesh._id} session={sesh} onDelete={onDelete} />
//       ))}
//     </div>
//   );
// };
