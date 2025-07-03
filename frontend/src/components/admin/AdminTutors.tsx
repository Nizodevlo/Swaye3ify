// src/pages/AdminTutors.tsx
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
  Star,
  Users,
  BookOpen,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  useTutors,
  useTutorActions,
  useTutorLoading,
  useTutorError,
} from "@/stores/tutorStore";
import { ITutor, ITutorResponse } from "@/types/tutorTypes";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminTutors = () => {
  const tutors = useTutors();
  const { addTutor, editTutor, removeTutor, getAllTutors } = useTutorActions();
  const loading = useTutorLoading();
  const error = useTutorError();

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");

  // State for the Add/Edit Tutor Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTutor, setCurrentTutor] = useState<ITutorResponse | null>(null);
  const [formData, setFormData] = useState<ITutor>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    experience: "",
    status: "Active",
    verified: false,
    topRated: false,
  });

  useEffect(() => {
    getAllTutors();
  }, [getAllTutors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentTutor) {
        await editTutor(formData, currentTutor._id);
        toast.success("Tutor updated successfully!");
      } else {
        await addTutor(formData);
        toast.success("Tutor added successfully!");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error("Operation failed:", err);
      toast.error("Operation failed. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      experience: "",
      status: "Active",
      verified: false,
      topRated: false,
    });
    setCurrentTutor(null);
  };

  const handleAddNewTutor = () => {
    setCurrentTutor(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditTutor = async (tutor: ITutorResponse) => {
    setCurrentTutor(tutor);
    setFormData({
      firstName: tutor.firstName,
      lastName: tutor.lastName,
      email: tutor.email,
      phoneNumber: tutor.phoneNumber,
      subject: tutor.subject,
      experience: tutor.experience,
      status: tutor.status,
      verified: tutor.verified,
      topRated: tutor.topRated,
    });
    setIsDialogOpen(true);
    // await getAllTutors();
  };

  const handleDeleteTutor = async (tutorId: string) => {
    if (window.confirm("Are you sure you want to delete this tutor?")) {
      try {
        await removeTutor(tutorId);
        toast.success("Tutor deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Delete failed. Please try again.");
      }
    }
  };

  // Filtered tutors based on search term and select filters
  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      tutor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || tutor.status === filterStatus;
    const matchesSubject =
      filterSubject === "all" || tutor.subject === filterSubject;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  // Available subjects for filter
  const subjects = Array.from(new Set(tutors.map((tutor) => tutor.subject)));

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Tutor Management
          </h1>
          <p className="text-gray-400">
            Manage tutors, track performance, and assign courses
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleAddNewTutor}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Tutor
        </Button>
      </div>

      {/* Add/Edit Tutor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {currentTutor ? "Edit Tutor" : "Add New Tutor"}
            </DialogTitle>
            <DialogDescription>
              {currentTutor
                ? "Make changes to tutor details here."
                : "Add a new tutor to your database."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="verified"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-600"
                />
                <Label htmlFor="verified">Verified</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="topRated"
                  name="topRated"
                  checked={formData.topRated}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-600"
                />
                <Label htmlFor="topRated">Top Rated</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
              >
                {currentTutor ? "Save Changes" : "Add Tutor"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tutors..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Loading and Error states */}
      {loading && <p className="text-white text-center">Loading tutors...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && !error && filteredTutors.length === 0 && (
        <p className="text-gray-400 text-center">No tutors found.</p>
      )}

      {/* Tutors List */}
      <div className="space-y-4">
        {filteredTutors.map((tutor) => (
          <Card
            key={tutor._id}
            className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {tutor.image ? (
                      <img
                        src={tutor.image}
                        alt={tutor.firstName + " " + tutor.lastName}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
                        {tutor.firstName.charAt(0)}
                        {tutor.lastName.charAt(0)}
                      </div>
                    )}
                    {tutor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {tutor.topRated && (
                      <div className="absolute -top-1 -right-1">
                        <Badge className="bg-purple-600 text-white text-xs px-1">
                          TOP
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white">
                        {tutor.firstName} {tutor.lastName}
                      </h3>
                      <Badge
                        className={
                          tutor.status === "Active"
                            ? "bg-green-900/50 text-green-400 border-green-700"
                            : tutor.status === "Pending"
                            ? "bg-yellow-900/50 text-yellow-400 border-yellow-700"
                            : "bg-gray-700 text-gray-300"
                        }
                      >
                        {tutor.status}
                      </Badge>
                    </div>
                    <p className="text-purple-400 font-medium">
                      {tutor.subject}
                    </p>
                    <p className="text-gray-400 text-sm">{tutor.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">
                          {tutor.rating || "N/A"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Rating</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-semibold">
                          {tutor.studentsCount || 0}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Students</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <BookOpen className="w-4 h-4 text-green-400" />
                        <span className="text-white font-semibold">
                          {tutor.coursesCount || 0}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Courses</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800"
                      onClick={() => handleEditTutor(tutor)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                      onClick={() => handleDeleteTutor(tutor._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Experience: {tutor.experience}</span>
                  <span>
                    Joined: {new Date(tutor.joinDate).toLocaleDateString()}
                  </span>
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
            <div className="text-3xl font-bold text-purple-400">
              {tutors.length}
            </div>
            <p className="text-gray-400 text-sm">
              +{Math.floor(tutors.length * 0.1)} this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Active Tutors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {tutors.filter((t) => t.status === "Active").length}
            </div>
            <p className="text-gray-400 text-sm">
              {Math.round(
                (tutors.filter((t) => t.status === "Active").length /
                  tutors.length) *
                  100
              )}
              % active rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              {tutors.length > 0
                ? (
                    tutors.reduce(
                      (sum, tutor) => sum + (tutor.rating || 0),
                      0
                    ) / tutors.length
                  ).toFixed(1)
                : "N/A"}
            </div>
            <p className="text-gray-400 text-sm">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Top Rated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-pink-400">
              {tutors.filter((t) => t.topRated).length}
            </div>
            <p className="text-gray-400 text-sm">Premium tutors</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminTutors;

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Plus, Search, Edit, Trash2, Star, Users, BookOpen, Award } from "lucide-react";

// const AdminTutors = () => {
//   const tutors = [
//     {
//       id: 1,
//       name: "Dr. Sarah Ahmed",
//       email: "sarah.ahmed@tutors.com",
//       subject: "Mathematics",
//       experience: "8+ years",
//       students: 125,
//       courses: 8,
//       rating: 4.9,
//       status: "Active",
//       verified: true,
//       topRated: true,
//       joinDate: "2020-01-15",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
//     },
//     {
//       id: 2,
//       name: "Prof. Hassan Alami",
//       email: "hassan.alami@tutors.com",
//       subject: "Physics",
//       experience: "12+ years",
//       students: 98,
//       courses: 6,
//       rating: 4.8,
//       status: "Active",
//       verified: true,
//       topRated: false,
//       joinDate: "2019-03-22",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
//     },
//     {
//       id: 3,
//       name: "Ms. Fatima Benali",
//       email: "fatima.benali@tutors.com",
//       subject: "English Literature",
//       experience: "6+ years",
//       students: 87,
//       courses: 5,
//       rating: 4.9,
//       status: "Inactive",
//       verified: true,
//       topRated: true,
//       joinDate: "2021-06-10",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
//     }
//   ];

//   return (
//     <div className="p-8 space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white mb-2">Tutor Management</h1>
//           <p className="text-gray-400">Manage tutors, track performance, and assign courses</p>
//         </div>
//         <Button className="bg-purple-600 hover:bg-purple-700">
//           <Plus className="w-4 h-4 mr-2" />
//           Add New Tutor
//         </Button>
//       </div>

//       {/* Filters */}
//       <Card className="bg-gray-900 border-gray-800">
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 placeholder="Search tutors..."
//                 className="pl-10 bg-gray-800 border-gray-700 text-white"
//               />
//             </div>
//             <Select>
//               <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-800 border-gray-700">
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="inactive">Inactive</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
//                 <SelectValue placeholder="Subject" />
//               </SelectTrigger>
//               <SelectContent className="bg-gray-800 border-gray-700">
//                 <SelectItem value="all">All Subjects</SelectItem>
//                 <SelectItem value="mathematics">Mathematics</SelectItem>
//                 <SelectItem value="physics">Physics</SelectItem>
//                 <SelectItem value="english">English</SelectItem>
//                 <SelectItem value="chemistry">Chemistry</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tutors List */}
//       <div className="space-y-4">
//         {tutors.map((tutor) => (
//           <Card key={tutor.id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="relative">
//                     <img
//                       src={tutor.image}
//                       alt={tutor.name}
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                     {tutor.verified && (
//                       <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                         <Award className="w-3 h-3 text-white" />
//                       </div>
//                     )}
//                     {tutor.topRated && (
//                       <div className="absolute -top-1 -right-1">
//                         <Badge className="bg-purple-600 text-white text-xs px-1">TOP</Badge>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex-1">
//                     <div className="flex items-center space-x-2 mb-1">
//                       <h3 className="text-xl font-bold text-white">{tutor.name}</h3>
//                       <Badge
//                         className={
//                           tutor.status === "Active"
//                             ? "bg-green-900/50 text-green-400 border-green-700"
//                             : "bg-gray-700 text-gray-300"
//                         }
//                       >
//                         {tutor.status}
//                       </Badge>
//                     </div>
//                     <p className="text-purple-400 font-medium">{tutor.subject}</p>
//                     <p className="text-gray-400 text-sm">{tutor.email}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center space-x-8">
//                   {/* Stats */}
//                   <div className="grid grid-cols-3 gap-6 text-center">
//                     <div>
//                       <div className="flex items-center justify-center space-x-1 mb-1">
//                         <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                         <span className="text-white font-semibold">{tutor.rating}</span>
//                       </div>
//                       <p className="text-gray-400 text-sm">Rating</p>
//                     </div>
//                     <div>
//                       <div className="flex items-center justify-center space-x-1 mb-1">
//                         <Users className="w-4 h-4 text-blue-400" />
//                         <span className="text-white font-semibold">{tutor.students}</span>
//                       </div>
//                       <p className="text-gray-400 text-sm">Students</p>
//                     </div>
//                     <div>
//                       <div className="flex items-center justify-center space-x-1 mb-1">
//                         <BookOpen className="w-4 h-4 text-green-400" />
//                         <span className="text-white font-semibold">{tutor.courses}</span>
//                       </div>
//                       <p className="text-gray-400 text-sm">Courses</p>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex space-x-2">
//                     <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
//                       <Edit className="w-4 h-4 mr-1" />
//                       Edit
//                     </Button>
//                     <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20">
//                       <Trash2 className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Info */}
//               <div className="mt-4 pt-4 border-t border-gray-800">
//                 <div className="flex items-center justify-between text-sm text-gray-400">
//                   <span>Experience: {tutor.experience}</span>
//                   <span>Joined: {new Date(tutor.joinDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Tutor Statistics */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <Card className="bg-gray-900 border-gray-800">
//           <CardHeader>
//             <CardTitle className="text-white text-lg">Total Tutors</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-purple-400">56</div>
//             <p className="text-gray-400 text-sm">+3 this month</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-900 border-gray-800">
//           <CardHeader>
//             <CardTitle className="text-white text-lg">Active Tutors</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-green-400">42</div>
//             <p className="text-gray-400 text-sm">75% active rate</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-900 border-gray-800">
//           <CardHeader>
//             <CardTitle className="text-white text-lg">Average Rating</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-yellow-400">4.8</div>
//             <p className="text-gray-400 text-sm">Out of 5 stars</p>
//           </CardContent>
//         </Card>

//         <Card className="bg-gray-900 border-gray-800">
//           <CardHeader>
//             <CardTitle className="text-white text-lg">Top Rated</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-pink-400">18</div>
//             <p className="text-gray-400 text-sm">Premium tutors</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminTutors;
