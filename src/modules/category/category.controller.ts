import { Request, Response, NextFunction } from "express";
import { CategoryServices } from "./category.service.js";
import httpStatus from "http-status";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryServices.createCategoryIntoDB(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    next(error); 
  }
};

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CategoryServices.getAllCategoriesFromDB();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryControllers = {
  createCategory,
  getAllCategories,
};