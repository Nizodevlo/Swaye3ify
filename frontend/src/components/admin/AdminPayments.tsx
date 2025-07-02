// app/admin/payments/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus, Edit, Trash2 } from "lucide-react";
import { PaymentStats } from "./paymentCompos/PaymentStats";
import { PaymentFilters } from "./paymentCompos/PaymentFilters";
import { PaymentDialog, PaymentFormValues } from "./paymentCompos/PaymentDialog"; // IMPORT PaymentFormValues
import {
  usePaiements,
  usePaiementActions,
  usePaiementLoading,
  usePaiementError,
} from "@/stores/paymentStore"; // Ensure this path is correct
import { useInscriptionActions } from "@/stores/inscriptionStore"; // Make sure this store exists and has addInscription
import { useEffect, useState } from "react";
import { IPaiment, EPaiementStatus, EPaiementMethod, IPaimentResponse } from "@/types/paymentTypes"; // Ensure this path is correct
import { IInscription } from "@/types/inscriptionTypes"; // Ensure this path is correct
import { toast } from "sonner";

// Basic PaymentItem component (replace with your actual one)
interface PaymentItemProps {
  payment: IPaimentResponse;
  onEdit: (payment: IPaimentResponse) => void;
  onDelete: (paymentId: string) => void;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ payment, onEdit, onDelete }) => (
  <Card key={payment._id} className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-colors">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">Amount: ${payment.amount}</h3>
            <p className="text-gray-400 text-sm">Status: <span className={`font-semibold ${
              payment.status === EPaiementStatus.completed ? 'text-green-500' :
              payment.status === EPaiementStatus.pending ? 'text-yellow-500' :
              payment.status === EPaiementStatus.failed ? 'text-red-500' : 'text-gray-500'
            }`}>{payment.status}</span></p>
            <p className="text-gray-400 text-sm">Method: {payment.method}</p>
            <p className="text-gray-400 text-sm">Inscription ID: {payment.inscription}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-800"
            onClick={() => onEdit(payment)}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-900/20"
            onClick={() => onDelete(payment._id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface PaymentListProps {
  payments: IPaimentResponse[];
  onEdit: (payment: IPaimentResponse) => void;
  onDelete: (paymentId: string) => void;
  loading: boolean;
  error: string | null;
}

const PaymentList: React.FC<PaymentListProps> = ({ payments, onEdit, onDelete, loading, error }) => {
  if (loading) {
    return <p className="text-white text-center">Loading payments...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }
  if (payments.length === 0) {
    return <p className="text-gray-400 text-center">No payments found.</p>;
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <PaymentItem key={payment._id} payment={payment} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};


export default function AdminPayments() {
  const payments = usePaiements();
  const { addPaiement, updatePaiement, deletePaiement, getAllPaiements } = usePaiementActions();
  const loadingPayments = usePaiementLoading();
  const errorPayments = usePaiementError();

  const { addInscription } = useInscriptionActions(); // Ensure this action returns the new inscription data

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<IPaimentResponse | null>(null);

  useEffect(() => {
    // This calls the action from the Zustand store, which handles the API call
    getAllPaiements();
  }, [getAllPaiements]);

  // Use the imported PaymentFormValues type for 'data'
  const handlePaymentSubmit = async (data: PaymentFormValues) => {
    try {
      let finalInscriptionId = data.inscriptionId;

      if (!finalInscriptionId) {
        // If no inscriptionId is provided, it means we need to create a new inscription
        // Check for selected student, course, and date from the dialog's formData
        if (!data.studentId || !data.courseId || !data.dateInscription) {
          toast.error("Student, Course, and Inscription Date are required to create a new inscription.");
          return; // Stop execution if validation fails
        }

        const inscriptionData: IInscription = {
          student: data.studentId, // This will now be the actual _id from the selection
          cour: data.courseId,     // This will now be the actual _id from the selection
          dateInscription: data.dateInscription,
        };
        console.log("Attempting to create new inscription with data:", inscriptionData);

        // CAPTURE THE RETURN VALUE from addInscription
        await addInscription(inscriptionData);
        
      }

      // Ensure finalInscriptionId is valid before proceeding to create/update payment
      if (!finalInscriptionId) {
          toast.error("An inscription ID is required for the payment.");
          return;
      }

      const paymentToSave: IPaiment = {
        amount: data.amount,
        status: data.status,
        method: data.method,
        inscription: finalInscriptionId, // Use the new or existing inscription ID
      };

      if (currentPayment) {
        // Update existing payment
        await updatePaiement(paymentToSave, currentPayment._id);
        toast.success("Payment updated successfully!");
      } else {
        // Create new payment
        await addPaiement(paymentToSave);
        toast.success("Payment added successfully!");
      }
      setIsDialogOpen(false);
      setCurrentPayment(null);
    } catch (err: any) {
      console.error("Payment operation failed:", err);
      toast.error(`Payment operation failed: ${err.message || "Unknown error"}`);
    }
  };

  const handleAddNewPayment = () => {
    setCurrentPayment(null);
    setIsDialogOpen(true);
  };

  const handleEditPayment = (payment: IPaimentResponse) => {
    setCurrentPayment(payment);
    setIsDialogOpen(true);
  };

  const handleDeletePayment = async (paymentId: string) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await deletePaiement(paymentId);
        toast.success("Payment deleted successfully!");
      } catch (err: any) {
        console.error("Delete failed:", err);
        toast.error(`Delete failed: ${err.message || "Unknown error"}`);
      }
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
          <Button
            variant="outline"
            className="border-gray-600 text-white hover:bg-blue-500 hover:text-white duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <PaymentDialog
            onSubmit={handlePaymentSubmit}
            initialData={currentPayment}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <Button
              onClick={handleAddNewPayment}
              variant="outline"
              className="inline-flex border-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 hover:text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> New Payment
            </Button>
          </PaymentDialog>
        </div>
      </div>

      <PaymentStats />
      <PaymentFilters />

      <PaymentList
        payments={payments}
        onEdit={handleEditPayment}
        onDelete={handleDeletePayment}
        loading={loadingPayments}
        error={errorPayments}
      />
    </div>
  );
}