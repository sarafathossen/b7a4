import express from 'express';
import auth from '../../middlewares/auth';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post('/payments/create', auth('CUSTOMER'), PaymentController.createIntent);
router.post('/payments/confirm', auth('CUSTOMER'), PaymentController.confirm);

export const PaymentRoutes = router;