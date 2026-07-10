import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { GearRoutes } from '../modules/gear/gear.route';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/', route: GearRoutes },
  { path: '/', route: PaymentRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;