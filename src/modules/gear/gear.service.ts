import { prisma } from '../../lib/prisma.js';

const addGear = async (providerId: string, payload: any) => {
  const { name, description, pricePerDay, brand, stock, categoryId } = payload;

  return await prisma.gearItem.create({
    data: {
      name,
      description,
      pricePerDay: Number(pricePerDay),
      brand,
      stock: Number(stock),
      categoryId,
      providerId,
    },
  });
};

const getAllGear = async (filters: any) => {
  const { search, category, brand, minPrice, maxPrice } = filters;

  return await prisma.gearItem.findMany({
    where: {
      isAvailable: true, 
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        category ? { categoryId: category } : {},
        brand ? { brand: { contains: brand, mode: 'insensitive' } } : {},
        minPrice ? { pricePerDay: { gte: Number(minPrice) } } : {},
        maxPrice ? { pricePerDay: { lte: Number(maxPrice) } } : {},
      ],
    },
    include: {
      category: true,
      reviews: true,
    },
  });
};

const getGearById = async (id: string) => {
  return await prisma.gearItem.findUnique({
    where: { id },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        }
      }
    }
  });
};

const updateGear = async (id: string, providerId: string, payload: any) => {
  const existingGear = await prisma.gearItem.findFirst({
    where: { id, providerId },
  });

  if (!existingGear) {
    throw new Error('Gear item not found or you are not authorized');
  }

  const { name, description, pricePerDay, brand, stock, categoryId } = payload;

  return await prisma.gearItem.update({
    where: { id },
    data: {
      name,
      description,
      brand,
      categoryId,
      pricePerDay: pricePerDay ? Number(pricePerDay) : undefined,
      stock: stock ? Number(stock) : undefined,
    },
  });
};

const deleteGear = async (id: string, providerId: string) => {
  const existingGear = await prisma.gearItem.findFirst({
    where: { id, providerId },
  });

  if (!existingGear) {
    throw new Error('Gear item not found or you are not authorized');
  }

  return await prisma.gearItem.delete({
    where: { id },
  });
};

export const GearService = {
  addGear,
  getAllGear,
  getGearById,
  updateGear,
  deleteGear,
};