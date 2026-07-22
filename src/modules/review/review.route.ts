import express from 'express';
const router = express.Router();

// সাময়িকভাবে একটি ডামি রাউট রাখলাম যেন এরর না আসে
router.get('/', (req, res) => {
  res.json({ message: 'Review route working' });
});

export const ReviewRoutes = router;