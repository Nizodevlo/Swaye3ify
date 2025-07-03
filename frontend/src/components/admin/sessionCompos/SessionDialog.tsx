// components/sessions/SessionDialog.tsx
"use client"; // Add this directive if it's not there
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Keep DialogTrigger for the "create" button in AdminSessions.
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// import { Plus, Edit } from "lucide-react"; // Not directly used here, but in button triggers
import { useEffect, useState } from "react";
import { getAllDays } from "@/apis/dayApis";
import { useSessionsActions } from "@/stores/sessionStore";
import { getAllSalles } from "@/apis/salleApis";
import { getAllCours } from "@/apis/courApis";
import { ISession, ISessionPop } from "@/types/sessionTypes"; // Import ISessionPop

type SessionDialogProps = {
  mode?: "create" | "edit";
  sessionData?: ISessionPop; // Now directly expect ISessionPop for edit mode
  children?: React.ReactNode; // Optional, as it might not always be used as a trigger
  onSubmit?: () => void; // A simple callback after form submission
  open: boolean; // Explicitly control the open state
  onOpenChange: (open: boolean) => void; // Callback for when dialog's open state changes
};

export const SessionDialog = ({
  mode = "create",
  sessionData,
  children,
  onSubmit,
  open, // Destructure controlled open state
  onOpenChange, // Destructure open change handler
}: SessionDialogProps) => {
  const { addSession, updateSession } = useSessionsActions();

  const [days, setDays] = useState<any[]>([]);
  const [salles, setSalles] = useState<any[]>([]);
  const [cours, setCours] = useState<any[]>([]);

  // State to hold form data, initialized based on mode
  const [formData, setFormData] = useState<ISession>({
    day: "",
    startTime: "",
    endTime: "",
    coursId: "",
    salleId: "",
  });

  // Effect to populate form data when dialog opens or sessionData changes (for edit mode)
  useEffect(() => {
    if (mode === "edit" && sessionData) {
      // Map ISessionPop to ISession for form data
      setFormData({
        day: sessionData.day, // Day is a string in ISessionPop, so it's fine
        startTime: sessionData.startTime,
        endTime: sessionData.endTime,
        coursId: sessionData.coursId._id, // Extract ID from populated object
        salleId: sessionData.salleId._id, // Extract ID from populated object
      });
    } else {
      // Reset for create mode
      setFormData({
        day: "",
        startTime: "",
        endTime: "",
        coursId: "",
        salleId: "",
      });
    }
  }, [mode, sessionData, open]); // Re-run when dialog opens or sessionData changes

  // Effect to fetch initial dropdown data (days, salles, cours)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [fetchedDays, fetchedSalles, fetchedCours] = await Promise.all([
          getAllDays(),
          getAllSalles(),
          getAllCours(),
        ]);

        setDays(fetchedDays?.days || []);
        setSalles(fetchedSalles?.data?.salles || []);
        setCours(fetchedCours?.data?.cours || []);
      } catch (err) {
        console.error("Failed to fetch initial data for dialog:", err);
        setDays([]);
        setSalles([]);
        setCours([]);
      }
    };
    fetchInitialData();
  }, []); // Only run once on mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: keyof ISession, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      await addSession(formData);
    } else if (mode === "edit" && sessionData?._id) {
      await updateSession(formData, sessionData._id);
    }
    onOpenChange(false); // Close dialog after submission
    if (onSubmit) onSubmit(); // Call the parent's onSubmit
  };

  // Helper to get the display value for Select components
  const getSelectDisplayValue = (
    id: string,
    list: any[],
    idKey: string,
    displayKey: string
  ) => {
    const item = list.find((item) => item[idKey] === id);
    return item ? item[displayKey] : "";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}{" "}
      {/* Only render trigger if children are provided */}
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Session" : "Edit Session"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="day">Day</Label>
              <Select
                name="day"
                value={formData.day || ""} // Use formData.day
                onValueChange={(value) => handleSelectChange("day", value)}
              >
                <SelectTrigger
                  id="day"
                  className="w-full bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  {days.map((day) => (
                    <SelectItem
                      key={day._id}
                      value={day.day} // Ensure this matches what your backend expects for 'day' field
                      className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    >
                      {day.day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div className="startTime w-1/2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="bg-gray-800 placeholder:text-white outline-none"
                />
              </div>
              <div className="endTime w-1/2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="bg-gray-800 placeholder:text-white outline-none"
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="cours">Cours</Label>
              <Select
                name="coursId"
                value={formData.coursId || ""} // Use formData.coursId
                onValueChange={(value) => handleSelectChange("coursId", value)}
              >
                <SelectTrigger
                  id="cours"
                  className="w-full bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Select a cours" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  {cours.map((cour) => (
                    <SelectItem
                      key={cour._id}
                      value={cour._id}
                      className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    >
                      {cour.courName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="salleId">Classroom</Label>
              <Select
                name="salleId"
                value={formData.salleId || ""} // Use formData.salleId
                onValueChange={(value) => handleSelectChange("salleId", value)}
              >
                <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a classroom" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  {salles.map((salle) => (
                    <SelectItem
                      key={salle._id}
                      value={salle._id}
                      className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    >
                      {salle.salleName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="text-black hover:bg-red-500 border hover:border-red-500 duration-300 hover:text-white"
                onClick={() => onOpenChange(false)} // Explicitly close when clicking cancel
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-purple-500 duration-300 hover:bg-purple-700"
            >
              {mode === "create" ? "Create Session" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// // components/sessions/SessionDialog.tsx
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Plus, Edit } from "lucide-react";
// import { useEffect, useState } from "react";
// import { getAllDays } from "@/apis/dayApis";
// import { useSessions, useSessionsActions } from "@/stores/sessionStore";
// import { getAllSalles } from "@/apis/salleApis";
// import { getAllCours } from "@/apis/courApis";

// type SessionDialogProps = {
//   mode?: "create" | "edit";
//   sessionData?: {
//     day: string;
//     tutor: string;
//     startTime: string;
//     endTime: string;
//     classroom: string;
//   };
//   children: React.ReactNode;
//   onSubmit: (data: {
//     day: string;
//     tutor: string;
//     startTime: string;
//     endTime: string;
//     classroom: string;
//   }) => void;
// };

// export const SessionDialog = ({
//   mode = "create",
//   sessionData,
//   children,
//   onSubmit,
// }: SessionDialogProps) => {
//   const sessions = useSessions();
//   const { getAllSession, addSession, updateSession, deleteSession } =
//     useSessionsActions();

//   const [days, setDays] = useState([]);
//   const [salles, setSalles] = useState([]);
//   const [cours, setCours] = useState([]);

//   const [newSession, setNewSession] = useState({
//     day: "",
//     startTime: "",
//     endTime: "",
//     coursId: "",
//     salleId: "",
//   });
//   // useEffect(() => console.log(newSession), [newSession]);

//   const [editingSession, setEditingSession] = useState(null);

//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

//   const [displayNewDayName, setDisplayNewDayName] = useState("");
//   const [displayNewSalleName, setDisplayNewSalleName] = useState("");
//   const [displayNewCoursName, setDisplayNewCoursName] = useState("");

//   const [displayEditingDayName, setDisplayEditingDayName] = useState("");
//   const [displayEditingSalleName, setDisplayEditingSalleName] = useState("");
//   const [displayEditingCoursName, setDisplayEditingCoursName] = useState("");

//   useEffect(() => {
//     const fetchInitiaData = async () => {
//       if (!sessions || sessions.length === 0) {
//         getAllSession();
//       }

//       try {
//         const fetchDays = await getAllDays();
//         if (fetchDays && fetchDays.days) {
//           setDays(fetchDays.days);
//         } else {
//           setDays([]);
//         }
//       } catch (err) {
//         // console.error("Failed to fetch days:", err);
//         setDays([]);
//       }

//       try {
//         const fetchSalles = await getAllSalles();
//         const salles = fetchSalles.data.salles;
//         if (fetchSalles && salles) {
//           setSalles(salles);
//         } else {
//           setSalles([]);
//         }
//       } catch (err) {
//         // console.error("Failed to fetch salles:", err);
//         setSalles([]);
//       }

//       try {
//         const fetchCours = await getAllCours();
//         const cours = fetchCours.data.cours;
//         if (fetchCours && cours) {
//           setCours(cours);
//         } else {
//           setCours([]);
//         }
//       } catch (err) {
//         // console.error("Failed to fetch cours:", err);
//         setCours([]);
//       }
//     };

//     fetchInitiaData();
//   }, [sessions.length, getAllSession]);

//   const handleInputChange = (e) => {
//     const { name, value, type } = e.target;
//     // console.log(value);

//     if (editingSession) {
//       setEditingSession((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     } else {
//       setNewSession((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSelectChange = (name, idValue) => {
//     // console.log(idValue);

//     if (editingSession) {
//       setEditingSession((prev) => ({
//         ...prev,
//         [name]: idValue,
//       }));
//       if (name === "day") {
//         const selectedDay = days.find((day) => day._id === idValue);
//         setDisplayEditingDayName(selectedDay ? selectedDay.day : "");
//       } else if (name === "salle") {
//         const selectedSalle = salles.find((salle) => salle._id === idValue);
//         setDisplayEditingSalleName(selectedSalle ? selectedSalle.salle : "");
//       } else if (name === "cours") {
//         const selectedCours = cours.find((cours) => cours._id === idValue);
//         setDisplayEditingCoursName(selectedCours ? selectedCours.cours : "");
//       }
//     } else {
//       setNewSession((prev) => ({
//         ...prev,
//         [name]: idValue,
//       }));
//       if (name === "day") {
//         const selectedDay = days.find((day) => day._id === idValue);
//         setDisplayNewDayName(selectedDay ? selectedDay.day : "");
//       } else if (name === "salle") {
//         const selectedSalle = salles.find((salle) => salle._id === idValue);
//         setDisplayNewSalleName(selectedSalle ? selectedSalle.salle : "");
//       } else if (name === "cours") {
//         const selectedCours = cours.find((cours) => cours._id === idValue);
//         setDisplayNewCoursName(selectedCours ? selectedCours.cours : "");
//       }
//     }
//   };

//   const handleAddSessionSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await addSession(newSession);
//     getAllSession();
//     setIsEditDialogOpen(!isEditDialogOpen);
//     setNewSession({
//       day: "",
//       startTime: "",
//       endTime: "",
//       coursId: "",
//       salleId: "",
//     });
//     setDisplayNewCoursName("");
//     setDisplayNewSalleName("");
//     setDisplayNewDayName("");
//     // location.reload();
//   };

//   const handleEditClick = (session) => {
//     setEditingSession({ ...session });
//     const selectedDay = days.find((day) => day._id === session.day);
//     const selectedSalle = salles.find((salle) => salle._id === session.salle);
//     const selectedCours = cours.find((cours) => cours._id === session.cours);
//     setDisplayEditingDayName(selectedDay ? selectedDay.day : "");
//     setDisplayEditingSalleName(selectedSalle ? selectedSalle.salle : "");
//     setDisplayEditingCoursName(selectedCours ? selectedCours.cours : "");
//     setIsEditDialogOpen(true);
//   };

//   const handleUpdateSessionSubmit = async (e) => {
//     e.preventDefault();
//     if (editingSession && editingSession._id) {
//       await updateSession(editingSession, editingSession._id);
//       setIsEditDialogOpen(false);
//       setEditingSession(null);
//       setDisplayEditingDayName("");
//       setDisplayEditingSalleName("");
//       setDisplayEditingCoursName("");
//     }
//   };

//   const handleDeleteClick = async (sessionId) => {
//     if (window.confirm("Are you sure you want to delete this Session?")) {
//       await deleteSession(sessionId);
//       // location.reload();
//     }
//   };

//   const todaysSession = 8;
//   const weeklySession = 45;
//   const AttendanceRate = 92;
//   const sessionHours = 165;

//   return (
//     <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
//         <DialogHeader>
//           <DialogTitle>
//             {mode === "create" ? "Add New Session" : "Edit Session"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleAddSessionSubmit}>
//           <div className="grid gap-4">
//             <div className="grid gap-3">
//               <Label htmlFor="day">Day</Label>
//               <Select
//                 name="day"
//                 defaultValue={newSession?.day}
//                 onValueChange={(value) => handleSelectChange("day", value)}
//               >
//                 <SelectTrigger
//                   id="day"
//                   className="w-full bg-gray-800 border-gray-700 text-white"
//                 >
//                   <SelectValue placeholder="Select a day" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
//                   {days.map((day) => (
//                     <SelectItem
//                       key={day._id}
//                       value={day.day}
//                       className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
//                     >
//                       {day.day}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex justify-between align-items gap-3">
//               <div className="startTime w-1/2">
//                 <Label htmlFor="startTime">Start Time</Label>
//                 <Input
//                   type="time"
//                   id="startTime"
//                   name="startTime"
//                   value={newSession.startTime}
//                   onChange={handleInputChange}
//                   className="bg-gray-800 placeholder:text-white outline-none"
//                 />
//               </div>
//               <div className="endTime w-1/2">
//                 <Label htmlFor="endTime">End Time</Label>
//                 <Input
//                   type="time"
//                   id="endTime"
//                   name="endTime"
//                   value={newSession.endTime}
//                   onChange={handleInputChange}
//                   className="bg-gray-800 placeholder:text-white outline-none"
//                 />
//               </div>
//             </div>

//             <div className="grid gap-3">
//               <Label htmlFor="cours">Cours</Label>
//               <Select
//                 name="cours"
//                 onValueChange={(value) => handleSelectChange("coursId", value)}
//                 value={newSession.coursId}
//               >
//                 <SelectTrigger
//                   id="cours"
//                   className="w-full bg-gray-800 border-gray-700 text-white"
//                 >
//                   <SelectValue placeholder="Select a cours" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
//                   {cours.map((cour) => (
//                     <SelectItem
//                       key={cour._id}
//                       value={cour._id}
//                       className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
//                     >
//                       {cour.courName}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-3">
//               <Label htmlFor="classroom">Classroom</Label>
//               <Select
//                 onValueChange={(value) => handleSelectChange("salleId", value)}
//                 value={newSession.salleId}
//               >
//                 <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
//                   <SelectValue placeholder="Select a classroom" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
//                   {salles.map((salle) => (
//                     <SelectItem
//                       key={salle._id}
//                       value={salle._id}
//                       className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
//                     >
//                       {salle.salleName}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter className="mt-4">
//             <DialogClose asChild>
//               <Button
//                 variant="outline"
//                 className="text-black hover:bg-red-500 border hover:border-red-500 duration-300 hover:text-white"
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               type="submit"
//               className="bg-purple-500 duration-300 hover:bg-purple-700"
//             >
//               {mode === "create" ? "Create Session" : "Save Changes"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
