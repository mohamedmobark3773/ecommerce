import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, status: 'UP', timestamp: new Date().toISOString() });
});

router.get('/status', (req, res) => {
  res.status(200).json({ success: true, status: 'UP', uptime: process.uptime() });
});

export const healthRouter = router;
export default router;

