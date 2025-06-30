// components/sessions/SessionTabs.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SessionCard } from "./SessionCard";

type Session = {
  id: number;
  course: string;
  tutor: string;
  time: string;
  room: string;
  students: number;
  maxStudents: number;
  status: string;
  duration: string;
  date?: string;
};

type SessionTabsProps = {
  activeTab: string;
  onTabChange: (value: string) => void;
  sessions: {
    today: Session[];
    upcoming: Session[];
    completed: Session[];
  };
};

export const SessionTabs = ({
  activeTab,
  onTabChange,
  sessions,
}: SessionTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-800">
        <TabsTrigger
          value="today"
          className="text-white data-[state=active]:bg-purple-600"
        >
          Today's Sessions
        </TabsTrigger>
        <TabsTrigger
          value="upcoming"
          className="text-white data-[state=active]:bg-purple-600"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="text-white data-[state=active]:bg-purple-600"
        >
          Completed
        </TabsTrigger>
      </TabsList>

      <TabsContent value="today" className="space-y-4 mt-6">
        {sessions.today.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </TabsContent>

      <TabsContent value="upcoming" className="space-y-4 mt-6">
        {sessions.upcoming.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4 mt-6">
        {sessions.completed.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </TabsContent>
    </Tabs>
  );
};
