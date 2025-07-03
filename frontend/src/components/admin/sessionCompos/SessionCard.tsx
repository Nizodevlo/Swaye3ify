// components/sessions/SessionCard.tsx
"use client"; // Add this directive if it's not there
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Calendar, Trash2, Edit } from "lucide-react";
import { ISessionPop } from "@/types/sessionTypes";
import { useEffect, useState } from "react";
// No need for useSessionsActions here for delete, it's passed via prop
// import { useSessionsActions } from "@/stores/sessionStore";

export const SessionCard = ({
  session,
  onDelete,
  onEdit, // New prop for handling edit
}: {
  session: ISessionPop;
  onDelete: (id: string) => Promise<void>;
  onEdit: (session: ISessionPop) => void; // Define the onEdit prop
}) => {
  // console.log("onDelete from SessionTabs:", typeof onDelete); // Debug line

  // const { deleteSession } = useSessionsActions(); // No longer needed here, onDelete is a prop

  const [difHrs, setDifHrs] = useState(0);
  const [difMins, setDifMins] = useState(0);

  const calculateDuration = () => {
    const [startHour, startMinute] = session.startTime.split(":").map(Number);
    const [endHour, endMinute] = session.endTime.split(":").map(Number);

    const startDate = new Date(0, 0, 0, startHour, startMinute);
    const endDate = new Date(0, 0, 0, endHour, endMinute);

    let diffMs = endDate.getTime() - startDate.getTime();

    // Handle sessions that cross midnight
    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setDifHrs(diffHrs);
    setDifMins(diffMins);
  };

  useEffect(() => {
    calculateDuration();
    // Re-calculate if start or end time changes
  }, [session.startTime, session.endTime]);

  // console.log(session); // Debug line

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors mb-4">
      {" "}
      {/* Added mb-4 for spacing */}
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {session.coursId?.courName || "N/A"}{" "}
              {/* Added optional chaining */}
            </h3>
            <p className="text-purple-400">
              Dr. {session.coursId?.teacher?.firstName || "N/A"}{" "}
              {/* Added optional chaining */}
              {session.coursId?.teacher?.lastName || ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{session.startTime}</span>
            <span>-</span>
            <span className="text-sm">{session.endTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              {session.salleId?.salleName || "N/A"}
            </span>{" "}
            {/* Added optional chaining */}
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {/* Assuming you'll have actual attendance data, for now keep 15 */}
              {15}/{session.salleId?.capacity || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {difHrs} Hours {difMins} Mins
            </span>
          </div>
        </div>

        <div className="flex justify-end items-center space-x-2">
          {" "}
          {/* Changed to justify-end for buttons on the right */}
          <Button
            size="sm"
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-500 hover:text-white"
            onClick={() => onEdit(session)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-500 hover:text-white"
            onClick={async () => {
              await onDelete(session._id); // Call the parent handler
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// // components/sessions/SessionCard.tsx
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Clock, MapPin, Users, Calendar, Trash2, Edit } from "lucide-react";
// import { ISessionPop } from "@/types/sessionTypes";
// import { useEffect, useState } from "react";
// import { useSessionsActions } from "@/stores/sessionStore";

// export const SessionCard = ({
//   session,
//   onDelete,
// }: {
//   session: ISessionPop;
//   onDelete: (id: string) => Promise<void>;
// }) => {
//   console.log("onDelete from SessionTabs:", typeof onDelete);

//   const { deleteSession } = useSessionsActions();

//   const [difHrs, setDifHrs] = useState(0);
//   const [difMins, setDifMins] = useState(0);

//   const calculateDuration = () => {
//     const [startHour, startMinute] = session.startTime.split(":").map(Number);
//     const [endHour, endMinute] = session.endTime.split(":").map(Number);

//     const startDate = new Date(0, 0, 0, startHour, startMinute);
//     const endDate = new Date(0, 0, 0, endHour, endMinute);

//     let diffMs = endDate.getTime() - startDate.getTime();

//     if (diffMs < 0) {
//       diffMs += 24 * 60 * 60 * 1000;
//     }

//     const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

//     setDifHrs(diffHrs);
//     setDifMins(diffMins);
//   };

//   useEffect(() => {
//     calculateDuration();
//   }, []);

//   console.log(session);

//   return (
//     <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h3 className="text-xl font-bold text-white mb-1">
//               {session.coursId.courName}
//             </h3>
//             <p className="text-purple-400">
//               Dr. {session.coursId.teacher.firstName}{" "}
//               {session.coursId.teacher.lastName}
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//           <div className="flex items-center space-x-2 text-gray-400">
//             <Clock className="w-4 h-4" />
//             <span className="text-sm">{session.startTime}</span>
//             <span>-</span>
//             <span className="text-sm">{session.endTime}</span>
//           </div>
//           <div className="flex items-center space-x-2 text-gray-400">
//             <MapPin className="w-4 h-4" />
//             <span className="text-sm">{session.salleId.salleName}</span>
//           </div>
//           <div className="flex items-center space-x-2 text-gray-400">
//             <Users className="w-4 h-4" />
//             <span className="text-sm">
//               {15}/{session.salleId.capacity}
//             </span>
//           </div>
//           <div className="flex items-center space-x-2 text-gray-400">
//             <Calendar className="w-4 h-4" />
//             <span className="text-sm">
//               {difHrs} Hours {difMins}
//             </span>
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <div className="flex space-x-2">
//             <Button
//               size="sm"
//               variant="outline"
//               className="border-red-600 text-red-400 hover:bg-red-500 hover:text-white"
//               onClick={async () => {
//                 await onDelete(session._id); // 👈 Call the parent handler
//               }}
//             >
//               <Trash2 className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
