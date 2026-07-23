import express from 'express';
import { attributeRouter } from './attribute.routes.js';
import { checkoutRouter } from './checkout.routes.js';
import { collectionRouter } from './collection.routes.js';
import { giftCardRouter } from './giftCard.routes.js';
import { healthRouter } from './health.routes.js';
import { inventoryRouter } from './inventory.routes.js';
import { invoiceRouter } from './invoice.routes.js';
import { localizationRouter } from './localization.routes.js';
import { profileRouter } from './profile.routes.js';
import { recommendationRouter } from './recommendation.routes.js';
import { refundRouter } from './refund.routes.js';
import { settingsRouter } from './settings.routes.js';
import { subcategoryRouter } from './subcategory.routes.js';
import { subscriptionRouter } from './subscription.routes.js';
import { supportRouter } from './support.routes.js';
import { variantRouter } from './variant.routes.js';
import { walletRouter } from './wallet.routes.js';
import { webhookRouter } from './webhook.routes.js';

const router = express.Router();

router.use('/attributes', attributeRouter);
router.use('/checkout', checkoutRouter);
router.use('/collections', collectionRouter);
router.use('/gift-cards', giftCardRouter);
router.use('/health', healthRouter);
router.use('/inventory', inventoryRouter);
router.use('/invoices', invoiceRouter);
router.use('/localization', localizationRouter);
router.use('/profiles', profileRouter);
router.use('/recommendations', recommendationRouter);
router.use('/refunds', refundRouter);
router.use('/settings', settingsRouter);
router.use('/subcategories', subcategoryRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/support', supportRouter);
router.use('/variants', variantRouter);
router.use('/wallets', walletRouter);
router.use('/webhooks', webhookRouter);

export {
  attributeRouter,
  checkoutRouter,
  collectionRouter,
  giftCardRouter,
  healthRouter,
  inventoryRouter,
  invoiceRouter,
  localizationRouter,
  profileRouter,
  recommendationRouter,
  refundRouter,
  settingsRouter,
  subcategoryRouter,
  subscriptionRouter,
  supportRouter,
  variantRouter,
  walletRouter,
  webhookRouter,
};

export default router;

