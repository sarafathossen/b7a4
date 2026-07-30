import express from 'express';
import auth from '../../middlewares/auth.js'; 
import { GearController } from './gear.controller.js';

const router = express.Router();


router.get('/', GearController.getAllGear);

router.get('/:id', GearController.getGearById);



router.post(
  '/', 
  auth('PROVIDER', 'Provider', 'ADMIN', 'Admin'), 
  GearController.addGear
);


router.put(
  '/:id', 
  auth('PROVIDER', 'Provider', 'ADMIN', 'Admin'), 
  GearController.updateGear
);


router.delete(
  '/:id', 
  auth('PROVIDER', 'Provider', 'ADMIN', 'Admin'), 
  GearController.deleteGear
);

export const GearRoutes = router;