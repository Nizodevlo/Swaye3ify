// components/sessions/SessionStats.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Today's Sessions",
    value: "8",
    description: "3 completed, 5 scheduled",
    color: "text-purple-400",
  },
  {
    title: "Weekly Sessions",
    value: "45",
    description: "+8% from last week",
    color: "text-blue-400",
  },
  {
    title: "Attendance Rate",
    value: "92%",
    description: "Average attendance",
    color: "text-green-400",
  },
  {
    title: "Session Hours",
    value: "156",
    description: "Total hours this week",
    color: "text-yellow-400",
  },
];

export const SessionStats = () => {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <p className="text-gray-400 text-sm">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
