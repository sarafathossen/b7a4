import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service.js';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Users retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserRoleOrStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminService.updateUserRoleOrStatusInDB(id, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllGears = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllGearsFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'All gear listings retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 👈 অ্যাডমিনের জন্য সব রেন্টাল অর্ডারের লিস্ট পাওয়ার কন্ট্রোলার
const getAllRentals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminService.getAllRentalsFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'All rental orders retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllUsers,
  updateUserRoleOrStatus,
  getAllGears,
  getAllRentals, // 👈 এখানে যুক্ত করা হলো
};