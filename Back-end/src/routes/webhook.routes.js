import express from 'express';

const router = express.Router();

router.post('/:provider', (req, res) => {
  res.status(200).json({ success: true, message: 'Webhook received.', data: { provider: req.params.provider, body: req.body } });
});

router.get('/:provider', (req, res) => {
  res.status(200).json({ success: true, message: 'Webhook status retrieved.', data: { provider: req.params.provider } });
});

export const webhookRouter = router;
export default router;

