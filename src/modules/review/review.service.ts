import { prisma } from '../../lib/prisma.js'; 

const createReviewIntoDB = async (payload: any) => {
  const gearItemId = payload.gearItemId || payload.gearId;
  const { customerId, rating, comment } = payload;

  if (!gearItemId) {
    throw new Error('Gear ID is required to post a review.');
  }

  if (!customerId) {
    throw new Error('Customer ID is required.');
  }

  const gearItem = await prisma.gearItem.findUnique({
    where: { id: gearItemId },
  });

  if (!gearItem) {
    throw new Error('Gear item not found!');
  }

  const result = await prisma.review.create({
    data: {
      rating: Number(rating),
      comment,
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
        },
      },
      gearItem: true,
    },
  });

  return result;
};

const getGearReviewsFromDB = async (gearItemId: string) => {
  return await prisma.review.findMany({
    where: { gearItemId },
    include: {
      customer: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const ReviewService = {
  createReviewIntoDB,
  getGearReviewsFromDB,
};