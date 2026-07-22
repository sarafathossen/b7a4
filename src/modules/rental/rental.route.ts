import express from 'express';
import { RentalController } from './rental.controller.js';
import auth from '../../middlewares/auth.js';

// --- ১. কাস্টমারের Rentals Router (Base: /api/rentals) ---
const rentalRouter = express.Router();

// নতুন রেন্টাল অর্ডার তৈরি করা
rentalRouter.post('/', auth('Customer', 'CUSTOMER'), RentalController.createRentalOrder);

// নিজের সব রেন্টাল অর্ডার দেখা
rentalRouter.get('/', auth('Customer', 'CUSTOMER'), RentalController.getUserRentals);

// নির্দিষ্ট অর্ডারের ডিটেইলস দেখা (ডাইনামিক রাউট সবার শেষে 🌟)
rentalRouter.get('/:id', auth('Customer', 'CUSTOMER', 'Admin', 'ADMIN'), RentalController.getRentalDetails);


// --- ২. প্রোভাইডারের Provider Orders Router (Base: /api/provider) ---
const providerOrderRouter = express.Router();

// প্রোভাইডারের কাছে আসা রেন্টাল অর্ডারগুলো দেখা -> GET /api/provider/orders
providerOrderRouter.get('/orders', auth('Provider', 'PROVIDER'), RentalController.getProviderOrders);

// অর্ডারের স্ট্যাটাস আপডেট করা -> PATCH /api/provider/orders/:id
providerOrderRouter.patch('/orders/:id', auth('Provider', 'PROVIDER'), RentalController.updateOrderStatus);


export const RentalRoutes = rentalRouter;
export const ProviderOrderRoutes = providerOrderRouter;