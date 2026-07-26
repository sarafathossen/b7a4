import { Request, Response, NextFunction } from 'express';
import { PaymentService } from './payment.service.js';

const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as any).user?.id || (req as any).user?.userId;

    const payload = {
      ...req.body,
      customerId,
    };

    const result = await PaymentService.createPaymentIntentIntoDB(payload);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Payment intent created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const PaymentController = {
  createPaymentIntent,
};