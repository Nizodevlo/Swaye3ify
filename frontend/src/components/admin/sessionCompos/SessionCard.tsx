// components/sessions/SessionCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Calendar, Trash2, Edit } from "lucide-react";
import { SessionDialog } from "./SessionDialog";

type Session = {
  id: number;
  course: string;
  tutor: string;
  time: string;
  room: string;
  students: number;
  maxStudents: number;
  status: string;
  duration: string;
  date?: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-green-900/50 text-green-400 border-green-700";
    case "Scheduled":
      return "bg-blue-900/50 text-blue-400 border-blue-700";
    case "Completed":
      return "bg-gray-700 text-gray-300";
    case "Cancelled":
      return "bg-red-900/50 text-red-400 border-red-700";
    default:
      return "bg-gray-700 text-gray-300";
  }
};

export const SessionCard = ({ session }: { session: Session }) => {
  const handleEditSession = (sessionData: any) => {
    console.log("Editing session:", sessionData);
    // Implement your edit logic here
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {session.course}
            </h3>
            <p className="text-purple-400">{session.tutor}</p>
            {session.date && (
              <p className="text-gray-400 text-sm">{session.date}</p>
            )}
          </div>
          <Badge className={getStatusColor(session.status)}>
            {session.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{session.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{session.room}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">
              {session.students}/{session.maxStudents}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{session.duration}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-full bg-gray-800 rounded-full h-2 mr-4">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{
                width: `${(session.students / session.maxStudents) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex space-x-2">
            <SessionDialog
              mode="edit"
              sessionData={{
                title: session.course,
                tutor: session.tutor,
                startTime: "",
                endTime: "",
                classroom: session.room,
              }}
              onSubmit={handleEditSession}
            >
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-white bg-green-500 hover:bg-white"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </SessionDialog>
            <Button
              size="sm"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
