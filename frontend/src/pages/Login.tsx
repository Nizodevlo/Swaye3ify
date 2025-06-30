import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Mail, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">TutorHub</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access your dashboard</p>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Choose your preferred sign in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="border-gray-600 bg-white text-purple-500 hover:bg-black hover:text-white hover:border-purple-500 px-8 py-3 text-lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 bg-white text-purple-500 hover:bg-black hover:text-white hover:border-purple-500 px-8 py-3 text-lg"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <Tabs defaultValue="admin" className="w-full">
              {/* <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger
                  value="student"
                  className="text-white data-[state=active]:bg-purple-600"
                >
                  Student
                </TabsTrigger>
                <TabsTrigger
                  value="tutor"
                  className="text-white data-[state=active]:bg-purple-600"
                >
                  Tutor
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="text-white data-[state=active]:bg-purple-600"
                >
                  Admin
                </TabsTrigger>
              </TabsList> 

              <TabsContent value="student" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="student@example.com"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Sign In as Student
                </Button>
              </TabsContent>*/}

              <TabsContent value="tutor" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="tutor-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="tutor-email"
                    placeholder="tutor@example.com"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tutor-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="tutor-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Link to="/tutor">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign In as Tutor
                  </Button>
                </Link>
              </TabsContent>

              <TabsContent value="" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="admin-email"
                    placeholder="admin@example.com"
                    type="email"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="admin-password"
                    type="password"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Link to="/admin">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Sign In as Admin
                  </Button>
                </Link>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <a href="#" className="text-sm text-purple-400 hover:underline">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-gray-400">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
