import express from 'express';
import { PaymentController } from './payment.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();


router.post(
  '/create',
  auth('Customer', 'CUSTOMER'), 
  PaymentController.createPaymentIntent
);

export const PaymentRoutes = router;