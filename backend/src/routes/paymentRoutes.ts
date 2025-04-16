import { Router } from 'express';
import {
  createPayment,
  deletePayment,
  getAllPayments,
  updatePayment,
  updatePaymentStatus,
} from '../controllers/paymentController';

const paymentRouter = Router();

paymentRouter.post('/', createPayment);
paymentRouter.put('/:paymentId', updatePayment);
paymentRouter.patch('/:paymentId', updatePaymentStatus);
paymentRouter.delete('/:paymentId', deletePayment);

paymentRouter.get('/', getAllPayments);

export default paymentRouter;
