import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import config from '../../config';
// প্রিজমার নিজস্ব ক্লায়েন্ট বাদ দিয়ে আমাদের তৈরি করা সেন্ট্রাল prisma ইনস্ট্যান্সটি ইম্পোর্ট করলাম
import { prisma } from '../../lib/prisma';

const registerUser = async (payload: any) => {
  const isUserExists = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (isUserExists) {
    throw new AppError(400, 'User already exists!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  
  // ইউজার ক্রিয়েট করার সাথে সাথে তার জন্য একটি প্রোফাইলও অটোমেটিক তৈরি হবে
  const result = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      role: payload.role || 'CUSTOMER',
      profile: {
        create: {}, // এটি ফাঁকা প্রোফাইল তৈরি করবে যা পরে আপডেট করা যাবে
      },
    },
  });

  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  
  if (!user || user.status === 'SUSPENDED') {
    throw new AppError(404, 'User not found or suspended!');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(400, 'Invalid credentials!');
  }

  // এখানে config.jwt_secret ব্যবহার করা হয়েছে, আপনার config ফাইলে নাম যা আছে তা নিশ্চিত করুন (যেমন: config.jwt_access_secret)
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_secret as string,
    { expiresIn: '1d' }
  );

  return { token };
};

// নতুন যুক্ত হওয়া /me এন্ডপয়েন্টের ডাটাবেজ কোয়েরি ফাংশন 👇
const getMeFromDB = async (email: string, role: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
      role,
    },
    include: {
      profile: true, // ইউজারের সাথে তার প্রোফাইলের তথ্যও একসাথে নিয়ে আসার জন্য
    },
  });

  if (!result) {
    throw new AppError(404, 'User not found!');
  }

  if (result.status === 'SUSPENDED') {
    throw new AppError(403, 'Your account is suspended!');
  }

  // সিকিউরিটির জন্য রেসপন্স থেকে পাসওয়ার্ড ফিল্ডটি বাদ দিয়ে দেওয়া হলো
  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

export const AuthService = { registerUser, loginUser, getMeFromDB };