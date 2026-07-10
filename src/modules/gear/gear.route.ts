import express from 'express';
import auth from '../../middlewares/auth';
import { GearController } from './gear.controller';

const router = express.Router();

router.post('/provider/gear', auth('PROVIDER'), GearController.addGear);
router.get('/gear', GearController.getAllGear);

export const GearRoutes = router;