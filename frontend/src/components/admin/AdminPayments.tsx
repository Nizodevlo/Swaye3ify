
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, DollarSign, CreditCard, TrendingUp, Clock } from "lucide-react";

const AdminPayments = () => {
  const payments = [
    {
      id: 1,
      student: "Ahmed Benali",
      course: "Advanced Mathematics",
      amount: 800,
      method: "Credit Card",
      status: "Completed",
      date: "2024-01-15",
      transactionId: "TXN001234"
    },
    {
      id: 2,
      student: "Fatima Alaoui",
      course: "Physics Fundamentals",
      amount: 600,
      method: "Bank Transfer",
      status: "Pending",
      date: "2024-01-14",
      transactionId: "TXN001235"
    },
    {
      id: 3,
      student: "Omar Kettani",
      course: "English Literature",
      amount: 500,
      method: "Cash",
      status: "Completed",
      date: "2024-01-13",
      transactionId: "TXN001236"
    },
    {
      id: 4,
      student: "Saida Bennani",
      course: "Chemistry Basics",
      amount: 700,
      method: "Credit Card",
      status: "Failed",
      date: "2024-01-12",
      transactionId: "TXN001237"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-900/50 text-green-400 border-green-700";
      case "Pending":
        return "bg-yellow-900/50 text-yellow-400 border-yellow-700";
      case "Failed":
        return "bg-red-900/50 text-red-400 border-red-700";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="w-4 h-4" />;
      case "Bank Transfer":
        return <DollarSign className="w-4 h-4" />;
      default:
        return <div className="w-4 h-4 bg-gray-600 rounded-full" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payment Management</h1>
          <p className="text-gray-400">Track payments, process refunds, and manage billing</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <DollarSign className="w-4 h-4 mr-2" />
            New Payment
          </Button>
        </div>
      </div>

      {/* Payment Statistics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                <div className="flex items-center space-x-2 mt-1">
                  <h3 className="text-2xl font-bold text-white">$89,240</h3>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700">
                    +18%
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800 text-green-500">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">This Month</p>
                <div className="flex items-center space-x-2 mt-1">
                  <h3 className="text-2xl font-bold text-white">$12,480</h3>
                  <Badge className="bg-blue-900/50 text-blue-400 border-blue-700">
                    +12%
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800 text-blue-500">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Pending</p>
                <div className="flex items-center space-x-2 mt-1">
                  <h3 className="text-2xl font-bold text-white">$2,600</h3>
                  <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-700">
                    4 payments
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800 text-yellow-500">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Success Rate</p>
                <div className="flex items-center space-x-2 mt-1">
                  <h3 className="text-2xl font-bold text-white">94.2%</h3>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700">
                    +2.1%
                  </Badge>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800 text-purple-500">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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

      {/* Payments Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {payment.student.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{payment.student}</h4>
                    <p className="text-gray-400 text-sm">{payment.course}</p>
                    <p className="text-gray-500 text-xs">ID: {payment.transactionId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-white font-semibold">${payment.amount}</div>
                    <div className="flex items-center space-x-1 text-gray-400 text-xs">
                      {getMethodIcon(payment.method)}
                      <span>{payment.method}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                    <p className="text-gray-400 text-xs mt-1">{payment.date}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      View
                    </Button>
                    {payment.status === "Failed" && (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
