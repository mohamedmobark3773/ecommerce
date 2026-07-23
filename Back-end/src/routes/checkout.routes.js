import express from 'express';
import { validate } from '../validators/base.validator.js';
import {
  createCheckoutValidator,
  getAllCheckoutsValidator,
  getCheckoutByIdValidator,
} from '../validators/checkout.validator.js';

const router = express.Router();

router.post('/initiate', createCheckoutValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Checkout initiated.', data: req.body });
});

router.post('/confirm', createCheckoutValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Checkout confirmed.', data: req.body });
});

router.get('/', getAllCheckoutsValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Checkouts retrieved.', data: req.query });
});

router.get('/:id', getCheckoutByIdValidator, validate, (req, res) => {
  res.status(200).json({ success: true, message: 'Checkout retrieved.', data: { id: req.params.id } });
});

export const checkoutRouter = router;
export default router;

