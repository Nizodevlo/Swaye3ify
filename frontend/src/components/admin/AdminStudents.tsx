
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, BookOpen, Calendar, DollarSign } from "lucide-react";

const AdminStudents = () => {
  const students = [
    {
      id: 1,
      name: "Ahmed Benali",
      email: "ahmed.benali@student.com",
      phone: "+212 6 12 34 56 78",
      enrolledCourses: 3,
      totalSpent: 2400,
      joinDate: "2024-01-15",
      status: "Active",
      lastActivity: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Fatima Alaoui",
      email: "fatima.alaoui@student.com",
      phone: "+212 6 87 65 43 21",
      enrolledCourses: 2,
      totalSpent: 1600,
      joinDate: "2024-02-20",
      status: "Active",
      lastActivity: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Omar Kettani",
      email: "omar.kettani@student.com",
      phone: "+212 6 11 22 33 44",
      enrolledCourses: 1,
      totalSpent: 800,
      joinDate: "2024-03-10",
      status: "Inactive",
      lastActivity: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Management</h1>
          <p className="text-gray-400">Manage student enrollments, track progress, and handle billing</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="space-y-4">
        {students.map((student) => (
          <Card key={student.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{student.name}</h3>
                      <Badge 
                        className={
                          student.status === "Active" 
                            ? "bg-green-900/50 text-green-400 border-green-700"
                            : "bg-gray-700 text-gray-300"
                        }
                      >
                        {student.status}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{student.email}</p>
                    <p className="text-gray-400 text-sm">{student.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-white font-semibold">{student.enrolledCourses}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Courses</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-white font-semibold">${student.totalSpent}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Total Spent</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-semibold text-xs">{student.lastActivity}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Last Active</p>
                    </div>
                  </div>

                  {/* Actions */}
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
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Joined: {new Date(student.joinDate).toLocaleDateString()}</span>
                  <div className="flex space-x-4">
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                      View Progress
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-xs">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">1,247</div>
            <p className="text-gray-400">Total Students</p>
            <p className="text-green-400 text-sm">+12% this month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1,089</div>
            <p className="text-gray-400">Active Students</p>
            <p className="text-blue-400 text-sm">87% retention rate</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">$89,240</div>
            <p className="text-gray-400">Total Revenue</p>
            <p className="text-green-400 text-sm">+18% this month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">2.4</div>
            <p className="text-gray-400">Avg Courses/Student</p>
            <p className="text-purple-400 text-sm">+0.3 from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStudents;
