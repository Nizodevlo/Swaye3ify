
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Star, Users, BookOpen, Award } from "lucide-react";

const AdminTutors = () => {
  const tutors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      email: "sarah.ahmed@tutors.com",
      subject: "Mathematics",
      experience: "8+ years",
      students: 125,
      courses: 8,
      rating: 4.9,
      status: "Active",
      verified: true,
      topRated: true,
      joinDate: "2020-01-15",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Prof. Hassan Alami",
      email: "hassan.alami@tutors.com",
      subject: "Physics",
      experience: "12+ years",
      students: 98,
      courses: 6,
      rating: 4.8,
      status: "Active",
      verified: true,
      topRated: false,
      joinDate: "2019-03-22",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ms. Fatima Benali",
      email: "fatima.benali@tutors.com",
      subject: "English Literature",
      experience: "6+ years",
      students: 87,
      courses: 5,
      rating: 4.9,
      status: "Inactive",
      verified: true,
      topRated: true,
      joinDate: "2021-06-10",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tutor Management</h1>
          <p className="text-gray-400">Manage tutors, track performance, and assign courses</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Tutor
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tutors..."
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
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tutors List */}
      <div className="space-y-4">
        {tutors.map((tutor) => (
          <Card key={tutor.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={tutor.image} 
                      alt={tutor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {tutor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {tutor.topRated && (
                      <div className="absolute -top-1 -right-1">
                        <Badge className="bg-purple-600 text-white text-xs px-1">TOP</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{tutor.name}</h3>
                      <Badge 
                        className={
                          tutor.status === "Active" 
                            ? "bg-green-900/50 text-green-400 border-green-700"
                            : "bg-gray-700 text-gray-300"
                        }
                      >
                        {tutor.status}
                      </Badge>
                    </div>
                    <p className="text-purple-400 font-medium">{tutor.subject}</p>
                    <p className="text-gray-400 text-sm">{tutor.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{tutor.rating}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Rating</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-semibold">{tutor.students}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Students</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <BookOpen className="w-4 h-4 text-green-400" />
                        <span className="text-white font-semibold">{tutor.courses}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Courses</p>
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
                  <span>Experience: {tutor.experience}</span>
                  <span>Joined: {new Date(tutor.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tutor Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Total Tutors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">56</div>
            <p className="text-gray-400 text-sm">+3 this month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Active Tutors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">42</div>
            <p className="text-gray-400 text-sm">75% active rate</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">4.8</div>
            <p className="text-gray-400 text-sm">Out of 5 stars</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Top Rated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-400">18</div>
            <p className="text-gray-400 text-sm">Premium tutors</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTutors;
