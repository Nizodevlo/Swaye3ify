// components/payments/PaymentStats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Clock, CreditCard } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "DH 89,240",
    change: "+18%",
    icon: <DollarSign className="w-6 h-6" />,
    color: "text-green-500",
    badgeColor: "bg-green-900/50 text-green-400 border-green-700",
  },
  {
    title: "This Month",
    value: "DH 12,480",
    change: "+12%",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-blue-500",
    badgeColor: "bg-blue-900/50 text-blue-400 border-blue-700",
  },
  {
    title: "Pending",
    value: "DH 2,600",
    change: "4 payments",
    icon: <Clock className="w-6 h-6" />,
    color: "text-yellow-500",
    badgeColor: "bg-yellow-900/50 text-yellow-400 border-yellow-700",
  },
  {
    title: "Success Rate",
    value: "94.2%",
    change: "+2.1%",
    icon: <CreditCard className="w-6 h-6" />,
    color: "text-purple-500",
    badgeColor: "bg-green-900/50 text-green-400 border-green-700",
  },
];

export const PaymentStats = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">
                  {stat.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <h3 className="text-2xl font-bold text-white">
                    {stat.value}
                  </h3>
                  <Badge className={stat.badgeColor}>{stat.change}</Badge>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-gray-800 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
