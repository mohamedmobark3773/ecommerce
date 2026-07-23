import express from 'express';

const router = express.Router();

router.get('/languages', (req, res) => {
  res.status(200).json({ success: true, message: 'Languages retrieved.', data: [] });
});

router.get('/countries', (req, res) => {
  res.status(200).json({ success: true, message: 'Countries retrieved.', data: [] });
});

router.get('/currencies', (req, res) => {
  res.status(200).json({ success: true, message: 'Currencies retrieved.', data: [] });
});

export const localizationRouter = router;
export default router;

