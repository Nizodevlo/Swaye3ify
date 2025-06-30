// components/payments/PaymentFilters.tsx
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

export const PaymentFilters = () => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search payments..."
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="credit-card">Credit Card</SelectItem>
              <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
