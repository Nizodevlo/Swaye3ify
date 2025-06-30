
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock, CheckSquare, BookOpen, Star } from "lucide-react";

const TutorHome = () => {
  const todaySessions = [
    {
      id: 1,
      course: "Advanced Mathematics",
      time: "10:00 AM - 11:30 AM",
      room: "Room A1",
      students: 12,
      status: "Upcoming"
    },
    {
      id: 2,
      course: "Basic Algebra",
      time: "2:00 PM - 3:30 PM", 
      room: "Room A2",
      students: 8,
      status: "Upcoming"
    }
  ];

  const recentStudents = [
    {
      id: 1,
      name: "Ahmed Benali",
      course: "Advanced Mathematics",
      attendance: "Present",
      lastSession: "Yesterday"
    },
    {
      id: 2,
      name: "Fatima Alaoui", 
      course: "Basic Algebra",
      attendance: "Present",
      lastSession: "2 days ago"
    },
    {
      id: 3,
      name: "Omar Kettani",
      course: "Advanced Mathematics", 
      attendance: "Absent",
      lastSession: "3 days ago"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Dr. Sarah!</h1>
          <p className="text-gray-400">Here's your teaching schedule for today</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-900/50 text-green-400 border-green-700">
            Active Tutor
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">4.9</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Today's Sessions</p>
                <h3 className="text-2xl font-bold text-white mt-1">3</h3>
              </div>
              <div className="p-3 rounded-lg bg-purple-900/20">
                <Calendar className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Students</p>
                <h3 className="text-2xl font-bold text-white mt-1">125</h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-900/20">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Courses Teaching</p>
                <h3 className="text-2xl font-bold text-white mt-1">8</h3>
              </div>
              <div className="p-3 rounded-lg bg-green-900/20">
                <BookOpen className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg. Rating</p>
                <h3 className="text-2xl font-bold text-white mt-1">4.9</h3>
              </div>
              <div className="p-3 rounded-lg bg-yellow-900/20">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Sessions */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Today's Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">{session.course}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {session.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {session.students} students
                        </div>
                        <span>{session.room}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-blue-900/50 text-blue-400 border-blue-700">
                        {session.status}
                      </Badge>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Start Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recent Students */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                <CheckSquare className="w-4 h-4 mr-2" />
                Mark Attendance
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                <Users className="w-4 h-4 mr-2" />
                Student Progress
              </Button>
            </CardContent>
          </Card>

          {/* Recent Students */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{student.name}</h4>
                      <p className="text-gray-400 text-sm">{student.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        className={
                          student.attendance === "Present" 
                            ? "bg-green-900/50 text-green-400 border-green-700"
                            : "bg-red-900/50 text-red-400 border-red-700"
                        }
                      >
                        {student.attendance}
                      </Badge>
                      <p className="text-gray-400 text-xs mt-1">{student.lastSession}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorHome;
