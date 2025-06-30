// components/payments/PaymentDialog.tsx
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
import { Plus } from "lucide-react";

type PaymentDialogProps = {
  mode?: "create" | "edit";
  paymentData?: {
    student: string;
    course: string;
    amount: number;
    method: string;
  };
  children: React.ReactNode;
  onSubmit: (data: {
    student: string;
    course: string;
    amount: number;
    method: string;
  }) => void;
};

export const PaymentDialog = ({
  mode = "create",
  paymentData,
  children,
  onSubmit,
}: PaymentDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    onSubmit({
      student: formData.get("student") as string,
      course: formData.get("course") as string,
      amount: Number(formData.get("amount")),
      method: formData.get("method") as string,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Payment" : "Edit Payment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="student">Student</Label>
              <Select name="student" defaultValue={paymentData?.student}>
                <SelectTrigger
                  id="student"
                  className="w-full bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  <SelectItem
                    value="student-1"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Student 1
                  </SelectItem>
                  <SelectItem
                    value="student-2"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Student 2
                  </SelectItem>
                  <SelectItem
                    value="student-3"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Student 3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="course">Course</Label>
              <Select name="course" defaultValue={paymentData?.course}>
                <SelectTrigger
                  id="course"
                  className="w-full bg-gray-800 border-gray-700 text-white"
                >
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                  <SelectItem
                    value="course-1"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Course 1
                  </SelectItem>
                  <SelectItem
                    value="course-2"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Course 2
                  </SelectItem>
                  <SelectItem
                    value="course-3"
                    className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                  >
                    Course 3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between align-items gap-3">
              <div className="amount w-1/2 grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="0.00MAD"
                  step={2}
                  defaultValue={paymentData?.amount}
                  className="bg-gray-800 placeholder:text-white outline-none"
                />
              </div>
              <div className="method w-1/2 grid gap-3">
                <Label htmlFor="method">Method</Label>
                <Select name="method" defaultValue={paymentData?.method}>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white w-full group data-[state=open]:bg-gray-800">
                    <SelectItem
                      value="cash"
                      className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    >
                      Cash
                    </SelectItem>
                    <SelectItem
                      value="creditCard"
                      className="hover:bg-purple-600 hover:text-white group-data-[state=open]:data-[state=checked]:bg-purple-800 group-data-[state=open]:data-[state=checked]:text-white data-[state=checked]:bg-purple-500 data-[state=checked]:text-white"
                    >
                      Credit Card
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              {mode === "create" ? "Create Payment" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
