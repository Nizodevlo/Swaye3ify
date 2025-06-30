
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Calendar, Clock, MapPin, Users } from "lucide-react";

const AdminSessions = () => {
  const [activeTab, setActiveTab] = useState("today");

  const sessions = {
    today: [
      {
        id: 1,
        course: "Advanced Mathematics",
        tutor: "Dr. Sarah Ahmed",
        time: "10:00 AM - 11:30 AM",
        room: "Room A1",
        students: 12,
        maxStudents: 15,
        status: "In Progress",
        duration: "1.5 hours"
      },
      {
        id: 2,
        course: "Physics Fundamentals",
        tutor: "Prof. Hassan Alami",
        time: "2:00 PM - 3:30 PM",
        room: "Room B2",
        students: 8,
        maxStudents: 12,
        status: "Scheduled",
        duration: "1.5 hours"
      },
      {
        id: 3,
        course: "English Literature",
        tutor: "Ms. Fatima Benali",
        time: "4:00 PM - 5:00 PM",
        room: "Room C3",
        students: 15,
        maxStudents: 15,
        status: "Scheduled",
        duration: "1 hour"
      }
    ],
    upcoming: [
      {
        id: 4,
        course: "Chemistry Basics",
        tutor: "Dr. Mohamed Tazi",
        time: "9:00 AM - 10:30 AM",
        room: "Lab 1",
        students: 10,
        maxStudents: 12,
        status: "Scheduled",
        duration: "1.5 hours",
        date: "Tomorrow"
      },
      {
        id: 5,
        course: "Advanced Physics",
        tutor: "Prof. Hassan Alami",
        time: "11:00 AM - 12:30 PM",
        room: "Room B1",
        students: 6,
        maxStudents: 10,
        status: "Scheduled",
        duration: "1.5 hours",
        date: "Tomorrow"
      }
    ],
    completed: [
      {
        id: 6,
        course: "Basic Mathematics",
        tutor: "Ms. Aicha Bennani",
        time: "9:00 AM - 10:00 AM",
        room: "Room A2",
        students: 14,
        maxStudents: 15,
        status: "Completed",
        duration: "1 hour",
        date: "Yesterday"
      }
    ]
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

  const renderSessionCard = (session: any) => (
    <Card key={session.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{session.course}</h3>
            <p className="text-purple-400">{session.tutor}</p>
            {session.date && <p className="text-gray-400 text-sm">{session.date}</p>}
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
            <span className="text-sm">{session.students}/{session.maxStudents}</span>
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
              style={{ width: `${(session.students / session.maxStudents) * 100}%` }}
            ></div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Session Management</h1>
          <p className="text-gray-400">Schedule sessions, manage attendance, and track progress</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Session
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search sessions..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Tutor" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Tutors</SelectItem>
                <SelectItem value="sarah">Dr. Sarah Ahmed</SelectItem>
                <SelectItem value="hassan">Prof. Hassan Alami</SelectItem>
                <SelectItem value="fatima">Ms. Fatima Benali</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="today" className="text-white data-[state=active]:bg-purple-600">
            Today's Sessions
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-white data-[state=active]:bg-purple-600">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-white data-[state=active]:bg-purple-600">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 mt-6">
          {sessions.today.map(renderSessionCard)}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {sessions.upcoming.map(renderSessionCard)}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {sessions.completed.map(renderSessionCard)}
        </TabsContent>
      </Tabs>

      {/* Session Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Today's Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">8</div>
            <p className="text-gray-400 text-sm">3 completed, 5 scheduled</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Weekly Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">45</div>
            <p className="text-gray-400 text-sm">+8% from last week</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">92%</div>
            <p className="text-gray-400 text-sm">Average attendance</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Session Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">156</div>
            <p className="text-gray-400 text-sm">Total hours this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSessions;
