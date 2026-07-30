import express from 'express';
import auth from '../../middlewares/auth.js'; 
import { GearController } from './gear.controller.js';

const router = express.Router();


router.get('/gear', GearController.getAllGear);


router.get('/gear/:id', GearController.getGearById);



router.post('/provider/gear', auth('PROVIDER'), GearController.addGear);


router.put('/provider/gear/:id', auth('PROVIDER'), GearController.updateGear);


router.delete('/provider/gear/:id', auth('PROVIDER'), GearController.deleteGear);

export const GearRoutes = router;