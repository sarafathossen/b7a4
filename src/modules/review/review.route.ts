import express from 'express';

import auth from '../../middlewares/auth.js';
import { ReviewController } from './review.controller.js';

const router = express.Router();

router.post(
  '/',
  auth('Customer', 'CUSTOMER'),
  ReviewController.createReview
);

router.get(
  '/:gearId',
  ReviewController.getGearReviews
);

export const ReviewRoutes = router;