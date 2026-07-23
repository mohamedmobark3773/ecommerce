// src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { categoriesRouter } from './modules/categories/index.js';
import { brandsRouter } from './modules/brands/index.js';
import { paymentsRouter } from './modules/payments/index.js';
import { productsRouter } from './modules/products/index.js';
import { reviewsRouter } from './modules/reviews/index.js';
import { searchRouter } from './modules/search/index.js';
import { attributeRouter } from './routes/attribute.routes.js';
import { sellersRouter } from './modules/seller/index.js';
import { shippingRouter } from './modules/shipping/index.js';
import { uploadsRouter } from './modules/uploads/index.js';
import { usersRouter } from './modules/users/index.js';
import { wishlistRouter } from './modules/wishlist/index.js';
import authRouter from './modules/auth/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Configure Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Root level health check & index endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ecommerce Backend API is running',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Global API Router prefix /api
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ecommerce Backend API is running',
  });
});

apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/brands', brandsRouter);
apiRouter.use('/attributes', attributeRouter);
apiRouter.use('/payments', paymentsRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/search', searchRouter);
apiRouter.use('/sellers', sellersRouter);
apiRouter.use('/shipping', shippingRouter);
apiRouter.use('/uploads', uploadsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/wishlist', wishlistRouter);
apiRouter.use('/auth', authRouter);

app.use('/api', apiRouter);

// 404 Route handler
app.use((req, res, next) => {
  const error = new Error(`Cannot find ${req.originalUrl} on this server`);
  error.status = 404;
  next(error);
});

// Centralized error-handling middleware
app.use(errorHandler);

export default app;
