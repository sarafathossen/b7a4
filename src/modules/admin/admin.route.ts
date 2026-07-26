import express from 'express';
import auth from '../../middlewares/auth.js';
import { AdminController } from './admin.controller.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.json({ message: 'Admin route working' });
});


router.get(
  '/users',
  auth('Admin', 'ADMIN'),
  AdminController.getAllUsers
);


router.patch(
  '/users/:id',
  auth('Admin', 'ADMIN'),
  AdminController.updateUserRoleOrStatus
);


router.get(
  '/gear',
  auth('Admin', 'ADMIN'),
  AdminController.getAllGears
);


router.get(
  '/rentals',
  auth('Admin', 'ADMIN'),
  AdminController.getAllRentals
);

export const AdminRoutes = router;