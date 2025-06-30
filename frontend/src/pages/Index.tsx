import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  BookOpen,
  Users,
  Clock,
  MapPin,
  Award,
  ArrowRight,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const courses = [
    {
      id: 1,
      title: "Mathematics Fundamentals",
      description:
        "Master essential mathematical concepts from algebra to calculus",
      price: "$32",
      originalPrice: "$48",
      duration: "8 weeks",
      students: 250,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop",
      level: "Beginner",
    },
    {
      id: 2,
      title: "English Literature & Writing",
      description: "Develop advanced writing skills and literary analysis",
      price: "$28",
      originalPrice: "$42",
      duration: "10 weeks",
      students: 180,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Science & Physics",
      description: "Explore the wonders of physics and natural sciences",
      price: "$35",
      originalPrice: "$52",
      duration: "12 weeks",
      students: 320,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
      level: "Advanced",
    },
  ];

  const tutors = [
    {
      id: 1,
      name: "Dr. Sarah Ahmed",
      subject: "Mathematics",
      experience: "8+ years",
      students: 500,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      verified: true,
      topRated: true,
    },
    {
      id: 2,
      name: "Prof. Hassan Alami",
      subject: "Physics",
      experience: "12+ years",
      students: 750,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      verified: true,
      topRated: false,
    },
    {
      id: 3,
      name: "Ms. Fatima Benali",
      subject: "English Literature",
      experience: "6+ years",
      students: 400,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      verified: true,
      topRated: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TutorHub Morocco</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#courses"
                className="hover:text-purple-400 transition-colors"
              >
                Courses
              </a>
              <a
                href="#tutors"
                className="hover:text-purple-400 transition-colors"
              >
                Tutors
              </a>
              <a
                href="#about"
                className="hover:text-purple-400 transition-colors"
              >
                About
              </a>
              <Link to="/login">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-purple-900/50 text-purple-300 border-purple-700">
                  #1 Tutoring Center in Morocco
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Master Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {" "}
                    Learning{" "}
                  </span>
                  Journey
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Connect with Morocco's finest tutors and unlock your academic
                  potential. Personalized learning experiences that drive real
                  results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 bg-white text-purple-500 hover:bg-black hover:text-white hover:border-purple-500 px-8 py-6 text-lg"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-gray-400">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-gray-400">Expert Tutors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-6 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700 mb-4">
              Our Courses
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most sought-after courses designed to help you excel
              in your academic journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-black/70 rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {course.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{course.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-400">
                        {course.price}
                      </span>
                      <span className="text-gray-500 line-through">
                        {course.originalPrice}
                      </span>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section id="tutors" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-900/50 text-purple-300 border-purple-700 mb-4">
              Our Teachers
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Expert Tutors
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Learn from Morocco's most qualified and experienced educators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <Card
                key={tutor.id}
                className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                    {tutor.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {tutor.topRated && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-purple-600 text-white text-xs">
                          TOP
                        </Badge>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-1 text-white">
                    {tutor.name}
                  </h3>
                  <p className="text-purple-400 mb-2">{tutor.subject}</p>

                  <div className="flex items-center justify-center space-x-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">
                      {tutor.rating}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 mb-4">
                    <div>
                      <div className="font-medium text-white">
                        {tutor.experience}
                      </div>
                      <div>Experience</div>
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {tutor.students}+
                      </div>
                      <div>Students</div>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful students who have achieved their
              academic goals with our help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 bg-white text-purple-500 hover:bg-black hover:text-white hover:border-purple-500 px-8 py-6 text-lg"
              >
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TutorHub</span>
              </div>
              <p className="text-gray-400">
                Morocco's premier tutoring platform connecting students with
                expert educators.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Mathematics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Physics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    English
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Chemistry
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TutorHub Morocco. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
