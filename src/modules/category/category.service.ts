import { prisma } from "../../lib/prisma.js";

// ১. নতুন ক্যাটাগরি তৈরি করা (শুধুমাত্র Admin এর জন্য)
const createCategoryIntoDB = async (payload: { name: string }) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

// ২. সব ক্যাটাগরি গেট করা (পাবলিক - সবাই দেখতে পারবে)
const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { gearItems: true }, // কোন ক্যাটাগরিতে কয়টা প্রোডাক্ট আছে তাও দেখা যাবে
      },
    },
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};