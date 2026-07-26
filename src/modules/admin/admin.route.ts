import express from 'express';
import auth from '../../middlewares/auth.js';
import { AdminController } from './admin.controller.js';

const router = express.Router();

// ১. ডামি চেক রাউট
router.get('/', (req, res) => {
  res.json({ message: 'Admin route working' });
});

// ২. সব ইউজারের লিস্ট দেখা (GET /api/admin/users)
router.get(
  '/users',
  auth('Admin', 'ADMIN'),
  AdminController.getAllUsers
);

// ৩. ইউজারের রোল বা স্ট্যাটাস আপডেট করা (PATCH /api/admin/users/:id)
router.patch(
  '/users/:id',
  auth('Admin', 'ADMIN'),
  AdminController.updateUserRoleOrStatus
);

// ৪. সব গিয়ার লিস্ট দেখা (GET /api/admin/gear)
router.get(
  '/gear',
  auth('Admin', 'ADMIN'),
  AdminController.getAllGears
);

// 👈 ৫. সব রেন্টাল অর্ডারের লিস্ট দেখা (GET /api/admin/rentals)
router.get(
  '/rentals',
  auth('Admin', 'ADMIN'),
  AdminController.getAllRentals
);

export const AdminRoutes = router;