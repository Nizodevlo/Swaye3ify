
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  Calendar,
  Settings,
  LogOut,
  Home,
  CheckSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TutorSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/tutor" },
    { icon: CheckSquare, label: "Attendance", path: "/tutor/attendance" },
    { icon: Calendar, label: "Schedule", path: "/tutor/schedule" },
    { icon: Settings, label: "Settings", path: "/tutor/settings" }
  ];

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-white">TutorHub</div>
            <div className="text-xs text-gray-400">Tutor Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors duration-200",
                isActive 
                  ? "bg-purple-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default TutorSidebar;
