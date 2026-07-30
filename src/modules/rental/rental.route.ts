import express from 'express';
import { RentalController } from './rental.controller.js';
import auth from '../../middlewares/auth.js';

const rentalRouter = express.Router();

rentalRouter.post('/', auth('Customer', 'CUSTOMER'), RentalController.createRentalOrder);

rentalRouter.get('/', auth('Customer', 'CUSTOMER'), RentalController.getUserRentals);

rentalRouter.get('/:id', auth('Customer', 'CUSTOMER', 'Admin', 'ADMIN'), RentalController.getRentalDetails);


const providerOrderRouter = express.Router();

providerOrderRouter.get('/orders', auth('Provider', 'PROVIDER'), RentalController.getProviderOrders);

providerOrderRouter.patch('/orders/:id', auth('Provider', 'PROVIDER'), RentalController.updateOrderStatus);


export const RentalRoutes = rentalRouter;
export const ProviderOrderRoutes = providerOrderRouter;