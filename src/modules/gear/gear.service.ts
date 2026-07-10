import { PrismaClient } from '@prisma/client';
// gear.service.ts ফাইলে এটি পরিবর্তন করুন:
import { prisma } from '../../lib/prisma';


const addGear = async (providerId: string, payload: any) => {
  return await prisma.gearItem.create({
    data: { ...payload, providerId },
  });
};

const getAllGear = async (filters: any) => {
  const { search, category, brand } = filters;
  return await prisma.gearItem.findMany({
    where: {
      isAvailable: true,
      AND: [
        search ? { name: { contains: search, mode: 'insensitive' } } : {},
        category ? { categoryId: category } : {},
        brand ? { brand: { contains: brand, mode: 'insensitive' } } : {},
      ],
    },
    include: { category: true },
  });
};

export const GearService = { addGear, getAllGear };