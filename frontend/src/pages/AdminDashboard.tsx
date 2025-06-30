
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHome from "@/components/admin/AdminHome";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminTutors from "@/components/admin/AdminTutors";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminSessions from "@/components/admin/AdminSessions";
import AdminClassrooms from "@/components/admin/AdminClassrooms";
import AdminPayments from "@/components/admin/AdminPayments";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <AdminSidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/courses" element={<AdminCourses />} />
          <Route path="/tutors" element={<AdminTutors />} />
          <Route path="/students" element={<AdminStudents />} />
          <Route path="/sessions" element={<AdminSessions />} />
          <Route path="/classrooms" element={<AdminClassrooms />} />
          <Route path="/payments" element={<AdminPayments />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
