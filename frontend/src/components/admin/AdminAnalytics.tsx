
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, BookOpen, DollarSign, Calendar, Star, Clock, Award } from "lucide-react";

const AdminAnalytics = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track performance, analyze trends, and monitor KPIs</p>
        </div>
        <Select>
          <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <h3 className="text-2xl font-bold text-white mt-1">$89,240</h3>
                <p className="text-green-400 text-sm mt-1">+18% from last month</p>
              </div>
              <div className="p-3 rounded-lg bg-green-900/20">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Students</p>
                <h3 className="text-2xl font-bold text-white mt-1">1,247</h3>
                <p className="text-blue-400 text-sm mt-1">+12% enrollment growth</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-900/20">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Course Completion</p>
                <h3 className="text-2xl font-bold text-white mt-1">94%</h3>
                <p className="text-purple-400 text-sm mt-1">+3% improvement</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-900/20">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg. Rating</p>
                <h3 className="text-2xl font-bold text-white mt-1">4.8</h3>
                <p className="text-yellow-400 text-sm mt-1">Excellent satisfaction</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-900/20">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[65, 78, 82, 95, 88, 92, 105, 98, 112, 125, 118, 140].map((height, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div 
                    className="bg-purple-600 rounded-t w-8 transition-all duration-300 hover:bg-purple-500"
                    style={{ height: `${height}px` }}
                  ></div>
                  <span className="text-gray-400 text-xs">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Enrollment */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Student Enrollment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Mathematics</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-white text-sm">324 students</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Physics</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-white text-sm">256 students</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">English</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-white text-sm">368 students</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Chemistry</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-white text-sm">189 students</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Biology</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-800 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  <span className="text-white text-sm">234 students</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Session Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Sessions</span>
              <span className="text-white font-bold">1,456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Avg. Duration</span>
              <span className="text-white font-bold">1.5 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Attendance Rate</span>
              <span className="text-green-400 font-bold">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">No-show Rate</span>
              <span className="text-red-400 font-bold">8%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Course Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Courses</span>
              <span className="text-white font-bold">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Avg. Completion</span>
              <span className="text-white font-bold">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Top Performer</span>
              <span className="text-purple-400 font-bold">Mathematics</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Course Rating</span>
              <span className="text-yellow-400 font-bold">4.8/5</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">New Students</span>
              <span className="text-green-400 font-bold">+24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Sessions Held</span>
              <span className="text-white font-bold">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Revenue</span>
              <span className="text-green-400 font-bold">$12,480</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Satisfaction</span>
              <span className="text-yellow-400 font-bold">4.9/5</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
