// components/payments/PaymentList.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";

type Payment = {
  id: number;
  student: string;
  course: string;
  amount: number;
  method: string;
  status: string;
  date: string;
  transactionId: string;
};

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

export const PaymentList = ({ payments }: { payments: Payment[] }) => {
  const handleEditPayment = (paymentData: any) => {
    console.log("Editing payment:", paymentData);
    // Implement your edit logic here
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {payment.student
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {payment.student}
                  </h4>
                  <p className="text-gray-400 text-sm">{payment.course}</p>
                  <p className="text-gray-500 text-xs">
                    ID: {payment.transactionId}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-white font-semibold">
                    DH {payment.amount}
                  </div>
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
                  <PaymentDialog
                    mode="edit"
                    paymentData={{
                      student: payment.student,
                      course: payment.course,
                      amount: payment.amount,
                      method: payment.method,
                    }}
                    onSubmit={handleEditPayment}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:border-blue-500 hover:text-white text-black bg-white hover:bg-blue-500"
                    >
                      View
                    </Button>
                  </PaymentDialog>
                  {payment.status === "Failed" && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
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
  );
};
