import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service';

const createIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rentalOrderId } = req.body;
    const result = await PaymentService.createPaymentIntent(rentalOrderId);
    res.status(200).json({ success: true, message: 'Payment intent created', data: result });
  } catch (error) { next(error); }
};

const confirm = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PaymentService.confirmPayment(req.body);
    res.status(200).json({ success: true, message: 'Payment confirmed successfully', data: result });
  } catch (error) { next(error); }
};

export const PaymentController = { createIntent, confirm };