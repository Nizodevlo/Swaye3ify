
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Star
} from "lucide-react";

const AdminHome = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Tutors",
      value: "56",
      change: "+8%",
      icon: GraduationCap,
      color: "text-green-500"
    },
    {
      title: "Courses",
      value: "89",
      change: "+5%",
      icon: BookOpen,
      color: "text-purple-500"
    },
    {
      title: "Revenue",
      value: "$47,382",
      change: "+23%",
      icon: DollarSign,
      color: "text-yellow-500"
    }
  ];

  const recentSessions = [
    {
      id: 1,
      course: "Advanced Mathematics",
      tutor: "Dr. Sarah Ahmed",
      students: 12,
      time: "10:00 AM",
      status: "In Progress",
      room: "Room A1"
    },
    {
      id: 2,
      course: "Physics Fundamentals",
      tutor: "Prof. Hassan Alami",
      students: 8,
      time: "2:00 PM",
      status: "Scheduled",
      room: "Room B2"
    },
    {
      id: 3,
      course: "English Literature",
      tutor: "Ms. Fatima Benali",
      students: 15,
      time: "4:00 PM",
      status: "Completed",
      room: "Room C3"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening at your tutoring center.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Generate Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                      <Badge className="bg-green-900/50 text-green-400 border-green-700">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-800 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Sessions */}
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
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{session.course}</h4>
                      <p className="text-gray-400 text-sm">{session.tutor}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="text-white font-medium">{session.students}</div>
                        <div className="text-gray-400">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-medium">{session.time}</div>
                        <div className="text-gray-400">{session.room}</div>
                      </div>
                      <Badge 
                        className={
                          session.status === "In Progress" 
                            ? "bg-green-900/50 text-green-400 border-green-700"
                            : session.status === "Scheduled"
                            ? "bg-blue-900/50 text-blue-400 border-blue-700"
                            : "bg-gray-700 text-gray-300"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                <Users className="w-4 h-4 mr-2" />
                Add New Student
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                <GraduationCap className="w-4 h-4 mr-2" />
                Register Tutor
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Create Course
              </Button>
              <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Session
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-300">Avg. Rating</span>
                </div>
                <span className="text-white font-semibold">4.8/5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-gray-300">Completion Rate</span>
                </div>
                <span className="text-white font-semibold">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-300">Avg. Session Time</span>
                </div>
                <span className="text-white font-semibold">1.5h</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
