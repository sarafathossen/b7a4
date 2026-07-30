import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import config from '../../config';
import { prisma } from '../../lib/prisma';

const registerUser = async (payload: any) => {
  const isUserExists = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (isUserExists) {
    throw new AppError(400, 'User already exists!');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  
  const result = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      role: payload.role || 'CUSTOMER',
      profile: {
        create: {}, 
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

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_secret as string,
    { expiresIn: '1d' }
  );

  return { token };
};

const getMeFromDB = async (email: string, role: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
      role,
    },
    include: {
      profile: true, 
    },
  });

  if (!result) {
    throw new AppError(404, 'User not found!');
  }

  if (result.status === 'SUSPENDED') {
    throw new AppError(403, 'Your account is suspended!');
  }

  const { password, ...userWithoutPassword } = result;
  return userWithoutPassword;
};

export const AuthService = { registerUser, loginUser, getMeFromDB };