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
  Edit, // Keep Edit icon
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
import { Textarea } from "../ui/textarea"; // Assuming you might use this for description later
import { useEffect, useState } from "react";
import { useCourActions, useCours } from "@/stores/courStore";
import { getAllGrades } from "../../apis/gradeApis";
import { getAllSubjects } from "../../apis/subjectApis";

const AdminCourses = () => {
  const cours = useCours();
  const { getAllCours, addCour, updateCour, deleteCour } = useCourActions();

  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // State for adding a new course
  const [newCourse, setNewCourse] = useState({
    courName: "",
    teacher: "",
    grade: "",
    subject: "",
    prix: 0, // Initialize prix as a number
  });

  // State for the course currently being edited
  const [editingCourse, setEditingCourse] = useState(null);
  // State to control the visibility of the edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // States to display names instead of IDs in Select triggers for Add/Edit forms
  const [displayNewCourseGradeName, setDisplayNewCourseGradeName] = useState("");
  const [displayNewCourseSubjectName, setDisplayNewCourseSubjectName] = useState("");

  const [displayEditingCourseGradeName, setDisplayEditingCourseGradeName] = useState("");
  const [displayEditingCourseSubjectName, setDisplayEditingCourseSubjectName] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      // Fetch courses only if the store is empty on initial load
      if (!cours || cours.length === 0) {
        getAllCours();
      }

      // Fetch grades
      try {
        const fetchedGrades = await getAllGrades();
        if (fetchedGrades && fetchedGrades.grades) {
          setGrades(fetchedGrades.grades);
        } else {
          setGrades([]);
        }
      } catch (error) {
        console.error("Failed to fetch grades:", error);
        setGrades([]);
      }

      // Fetch subjects
      try {
        const fetchedSubjects = await getAllSubjects();
        if (fetchedSubjects && fetchedSubjects.subjects) {
          setSubjects(fetchedSubjects.subjects);
        } else {
          setSubjects([]);
        }
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setSubjects([]);
      }
    };

    fetchInitialData();
  }, [cours.length, getAllCours]);

  // Handler for input changes in both Add and Edit forms
  const handleInputChange = (e) => {
    const { name, value, type } = e.target; // Get type from event target

    // Convert value to number if the input type is "number"
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;

    if (editingCourse) {
      setEditingCourse((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    } else {
      setNewCourse((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    }
  };

  // Handler for select changes in both Add and Edit forms
  const handleSelectChange = (name, idValue) => {
    // Determine which state to update (newCourse or editingCourse)
    if (editingCourse) {
      setEditingCourse((prev) => ({
        ...prev,
        [name]: idValue,
      }));
      // Update display name for editing course
      if (name === "grade") {
        const selectedGrade = grades.find((g) => g._id === idValue);
        setDisplayEditingCourseGradeName(selectedGrade ? selectedGrade.gradeName : "");
      } else if (name === "subject") {
        const selectedSubject = subjects.find((s) => s._id === idValue);
        setDisplayEditingCourseSubjectName(selectedSubject ? selectedSubject.subjectName : "");
      }
    } else {
      setNewCourse((prev) => ({
        ...prev,
        [name]: idValue,
      }));
      // Update display name for new course
      if (name === "grade") {
        const selectedGrade = grades.find((g) => g._id === idValue);
        setDisplayNewCourseGradeName(selectedGrade ? selectedGrade.gradeName : "");
      } else if (name === "subject") {
        const selectedSubject = subjects.find((s) => s._id === idValue);
        setDisplayNewCourseSubjectName(selectedSubject ? selectedSubject.subjectName : "");
      }
    }
  };

  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    await addCour(newCourse);
    setNewCourse({
      courName: "",
      teacher: "",
      grade: "",
      subject: "",
      prix: 0,
    });
    setDisplayNewCourseGradeName("");
    setDisplayNewCourseSubjectName("");
    location.reload();
  };

  // Function to open the edit dialog and pre-populate data
  const handleEditClick = (course) => {
    setEditingCourse({ ...course }); // Create a copy to avoid direct state mutation
    const selectedGrade = grades.find((g) => g._id === course.grade);
    const selectedSubject = subjects.find((s) => s._id === course.subject);
    setDisplayEditingCourseGradeName(selectedGrade ? selectedGrade.gradeName : "");
    setDisplayEditingCourseSubjectName(selectedSubject ? selectedSubject.subjectName : "");
    setIsEditDialogOpen(true); // Open the dialog
  };

  // Function to handle the submission of the edited course
  const handleUpdateCourseSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse && editingCourse._id) {
      await updateCour(editingCourse, editingCourse._id); // Pass ID first, then updated data
      setIsEditDialogOpen(false); // Close the dialog after update
      setEditingCourse(null); // Clear editing state
      setDisplayEditingCourseGradeName(""); // Clear display names
      setDisplayEditingCourseSubjectName("");
    }
  };

  // --- NEW: Function to handle course deletion ---
  const handleDeleteClick = async (courId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCour(courId);
      location.reload();
    }
  };
  // --- END NEW ---

  const totalCourses = cours.length;
  const totalActiveEnrollments = 0; // Placeholder
  const totalCourseRevenue = cours.reduce(
    (sum, course) => sum + (course.prix || 0),
    0
  );

  return (
    <div className="p-8 space-y-8">
      ---
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Course Management
          </h1>
          <p className="text-gray-400">
            Manage all courses, assign teachers, and track enrollment
          </p>
        </div>
        {/* Add New Course Dialog Trigger */}
        <Dialog>
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
            <form onSubmit={handleAddCourseSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="courName">Course Name</Label>
                  <Input
                    id="courName"
                    name="courName"
                    placeholder="Course name"
                    className="bg-gray-800 placeholder:text-white outline-none"
                    value={newCourse.courName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="teacher">Teacher</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("teacher", value)
                    }
                    value={newCourse.teacher}
                  >
                    <SelectTrigger
                      id="teacher"
                      className="w-full bg-gray-800 border-gray-700 text-white"
                    >
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                      {/* You'll likely fetch actual teachers here */}
                      <SelectItem
                        value="Teacher 1"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Teacher 1
                      </SelectItem>
                      <SelectItem
                        value="Teacher 2"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Teacher 2
                      </SelectItem>
                      <SelectItem
                        value="Teacher 3"
                        className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                      >
                        Teacher 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="grade">Grade</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("grade", value)
                    }
                    value={newCourse.grade}
                  >
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a level">
                        {displayNewCourseGradeName || "Select a level"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                      {grades.map((grade) => (
                        <SelectItem
                          key={grade._id}
                          value={grade._id}
                          className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                        >
                          {grade.gradeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("subject", value)
                    }
                    value={newCourse.subject}
                  >
                    <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select a subject">
                        {displayNewCourseSubjectName || "Select a subject"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                      {subjects.map((subject) => (
                        <SelectItem
                          key={subject._id}
                          value={subject._id}
                          className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                        >
                          {subject.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="prix">Prix</Label>
                  <Input
                    id="prix"
                    name="prix"
                    type="number" // Set type to "number"
                    placeholder="Course prix"
                    className="bg-gray-800 placeholder:text-white outline-none"
                    value={newCourse.prix}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      ---
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
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem
                  className="focus:bg-purple-500 focus:text-white"
                  value="all"
                >
                  All Grades
                </SelectItem>
                {grades.map((grade) => (
                  <SelectItem
                    key={grade._id}
                    className="focus:bg-purple-500 focus:text-white"
                    value={grade.gradeName}
                  >
                    {grade.gradeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      ---
      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cours.map((course) => (
          <Card
            key={course._id}
            className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors"
          >
            <div className="relative">
              <div className="absolute top-4 right-4">
                <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                  {grades.find((g) => g._id === course.grade)?.gradeName ||
                    course.grade}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {course.courName}
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Teacher:</span>{" "}
                  <span className="text-white font-medium">
                    {course.teacher}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-400">
                    <DollarSign className="w-4 h-4 mr-1" />${" "}
                    {course.prix ? course.prix.toFixed(2) : "0.00"}{" "}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {/* Edit Button with DialogTrigger */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-600 text-white bg-green-500 hover:bg-green-600 hover:text-black"
                      onClick={() => handleEditClick(course)} // Pass the course to be edited
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  {/* Edit Course Dialog Content */}
                  {editingCourse && ( // Render only if a course is being edited
                    <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
                      <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        <DialogDescription>
                          Make changes to the course here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateCourseSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-3">
                            <Label htmlFor="editCourName">Course Name</Label>
                            <Input
                              id="editCourName"
                              name="courName"
                              placeholder="Course name"
                              className="bg-gray-800 placeholder:text-white outline-none"
                              value={editingCourse.courName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="editTeacher">Teacher</Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("teacher", value)
                              }
                              value={editingCourse.teacher}
                            >
                              <SelectTrigger
                                id="editTeacher"
                                className="w-full bg-gray-800 border-gray-700 text-white"
                              >
                                <SelectValue placeholder="Select a teacher" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                                {/* You'll likely fetch actual teachers here */}
                                <SelectItem
                                  value="Teacher 1"
                                  className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                                >
                                  Teacher 1
                                </SelectItem>
                                <SelectItem
                                  value="Teacher 2"
                                  className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                                >
                                  Teacher 2
                                </SelectItem>
                                <SelectItem
                                  value="Teacher 3"
                                  className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                                >
                                  Teacher 3
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="editGrade">Grade</Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("grade", value)
                              }
                              value={editingCourse.grade}
                            >
                              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select a level">
                                  {displayEditingCourseGradeName || "Select a level"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                                {grades.map((grade) => (
                                  <SelectItem
                                    key={grade._id}
                                    value={grade._id}
                                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                                  >
                                    {grade.gradeName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="editSubject">Subject</Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("subject", value)
                              }
                              value={editingCourse.subject}
                            >
                              <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select a subject">
                                  {displayEditingCourseSubjectName || "Select a subject"}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                                {subjects.map((subject) => (
                                  <SelectItem
                                    key={subject._id}
                                    value={subject._id}
                                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                                  >
                                    {subject.subjectName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="editPrix">Prix</Label>
                            <Input
                              id="editPrix"
                              name="prix"
                              type="number" // Set type to "number"
                              placeholder="Course prix"
                              className="bg-gray-800 placeholder:text-white outline-none"
                              value={editingCourse.prix}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <DialogFooter className="mt-4">
                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsEditDialogOpen(false);
                                setEditingCourse(null); // Clear editing state on cancel
                                setDisplayEditingCourseGradeName("");
                                setDisplayEditingCourseSubjectName("");
                              }}
                            >
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  )}
                </Dialog>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDeleteClick(course._id)} // --- NEW: Call handleDeleteClick with course ID ---
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      ---
      {/* Course Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">
              {totalCourses}
            </div>
            <p className="text-gray-400 text-sm">Overall count</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Active Enrollments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              {totalActiveEnrollments}
            </div>{" "}
            <p className="text-gray-400 text-sm">Data pending integration</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Course Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">
              ${totalCourseRevenue.toFixed(2)}
            </div>{" "}
            <p className="text-gray-400 text-sm">
              Calculated from course prix
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCourses;