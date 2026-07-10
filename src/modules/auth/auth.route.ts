import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth'; // আপনার প্রজেক্টের auth middleware এখানে ইম্পোর্ট করুন

const router = express.Router();

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthController.register
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);

// নতুন যুক্ত হওয়া /me এন্ডপয়েন্ট 👇
router.get(
  '/me',
  auth('CUSTOMER', 'PROVIDER', 'ADMIN'), // এই ৩টি রোলের যে কেউই তার প্রোফাইল দেখতে পারবে
  AuthController.getMe
);

export const AuthRoutes = router;