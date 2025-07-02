// src/app/admin/payments/paymentCompos/PaymentDialog.tsx

import React, { useState, useEffect, useId } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EPaiementMethod, EPaiementStatus, IPaimentResponse } from '@/types/paymentTypes';

// Import student and course types and hooks
import { useStudents, useStudentActions } from '@/stores/studentStore';
import { useCours, useCourActions } from '@/stores/courStore';
import { IStudentResponse } from '@/types/studentTypes';
import { ICourResponse } from '@/types/courTypes';


// Define the type for the data submitted by the dialog
export interface PaymentFormValues {
    amount: number;
    status: EPaiementStatus;
    method: EPaiementMethod;
    inscriptionId?: string; // Optional: for existing inscriptions
    studentId?: string; // Required if creating new inscription
    courseId?: string; // Required if creating new inscription
    dateInscription?: Date; // Required if creating new inscription
}

export interface PaymentDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSubmit: (data: PaymentFormValues) => Promise<void>;
    initialData?: IPaimentResponse | null;
    children?: React.ReactNode;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({
    isOpen,
    onOpenChange,
    onSubmit,
    initialData,
    children,
}) => {
    const [amount, setAmount] = useState(initialData?.amount || 0);
    const [status, setStatus] = useState<EPaiementStatus>(initialData?.status || EPaiementStatus.pending);
    const [method, setMethod] = useState<EPaiementMethod>(initialData?.method || EPaiementMethod.creditCard);
    const [inscriptionId, setInscriptionId] = useState(initialData?.inscription || '');

    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');

    const [dateInscription, setDateInscription] = useState<string>(
        initialData?.createdAt ? new Date(initialData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    );

    const students = useStudents();
    const { getAllStudents } = useStudentActions();
    const cours = useCours();
    const { getAllCours } = useCourActions();

    // Use useId for a unique ID for DialogDescription
    const descriptionId = useId();

    // FIX: Removed `students` and `cours` from the dependency array.
    // The `if (!students || students.length === 0)` check is sufficient
    // when `isOpen` changes. The actions themselves are stable.
    useEffect(() => {
        if (isOpen) {
            // Only fetch if data is not already present to avoid unnecessary calls
            // This check should ideally be within the store's action or a separate hook
            // that memoizes fetches, but for now, this condition helps.
            if (!students || students.length === 0) {
                getAllStudents();
            }
            if (!cours || cours.length === 0) {
                getAllCours();
            }
        }
    }, [isOpen, getAllStudents, getAllCours]); // Removed students, cours

    useEffect(() => {
        if (isOpen) { // Only reset when dialog is opened
            if (initialData) {
                setAmount(initialData.amount);
                setStatus(initialData.status);
                setMethod(initialData.method);
                setInscriptionId(initialData.inscription);
                setSelectedStudentId(''); // Reset for existing payments
                setSelectedCourseId('');  // Reset for existing payments
            } else {
                setAmount(0);
                setStatus(EPaiementStatus.pending);
                setMethod(EPaiementMethod.creditCard);
                setInscriptionId('');
                setSelectedStudentId('');
                setSelectedCourseId('');
                setDateInscription(new Date().toISOString().split('T')[0]);
            }
        }
    }, [isOpen, initialData]); // Added initialData to dependencies as it influences the state reset

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData: PaymentFormValues = {
            amount,
            status,
            method,
            inscriptionId: inscriptionId || undefined,
        };

        if (!inscriptionId) {
            formData.studentId = selectedStudentId;
            formData.courseId = selectedCourseId;
            formData.dateInscription = new Date(dateInscription);
        }

        await onSubmit(formData);
    };

    const dialogTitle = initialData ? "Edit Payment" : "Add New Payment";

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            {children}
            <DialogContent
                className="sm:max-w-[425px] bg-gray-900 text-white border-gray-700"
                aria-describedby={descriptionId}
            >
                <DialogHeader>
                    <DialogTitle className="text-white">{dialogTitle}</DialogTitle>
                    <DialogDescription id={descriptionId} className="text-gray-400">
                        {initialData ? "Edit the payment details." : "Fill in the details for the new payment, creating a new inscription if needed."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right text-gray-300">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="col-span-3 bg-gray-800 text-white border-gray-700"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right text-gray-300">Status</Label>
                        <Select onValueChange={(value: EPaiementStatus) => setStatus(value)} value={status}>
                            <SelectTrigger className="col-span-3 bg-gray-800 text-white border-gray-700">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                {Object.values(EPaiementStatus).map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="method" className="text-right text-gray-300">Method</Label>
                        <Select onValueChange={(value: EPaiementMethod) => setMethod(value)} value={method}>
                            <SelectTrigger className="col-span-3 bg-gray-800 text-white border-gray-700">
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                {Object.values(EPaiementMethod).map((m) => (
                                    <SelectItem key={m} value={m}>{m}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {!initialData && !inscriptionId && (
                        <>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="student" className="text-right text-gray-300">Student</Label>
                                <Select
                                    onValueChange={setSelectedStudentId}
                                    value={selectedStudentId}
                                    required={!initialData && !inscriptionId} // Make required only if creating new inscription
                                >
                                    <SelectTrigger className="col-span-3 bg-gray-800 text-white border-gray-700">
                                        <SelectValue placeholder={students.length > 0 ? "Select a student" : "Loading students..."} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700 max-h-48 overflow-y-auto">
                                        {students.length > 0 ? (
                                            students.map((student: IStudentResponse) => (
                                                <SelectItem key={student._id} value={student._id}>
                                                    {student.firstName} {student.lastName}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-students-placeholder" disabled>No students found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course" className="text-right text-gray-300">Course</Label>
                                <Select
                                    onValueChange={setSelectedCourseId}
                                    value={selectedCourseId}
                                    required={!initialData && !inscriptionId} // Make required only if creating new inscription
                                >
                                    <SelectTrigger className="col-span-3 bg-gray-800 text-white border-gray-700">
                                        <SelectValue placeholder={cours.length > 0 ? "Select a course" : "Loading courses..."} />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 text-white border-gray-700 max-h-48 overflow-y-auto">
                                        {cours.length > 0 ? (
                                            cours.map((cour: ICourResponse) => (
                                                <SelectItem key={cour._id} value={cour._id}>
                                                    {cour.courName}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-courses-placeholder" disabled>No courses found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dateInscription" className="text-right text-gray-300">Inscription Date</Label>
                                <Input
                                    id="dateInscription"
                                    type="date"
                                    value={dateInscription}
                                    onChange={(e) => setDateInscription(e.target.value)}
                                    className="col-span-3 bg-gray-800 text-white border-gray-700"
                                    required={!initialData && !inscriptionId} // Make required only if creating new inscription
                                />
                            </div>
                        </>
                    )}

                    {(initialData || inscriptionId) && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="inscriptionId" className="text-right text-gray-300">Inscription ID</Label>
                            <Input
                                id="inscriptionId"
                                value={inscriptionId}
                                onChange={(e) => setInscriptionId(e.target.value)}
                                className="col-span-3 bg-gray-800 text-white border-gray-700"
                                disabled={!!initialData} // This should be disabled only when editing an existing payment with an inscription.
                                required={initialData && !inscriptionId} // Required if editing and inscriptionId is somehow missing
                            />
                        </div>
                    )}

                    <DialogFooter>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                            {initialData ? "Save Changes" : "Add Payment"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};