
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const TutorSchedule = () => {
  const schedule = {
    today: [
      {
        id: 1,
        course: "Advanced Mathematics",
        time: "10:00 AM - 11:30 AM",
        room: "Room A1",
        students: 12,
        status: "In Progress"
      },
      {
        id: 2,
        course: "Basic Algebra", 
        time: "2:00 PM - 3:30 PM",
        room: "Room A2",
        students: 8,
        status: "Upcoming"
      },
      {
        id: 3,
        course: "Calculus Fundamentals",
        time: "4:00 PM - 5:30 PM", 
        room: "Room A1",
        students: 15,
        status: "Upcoming"
      }
    ],
    tomorrow: [
      {
        id: 4,
        course: "Linear Algebra",
        time: "9:00 AM - 10:30 AM",
        room: "Room B1", 
        students: 10,
        status: "Scheduled"
      },
      {
        id: 5,
        course: "Statistics Basics",
        time: "11:00 AM - 12:30 PM",
        room: "Room A2",
        students: 14,
        status: "Scheduled"
      }
    ],
    thisWeek: [
      {
        id: 6,
        course: "Advanced Mathematics",
        time: "Wednesday, 10:00 AM - 11:30 AM",
        room: "Room A1",
        students: 12,
        status: "Scheduled"
      },
      {
        id: 7,
        course: "Calculus Fundamentals", 
        time: "Thursday, 2:00 PM - 3:30 PM",
        room: "Room A1",
        students: 15,
        status: "Scheduled"
      },
      {
        id: 8,
        course: "Basic Algebra",
        time: "Friday, 10:00 AM - 11:30 AM",
        room: "Room A2", 
        students: 8,
        status: "Scheduled"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-green-900/50 text-green-400 border-green-700";
      case "Upcoming":
        return "bg-blue-900/50 text-blue-400 border-blue-700";
      case "Scheduled":
        return "bg-purple-900/50 text-purple-400 border-purple-700";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const renderSessionCard = (session: any) => (
    <Card key={session.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{session.course}</h3>
          <Badge className={getStatusColor(session.status)}>
            {session.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
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
            <span className="text-sm">{session.students} students</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-full bg-gray-700 rounded-full h-2 mr-4">
            <div 
              className="bg-purple-600 h-2 rounded-full" 
              style={{ width: `${(session.students / 15) * 100}%` }}
            ></div>
          </div>
          <Button 
            size="sm" 
            className={
              session.status === "In Progress" 
                ? "bg-green-600 hover:bg-green-700" 
                : "bg-purple-600 hover:bg-purple-700"
            }
          >
            {session.status === "In Progress" ? "Join Session" : "View Details"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Teaching Schedule</h1>
          <p className="text-gray-400">View and manage your upcoming teaching sessions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-900/50 text-green-400 border-green-700">
            8 sessions this week
          </Badge>
        </div>
      </div>

      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
            <p className="text-gray-400">Today's Sessions</p>
            <p className="text-green-400 text-sm">1 in progress</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2</div>
            <p className="text-gray-400">Tomorrow's Sessions</p>
            <p className="text-blue-400 text-sm">All scheduled</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">16</div>
            <p className="text-gray-400">Total Teaching Hours</p>
            <p className="text-purple-400 text-sm">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Sessions */}
      <div>
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Today's Sessions
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.today.map(renderSessionCard)}
        </div>
      </div>

      {/* Tomorrow's Sessions */}
      <div>
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Tomorrow's Sessions
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.tomorrow.map(renderSessionCard)}
        </div>
      </div>

      {/* This Week's Sessions */}
      <div>
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Rest of This Week
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedule.thisWeek.map(renderSessionCard)}
        </div>
      </div>
    </div>
  );
};

export default TutorSchedule;
