import { Request, Response, NextFunction } from 'express';

import httpStatus from 'http-status';
import { ReviewService } from './review.service';

// নতুন রিভিউ ক্রিয়েট
const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as any).user?.id || (req as any).user?.userId;

    const payload = {
      ...req.body,
      customerId,
    };

    const result = await ReviewService.createReviewIntoDB(payload);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'Review created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// গিয়ারের সব রিভিউ পাওয়ার জন্য
const getGearReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gearId } = req.params;
    const result = await ReviewService.getGearReviewsFromDB(gearId);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Reviews fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ReviewController = {
  createReview,
  getGearReviews,
};