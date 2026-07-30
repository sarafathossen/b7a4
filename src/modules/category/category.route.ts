import express from "express";
import { CategoryControllers } from "./category.controller";


const router = express.Router();

// GET -> /api/categories
router.get("/", CategoryControllers.getAllCategories);

// POST -> /api/categories
router.post(
  "/",
  CategoryControllers.createCategory
);

export const CategoryRoutes = router;