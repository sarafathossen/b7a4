import { prisma } from '../../lib/prisma.js';


 
const createRentalOrderIntoDB = async (payload: any) => {
  const { customerId, gearItemId, startDate, endDate } = payload;

  if (!customerId) {
    throw new Error("Customer ID is required to place a rental order.");
  }

  const gearItem = await prisma.gearItem.findUnique({
    where: { id: gearItemId },
  });

  if (!gearItem) {
    throw new Error("Gear item not found!");
  }

  if (!gearItem.isAvailable || gearItem.stock <= 0) {
    throw new Error("This gear item is currently unavailable or out of stock!");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    throw new Error("End date must be after the start date.");
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const totalPrice = diffDays * gearItem.pricePerDay;

  const result = await prisma.$transaction(async (tx) => {
    const rentalOrder = await tx.rentalOrder.create({
      data: {
        startDate: start,
        endDate: end,
        totalPrice: Number(totalPrice),
        status: 'PLACED',
        customer: {
          connect: { id: customerId },
        },
        gearItem: {
          connect: { id: gearItemId },
        },
      },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
          }
        },
        gearItem: true,
      },
    });

    await tx.gearItem.update({
      where: { id: gearItemId },
      data: {
        stock: {
          decrement: 1,
        },
      },
    });

    return rentalOrder;
  });

  return result;
};


const getUserRentalsFromDB = async (customerId: string) => {
  return await prisma.rentalOrder.findMany({
    where: { customerId },
    include: {
      gearItem: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};


const getRentalDetailsFromDB = async (id: string) => {
  return await prisma.rentalOrder.findUnique({
    where: { id },
    include: {
      customer: {
        select: {
          id: true,
          email: true,
        }
      },
      gearItem: true,
    },
  });
};


const getProviderOrdersFromDB = async (providerId: string) => {
  return await prisma.rentalOrder.findMany({
    where: {
      gearItem: {
        providerId: providerId,
      },
    },
    include: {
      customer: {
        select: {
          id: true,
          email: true,
        }
      },
      gearItem: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};


const updateOrderStatusInDB = async (id: string, status: any, providerId: string) => {
  const existingOrder = await prisma.rentalOrder.findUnique({
    where: { id },
    include: {
      gearItem: true,
    },
  });

  if (!existingOrder) {
    throw new Error("Rental order not found!");
  }

  if (existingOrder.gearItem.providerId !== providerId) {
    throw new Error("Unauthorized! You can only update status for your own gear orders.");
  }

  return await prisma.$transaction(async (tx) => {
    const updatedOrder = await tx.rentalOrder.update({
      where: { id },
      data: { status },
    });

    if (status === 'CANCELLED' || status === 'RETURNED') {
      await tx.gearItem.update({
        where: { id: existingOrder.gearItemId },
        data: {
          stock: {
            increment: 1,
          },
        },
      });
    }

    return updatedOrder;
  });
};

export const RentalService = {
  createRentalOrderIntoDB,
  getUserRentalsFromDB,
  getRentalDetailsFromDB,
  getProviderOrdersFromDB,
  updateOrderStatusInDB,
};