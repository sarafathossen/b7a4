import { Request, Response, NextFunction } from 'express';
import { RentalService } from './rental.service.js';
import httpStatus from 'http-status';

// ১. রেন্টাল অর্ডার তৈরি (Customer)
const createRentalOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as any).user?.id || (req as any).user?.userId;

    if (!customerId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Customer ID is required to place a rental order. Please ensure you are logged in.",
      });
    }

    const rentalData = {
      ...req.body,
      customerId,
    };

    const result = await RentalService.createRentalOrderIntoDB(rentalData);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental order placed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ২. ইউজারের নিজের সব অর্ডার দেখা (Customer)
const getUserRentals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = (req as any).user?.id || (req as any).user?.userId;

    if (!customerId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! User ID not found.",
      });
    }

    const result = await RentalService.getUserRentalsFromDB(customerId);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User rental orders fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ৩. নির্দিষ্ট রেন্টাল অর্ডারের ডিটেইলস দেখা
const getRentalDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await RentalService.getRentalDetailsFromDB(id);

    if (!result) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Rental order not found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental details fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ৪. প্রোভাইডারের অর্ডার দেখা (Provider)
const getProviderOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerId = (req as any).user?.id || (req as any).user?.userId;

    if (!providerId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! Provider ID not found.",
      });
    }

    const result = await RentalService.getProviderOrdersFromDB(providerId);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Provider incoming orders fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ৫. অর্ডারের স্ট্যাটাস আপডেট করা (Provider)
const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const providerId = (req as any).user?.id || (req as any).user?.userId;

    if (!providerId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized! Provider ID not found.",
      });
    }

    const result = await RentalService.updateOrderStatusInDB(id, status, providerId);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental order status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const RentalController = {
  createRentalOrder,
  getUserRentals,
  getRentalDetails,
  getProviderOrders,
  updateOrderStatus,
};