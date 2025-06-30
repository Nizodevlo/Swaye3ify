
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, MapPin, Users, Monitor, Wifi } from "lucide-react";

const AdminClassrooms = () => {
  const classrooms = [
    {
      id: 1,
      name: "Room A1",
      capacity: 15,
      type: "Standard Classroom",
      equipment: ["Projector", "Whiteboard", "WiFi", "Air Conditioning"],
      status: "Available",
      currentSession: null,
      location: "Building A, Floor 1",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Room B2",
      capacity: 12,
      type: "Standard Classroom",
      equipment: ["Projector", "Whiteboard", "WiFi"],
      status: "Occupied",
      currentSession: "Physics Fundamentals - Prof. Hassan Alami",
      location: "Building B, Floor 2",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Lab 1",
      capacity: 10,
      type: "Laboratory",
      equipment: ["Lab Equipment", "Safety Shower", "WiFi", "Ventilation"],
      status: "Maintenance",
      currentSession: null,
      location: "Building C, Floor 1",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Room C3",
      capacity: 20,
      type: "Large Classroom",
      equipment: ["Smart Board", "Audio System", "WiFi", "Air Conditioning"],
      status: "Available",
      currentSession: null,
      location: "Building C, Floor 3",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=300&fit=crop"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-900/50 text-green-400 border-green-700";
      case "Occupied":
        return "bg-red-900/50 text-red-400 border-red-700";
      case "Maintenance":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-700";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getEquipmentIcon = (equipment: string) => {
    switch (equipment.toLowerCase()) {
      case "projector":
      case "smart board":
        return <Monitor className="w-4 h-4" />;
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-gray-600 rounded-full" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Classroom Management</h1>
          <p className="text-gray-400">Manage classroom availability, equipment, and bookings</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Classroom
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search classrooms..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="standard">Standard Classroom</SelectItem>
                <SelectItem value="laboratory">Laboratory</SelectItem>
                <SelectItem value="large">Large Classroom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Classrooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((classroom) => (
          <Card key={classroom.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
            <div className="relative">
              <img 
                src={classroom.image} 
                alt={classroom.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getStatusColor(classroom.status)}>
                  {classroom.status}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                  {classroom.type}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{classroom.name}</h3>
              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{classroom.location}</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">Capacity:</span>
                  </div>
                  <span className="text-white font-medium">{classroom.capacity} students</span>
                </div>
                
                {classroom.currentSession && (
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Current Session:</p>
                    <p className="text-white font-medium text-sm">{classroom.currentSession}</p>
                  </div>
                )}
              </div>
              
              {/* Equipment */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Available Equipment:</p>
                <div className="flex flex-wrap gap-2">
                  {classroom.equipment.map((item, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded text-xs">
                      {getEquipmentIcon(item)}
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  className={
                    classroom.status === "Available" 
                      ? "bg-purple-600 hover:bg-purple-700" 
                      : "bg-gray-600 hover:bg-gray-700"
                  }
                  disabled={classroom.status !== "Available"}
                >
                  {classroom.status === "Available" ? "Book Now" : "Unavailable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Classroom Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Total Classrooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">12</div>
            <p className="text-gray-400 text-sm">Across 3 buildings</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Available Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">8</div>
            <p className="text-gray-400 text-sm">67% availability</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Utilization Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">78%</div>
            <p className="text-gray-400 text-sm">Average daily usage</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">2</div>
            <p className="text-gray-400 text-sm">Under maintenance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminClassrooms;
