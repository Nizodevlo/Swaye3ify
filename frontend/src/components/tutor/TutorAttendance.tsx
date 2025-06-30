
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckSquare, X, Check, Clock, Users } from "lucide-react";

const TutorAttendance = () => {
  const [selectedSession, setSelectedSession] = useState("session1");

  const sessions = [
    {
      id: "session1",
      course: "Advanced Mathematics",
      time: "10:00 AM - 11:30 AM",
      date: "Today",
      room: "Room A1",
      status: "In Progress"
    },
    {
      id: "session2", 
      course: "Basic Algebra",
      time: "2:00 PM - 3:30 PM",
      date: "Today",
      room: "Room A2",
      status: "Upcoming"
    }
  ];

  const students = [
    {
      id: 1,
      name: "Ahmed Benali",
      email: "ahmed.benali@student.com",
      status: "present", // present, absent, late, not_marked
      joinTime: "10:05 AM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Fatima Alaoui", 
      email: "fatima.alaoui@student.com",
      status: "present",
      joinTime: "10:00 AM",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Omar Kettani",
      email: "omar.kettani@student.com", 
      status: "absent",
      joinTime: null,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Saida Bennani",
      email: "saida.bennani@student.com",
      status: "late",
      joinTime: "10:15 AM", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Youssef Idrissi",
      email: "youssef.idrissi@student.com",
      status: "not_marked",
      joinTime: "10:02 AM",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-900/50 text-green-400 border-green-700";
      case "absent":
        return "bg-red-900/50 text-red-400 border-red-700";
      case "late":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-700";
      case "not_marked":
        return "bg-gray-700 text-gray-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="w-4 h-4" />;
      case "absent":
        return <X className="w-4 h-4" />;
      case "late":
        return <Clock className="w-4 h-4" />;
      default:
        return <CheckSquare className="w-4 h-4" />;
    }
  };

  const markAttendance = (studentId: number, status: string) => {
    console.log(`Marking student ${studentId} as ${status}`);
  };

  const currentSession = sessions.find(s => s.id === selectedSession);
  const presentCount = students.filter(s => s.status === "present").length;
  const absentCount = students.filter(s => s.status === "absent").length;
  const lateCount = students.filter(s => s.status === "late").length;
  const notMarkedCount = students.filter(s => s.status === "not_marked").length;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Attendance Management</h1>
          <p className="text-gray-400">Mark and manage student attendance for your sessions</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Session Selection */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-white font-medium mb-2 block">Select Session</label>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {sessions.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.course} - {session.time} ({session.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {currentSession && (
              <div className="text-right">
                <Badge className="bg-blue-900/50 text-blue-400 border-blue-700">
                  {currentSession.status}
                </Badge>
                <p className="text-gray-400 text-sm mt-1">{currentSession.room}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{students.length}</div>
            <p className="text-gray-400 text-sm">Total Students</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{presentCount}</div>
            <p className="text-gray-400 text-sm">Present</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{absentCount}</div>
            <p className="text-gray-400 text-sm">Absent</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{lateCount}</div>
            <p className="text-gray-400 text-sm">Late</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-400">{notMarkedCount}</div>
            <p className="text-gray-400 text-sm">Not Marked</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Student Attendance
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                className="pl-10 bg-gray-800 border-gray-700 text-white w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{student.name}</h4>
                    <p className="text-gray-400 text-sm">{student.email}</p>
                    {student.joinTime && (
                      <p className="text-gray-500 text-xs">Joined at: {student.joinTime}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(student.status)} >
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(student.status)}
                      <span className="capitalize">{student.status.replace('_', ' ')}</span>
                    </div>
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => markAttendance(student.id, 'present')}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => markAttendance(student.id, 'late')}
                    >
                      <Clock className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => markAttendance(student.id, 'absent')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorAttendance;
