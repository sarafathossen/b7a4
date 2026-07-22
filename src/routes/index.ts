import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route.js';
import { GearRoutes } from '../modules/gear/gear.route.js';
import { CategoryRoutes } from '../modules/category/category.route.js';
import { RentalRoutes, ProviderOrderRoutes } from '../modules/rental/rental.route.js';
import { PaymentRoutes } from '../modules/payment/payment.route.js';
import { ReviewRoutes } from '../modules/review/review.route.js';
import { AdminRoutes } from '../modules/admin/admin.route.js';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes, // /api/auth/...
  },
  {
    path: '/gear',
    route: GearRoutes, // /api/gear
  },
  {
    path: '/categories',
    route: CategoryRoutes, // /api/categories
  },
  {
    path: '/rentals',
    route: RentalRoutes, // /api/rentals
  },
  {
    path: '/provider',
    route: ProviderOrderRoutes, // /api/provider/orders
  },
  {
    path: '/payments',
    route: PaymentRoutes, // /api/payments
  },
  {
    path: '/reviews',
    route: ReviewRoutes, // /api/reviews
  },
  {
    path: '/admin',
    route: AdminRoutes, // /api/admin
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;