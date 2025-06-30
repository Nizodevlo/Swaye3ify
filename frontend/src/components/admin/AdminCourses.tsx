import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const AdminCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      description:
        "Comprehensive mathematics course covering algebra, geometry, and calculus",
      tutor: "Dr. Sarah Ahmed",
      students: 25,
      duration: "12 weeks",
      price: 1200,
      status: "Active",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      description: "Introduction to basic physics concepts and principles",
      tutor: "Prof. Hassan Alami",
      students: 18,
      duration: "10 weeks",
      price: 900,
      status: "Active",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "English Literature",
      description: "Explore classic and contemporary literature",
      tutor: "Ms. Fatima Benali",
      students: 22,
      duration: "8 weeks",
      price: 800,
      status: "Draft",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Course Management
          </h1>
          <p className="text-gray-400">
            Manage all courses, assign tutors, and track enrollment
          </p>
        </div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex border-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-2" /> Add New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Title</Label>
                  <Input
                    id="name-1"
                    name="name"
                    placeholder="Course title"
                    className="bg-gray-800 placeholder:text-white outline-none"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Description</Label>
                  <Textarea
                    id="username-1"
                    name="username"
                    placeholder="Course description"
                    className="bg-gray-800 placeholder:text-white outline-none"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tutor">Tutor</Label>
                  <Select>
                    <SelectTrigger
                      id="tutor"
                      className="w-full bg-gray-800 border-gray-700 text-white"
                    >
                      <SelectValue placeholder="Select a tutor" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                      <SelectItem
                        value="tutor-1"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Tutor 1
                      </SelectItem>
                      <SelectItem
                        value="tutor-2"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Tutor 2
                      </SelectItem>
                      <SelectItem
                        value="tutor-3"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Tutor 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="schoolLevel">School Level</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                      <SelectItem
                        value="tronc"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Tronc commun
                      </SelectItem>
                      <SelectItem
                        value="1bac"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        1 BAC
                      </SelectItem>
                      <SelectItem
                        value="2bac"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        2 BAC
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                      <SelectItem
                        value="francais"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Francais
                      </SelectItem>
                      <SelectItem
                        value="english"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        English
                      </SelectItem>
                      <SelectItem
                        value="math"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Math
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Course title"
                    className="bg-gray-800 placeholder:text-white outline-none"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="all"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="active"
                >
                  Active
                </SelectItem>
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="draft"
                >
                  Draft
                </SelectItem>
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="archived"
                >
                  Archived
                </SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="all"
                >
                  All Levels
                </SelectItem>
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="beginner"
                >
                  Beginner
                </SelectItem>
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="intermediate"
                >
                  Intermediate
                </SelectItem>
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="advanced"
                >
                  Advanced
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge
                  className={
                    course.status === "Active"
                      ? "bg-green-900/50 text-green-400 border-green-700"
                      : "bg-gray-700 text-gray-300"
                  }
                >
                  {course.status}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                  {course.level}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-400 mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tutor:</span>
                  <span className="text-white font-medium">{course.tutor}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {course.price}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-gray-600 text-white bg-green-500 hover:text-black"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">89</div>
            <p className="text-gray-400 text-sm">+5 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Active Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">1,247</div>
            <p className="text-gray-400 text-sm">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Course Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">$47,382</div>
            <p className="text-gray-400 text-sm">+23% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCourses;
