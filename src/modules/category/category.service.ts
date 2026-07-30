import { prisma } from "../../lib/prisma.js";

const createCategoryIntoDB = async (payload: { name: string }) => {
  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

const getAllCategoriesFromDB = async () => {
  const result = await prisma.category.findMany({
    include: {
      _count: {
        select: { gearItems: true }, 
      },
    },
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};