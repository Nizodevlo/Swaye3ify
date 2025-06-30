// components/sessions/SessionFilters.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export const SessionFilters = () => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search sessions..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
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
          <Select>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Tutor" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Tutors</SelectItem>
              <SelectItem value="sarah">Dr. Sarah Ahmed</SelectItem>
              <SelectItem value="hassan">Prof. Hassan Alami</SelectItem>
              <SelectItem value="fatima">Ms. Fatima Benali</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
