import { Request, Response, NextFunction } from 'express';
import { GearService } from './gear.service';

const addGear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerId = req.user?.id;
    const result = await GearService.addGear(providerId, req.body);
    res.status(201).json({ success: true, message: 'Gear added successfully', data: result });
  } catch (error) { next(error); }
};

const getAllGear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await GearService.getAllGear(req.query);
    res.status(200).json({ success: true, message: 'Gears fetched successfully', data: result });
  } catch (error) { next(error); }
};

export const GearController = { addGear, getAllGear };