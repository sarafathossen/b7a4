import express from 'express';
import auth from '../../middlewares/auth.js'; // আপনার পাথ অনুযায়ী .js বা সঠিক এক্সটেনশন দিন
import { GearController } from './gear.controller.js';

const router = express.Router();

// --- Public Routes (সবাই অ্যাক্সেস করতে পারবে) ---
// ১. সব গিয়ার দেখা -> GET /api/gear
router.get('/gear', GearController.getAllGear);

// ২. নির্দিষ্ট একটি গিয়ারের ডিটেইলস দেখা -> GET /api/gear/:id
router.get('/gear/:id', GearController.getGearById);


// --- Provider Routes (শুধুমাত্র PROVIDER রাউটগুলো ব্যবহার করতে পারবে) ---
// ৩. নতুন গিয়ার যুক্ত করা -> POST /api/provider/gear
router.post('/provider/gear', auth('PROVIDER'), GearController.addGear);

// ৪. গিয়ার আপডেট করা -> PUT /api/provider/gear/:id
router.put('/provider/gear/:id', auth('PROVIDER'), GearController.updateGear);

// ৫. গিয়ার ডিলিট করা -> DELETE /api/provider/gear/:id
router.delete('/provider/gear/:id', auth('PROVIDER'), GearController.deleteGear);

export const GearRoutes = router;