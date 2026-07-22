import { Request, Response, NextFunction } from 'express';
import { GearService } from './gear.service';

const addGear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerId = (req as any).user?.id; 
    const result = await GearService.addGear(providerId, req.body);
    
    res.status(201).json({ 
      success: true, 
      message: 'Gear added successfully', 
      data: result 
    });
  } catch (error) { 
    next(error); 
  }
};

const getAllGear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await GearService.getAllGear(req.query);
    
    res.status(200).json({ 
      success: true, 
      message: 'Gears fetched successfully', 
      data: result 
    });
  } catch (error) { 
    next(error); 
  }
};

const getGearById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await GearService.getGearById(id);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Gear item not found',
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Gear details fetched successfully', 
      data: result 
    });
  } catch (error) { 
    next(error); 
  }
};

const updateGear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const providerId = (req as any).user?.id;
    const result = await GearService.updateGear(id, providerId, req.body);
    
    res.status(200).json({ 
      success: true, 
      message: 'Gear updated successfully', 
      data: result 
    });
  } catch (error) { 
    next(error); 
  }
};

const deleteGear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const providerId = (req as any).user?.id;
    await GearService.deleteGear(id, providerId);
    
    res.status(200).json({ 
      success: true, 
      message: 'Gear removed from inventory successfully', 
      data: null
    });
  } catch (error) { 
    next(error); 
  }
};

export const GearController = { 
  addGear, 
  getAllGear,
  getGearById,
  updateGear,
  deleteGear
};