import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Recommendations retrieved.', data: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ success: true, message: 'Recommendation created.', data: req.body });
});

export const recommendationRouter = router;
export default router;

