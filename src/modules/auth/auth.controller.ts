import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.registerUser(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully', 
      data: result 
    });
  } catch (error) { 
    next(error); 
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);
    res.status(200).json({ 
      success: true, 
      message: 'User logged in successfully', 
      data: result 
    });
  } catch (error) { 
    next(error); 
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // আপনার auth middleware টোকেন ভেরিফাই করে ইউজার ইনফো req.user এ সেট করে রাখে
    const user = (req as any).user; 

    const result = await AuthService.getMeFromDB(user.email, user.role);

    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = { register, login, getMe };