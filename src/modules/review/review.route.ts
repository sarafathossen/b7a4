import express from 'express';

import auth from '../../middlewares/auth.js';
import { ReviewController } from './review.controller.js';

const router = express.Router();

// ১. নতুন রিভিউ তৈরি করা (POST /api/reviews)
router.post(
  '/',
  auth('Customer', 'CUSTOMER'), // শুধুমাত্র কাস্টমারদের জন্য
  ReviewController.createReview
);

// ২. নির্দিষ্ট গিয়ারের রিভিউ তালিকা দেখা (GET /api/reviews/:gearId)
router.get(
  '/:gearId',
  ReviewController.getGearReviews
);

export const ReviewRoutes = router;