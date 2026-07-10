import express from "express";
import { CategoryControllers } from "./category.controller";


const router = express.Router();

// ১. সব ক্যাটাগরি দেখার রাউট (পাবলিক)
// GET -> /api/categories
router.get("/", CategoryControllers.getAllCategories);

// ২. নতুন ক্যাটাগরি তৈরি করার রাউট (শুধুমাত্র ADMIN এর জন্য প্রটেক্টেড)
// POST -> /api/categories
router.post(
  "/",
  // auth('ADMIN'), // তোমার তৈরি করা অথেনটিকেশন ও রোল চেকিং মিডলওয়্যার এখানে বসাবে
  // validateRequest(CategoryValidationSchema), // জোড (Zod) ভ্যালিডেশন মিডলওয়্যার এখানে বসাবে
  CategoryControllers.createCategory
);

export const CategoryRoutes = router;