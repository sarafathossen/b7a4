import express from 'express';
import { PaymentController } from './payment.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

// POST /api/payments/create (অথবা /api/payments/create-intent)
router.post(
  '/create',
  auth('Customer', 'CUSTOMER'), // কাস্টমার এক্সেসের জন্য মিডলওয়্যার
  PaymentController.createPaymentIntent
);

export const PaymentRoutes = router;