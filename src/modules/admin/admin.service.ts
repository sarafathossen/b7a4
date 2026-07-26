import { prisma } from '../../lib/prisma.js'; // আপনার প্রিজমা ক্লায়েন্ট পাথ

/**
 * অ্যাসাইনমেন্ট রিকোয়ারমেন্ট অনুযায়ী সব ইউজার ফেচ করার সার্ভিস
 */
const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      profile: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return users;
};

/**
 * ইউজারের রোল বা স্ট্যাটাস আপডেট করার সার্ভিস
 */
const updateUserRoleOrStatusInDB = async (id: string, payload: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id },
  });

  if (!isUserExist) {
    throw new Error('User not found!');
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      profile: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

/**
 * সব গিয়ার লিস্টিং ফেচ করার সার্ভিস
 */
const getAllGearsFromDB = async () => {
  const gears = await prisma.gearItem.findMany({
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          email: true,
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return gears;
};

/**
 * সব রেন্টাল অর্ডার ফেচ করার সার্ভিস
 */
const getAllRentalsFromDB = async () => {
  const rentals = await prisma.rentalOrder.findMany({
    include: {
      customer: {
        select: {
          id: true,
          email: true,
          profile: true,
        },
      },
      gearItem: true,
      payments: true, // 👈 আপনার স্কিমা অনুযায়ী 'payments' করা হলো
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return rentals;
};

export const AdminService = {
  getAllUsersFromDB,
  updateUserRoleOrStatusInDB,
  getAllGearsFromDB,
  getAllRentalsFromDB,
};