
import { Routes, Route } from "react-router-dom";
import TutorSidebar from "@/components/TutorSidebar";
import TutorHome from "@/components/tutor/TutorHome";
import TutorAttendance from "@/components/tutor/TutorAttendance";
import TutorSchedule from "@/components/tutor/TutorSchedule";

const TutorDashboard = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <TutorSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<TutorHome />} />
          <Route path="/attendance" element={<TutorAttendance />} />
          <Route path="/schedule" element={<TutorSchedule />} />
        </Routes>
      </div>
    </div>
  );
};

export default TutorDashboard;
