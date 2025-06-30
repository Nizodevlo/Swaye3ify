// components/sessions/SessionDialog.tsx
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";

type SessionDialogProps = {
  mode?: "create" | "edit";
  sessionData?: {
    title: string;
    tutor: string;
    startTime: string;
    endTime: string;
    classroom: string;
  };
  children: React.ReactNode;
  onSubmit: (data: {
    title: string;
    tutor: string;
    startTime: string;
    endTime: string;
    classroom: string;
  }) => void;
};

export const SessionDialog = ({
  mode = "create",
  sessionData,
  children,
  onSubmit,
}: SessionDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    onSubmit({
      title: formData.get("title") as string,
      tutor: formData.get("tutor") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      classroom: formData.get("classroom") as string,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Session" : "Edit Session"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Session title"
                defaultValue={sessionData?.title}
                className="bg-gray-800 placeholder:text-white outline-none"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="tutor">Tutor</Label>
              <Select name="tutor" defaultValue={sessionData?.tutor}>
                <SelectTrigger
                  id="tutor"
                  className="w-full bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Select a tutor" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  <SelectItem
                    value="tutor-1"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Tutor 1
                  </SelectItem>
                  <SelectItem
                    value="tutor-2"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Tutor 2
                  </SelectItem>
                  <SelectItem
                    value="tutor-3"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Tutor 3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between align-items gap-3">
              <div className="startTime">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  type="datetime-local"
                  id="startTime"
                  name="startTime"
                  defaultValue={sessionData?.startTime}
                  className="bg-gray-800 placeholder:text-white outline-none"
                />
              </div>
              <div className="endTime">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  type="datetime-local"
                  id="endTime"
                  name="endTime"
                  defaultValue={sessionData?.endTime}
                  className="bg-gray-800 placeholder:text-white outline-none"
                />
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="classroom">Classroom</Label>
              <Select name="classroom" defaultValue={sessionData?.classroom}>
                <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a classroom" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  <SelectItem
                    value="classroom-a1"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Classroom A1
                  </SelectItem>
                  <SelectItem
                    value="classroom-a2"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Classroom A2
                  </SelectItem>
                  <SelectItem
                    value="classroom-b1"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Classroom B1
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="text-black hover:bg-red-500 border hover:border-red-500 duration-300 hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-purple-500 duration-300 hover:bg-purple-700"
            >
              {mode === "create" ? "Create Session" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
