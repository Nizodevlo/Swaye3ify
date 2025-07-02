import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useStudents, useStudentActions, useStudentLoading, useStudentError } from "@/stores/studentStore";
import { IStudent, IStudentResponse } from "@/types/studentTypes";

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
import { getAllGrades } from "@/apis/gradeApis";
import { IGrade } from "@/types/gradeTypes";

const AdminStudents = () => {
  const students = useStudents();
  const { addStudent, editStudent, removeStudent, getAllStudents } = useStudentActions();
  const loadingStudents = useStudentLoading();
  const errorStudents = useStudentError();

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");

  // State for fetching grades
  const [grades, setGrades] = useState<IGrade[]>([]);
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [errorGrades, setErrorGrades] = useState<string | null>(null);

  // State for the Add/Edit Student Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<IStudentResponse | null>(null);
  const [formData, setFormData] = useState<IStudent>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    grade: "", // Initialize with an empty string
  });

  useEffect(() => {
    getAllStudents(); // Fetch students
    
    // Fetch grades
    const fetchGradesData = async () => {
      setLoadingGrades(true);
      setErrorGrades(null);
      try {
        const response = await getAllGrades(); // Get the full response object
        // Assuming response is an object like { grades: Array(12) }
        if (response && Array.isArray(response.grades)) {
          setGrades(response.grades); // Set the state to the actual array of grades
        } else {
            console.warn("API response for grades did not contain an array 'grades':", response);
            setErrorGrades("Invalid grades data received.");
        }
      } catch (err: any) {
        console.error("Failed to fetch grades:", err);
        setErrorGrades(err.message || "Failed to load grades.");
        toast.error("Failed to load grades.");
      } finally {
        setLoadingGrades(false);
      }
    };
    fetchGradesData();
  }, [getAllStudents]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.grade) { // Universal check for grade presence
        toast.error("Please select a grade.");
        return;
      }

      if (currentStudent) {
        await editStudent(formData, currentStudent._id);
        toast.success("Student updated successfully!");
      } else {
        await addStudent(formData);
        toast.success("Student added successfully!");
      }
      setIsDialogOpen(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        grade: "",
      });
      setCurrentStudent(null);
    } catch (err) {
      console.error("Operation failed:", err);
      toast.error("Operation failed. Please try again.");
    }
  };

  const handleAddNewStudent = () => {
    setCurrentStudent(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      grade: "", // Reset grade to empty string for new student
    });
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student: IStudentResponse) => {
    setCurrentStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      grade: student.grade, // Set current student's grade ID
    });
    setIsDialogOpen(true);
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await removeStudent(studentId);
        toast.success("Student deleted successfully!");
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Delete failed. Please try again.");
      }
    }
  };

  // Filtered students based on search term and select filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Student Management</h1>
          <p className="text-gray-400">Manage student enrollments, track progress, and handle billing</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddNewStudent}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>

        {/* Add/Edit Student Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>{currentStudent ? "Edit Student" : "Add New Student"}</DialogTitle>
              <DialogDescription>
                {currentStudent ? "Make changes to student details here." : "Add a new student to your database."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="col-span-3 bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="col-span-3 bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3 bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="col-span-3 bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Grade
                </Label>
                <Select
                  name="grade"
                  value={formData.grade}
                  onValueChange={(value) => handleSelectChange("grade", value)}
                  disabled={loadingGrades || errorGrades !== null}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder={loadingGrades ? "Loading Grades..." : errorGrades ? "Error loading grades" : "Select Grade"} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {loadingGrades ? (
                      <div className="py-2 px-4 text-sm text-gray-500">Loading grades...</div>
                    ) : errorGrades ? (
                      <div className="py-2 px-4 text-sm text-red-500">Error: {errorGrades}</div>
                    ) : grades.length > 0 ? (
                      grades.map((grade) => (
                        <SelectItem key={grade._id} value={grade._id}>
                          {grade.gradeName || "Unknown Grade"}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="py-2 px-4 text-sm text-gray-500">No grades available</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  {currentStudent ? "Save Changes" : "Add Student"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <hr className="border-gray-800" />

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search students..."
                className="pl-10 bg-gray-800 border-gray-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={filterGrade}
              onValueChange={setFilterGrade}
              disabled={loadingGrades || errorGrades !== null}
            >
              <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder={loadingGrades ? "Loading Grades..." : errorGrades ? "Error" : "Grade"} />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Grades</SelectItem>
                {loadingGrades ? (
                  <div className="py-2 px-4 text-sm text-gray-500">Loading grades...</div>
                ) : errorGrades ? (
                  <div className="py-2 px-4 text-sm text-red-500">Error: {errorGrades}</div>
                ) : grades.length > 0 ? (
                  grades.map((grade) => (
                    <SelectItem key={grade._id} value={grade._id}>
                      {grade.gradeName || "Unknown Grade"}
                    </SelectItem>
                  ))
                ) : (
                  <div className="py-2 px-4 text-sm text-gray-500">No grades available</div>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <hr className="border-gray-800" />

      {/* Loading and Error states for students list */}
      {loadingStudents && <p className="text-white text-center">Loading students...</p>}
      {errorStudents && <p className="text-red-500 text-center">Error: {errorStudents}</p>}
      {!loadingStudents && !errorStudents && filteredStudents.length === 0 && (
        <p className="text-gray-400 text-center">No students found.</p>
      )}

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student._id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl font-bold">
                    {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{student.firstName} {student.lastName}</h3>
                      <Badge className="bg-blue-900/50 text-blue-400 border-blue-700">
                        Grade: {grades.find(g => g._id === student.grade)?.gradeName || "N/A"}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{student.email}</p>
                    <p className="text-gray-400 text-sm">{student.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800"
                      onClick={() => handleEditStudent(student)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                      onClick={() => handleDeleteStudent(student._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div></div>
                  <div className="flex space-x-4">
                    {/* Placeholder for future actions */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <hr className="border-gray-800" />

      {/* Student Statistics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{students.length}</div>
            <p className="text-gray-400">Total Students</p>
            <p className="text-green-400 text-sm">+12% this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">N/A</div>
            <p className="text-gray-400">Total Revenue</p>
            <p className="text-blue-400 text-sm">Will integrate with Inscription Store</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStudents;