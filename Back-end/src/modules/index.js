import { paymentsRouter, createPayment, getPayments, getPaymentById, updatePayment, deletePayment } from './payments/index.js';
import { productsRouter, createProduct, getProducts, getProductById, updateProduct, deleteProduct } from './products/index.js';
import { reviewsRouter, createReview, getReviews, getReviewById, updateReview, deleteReview } from './reviews/index.js';
import { searchRouter, search } from './search/index.js';
import { sellersRouter, createSeller, getSellers, getSellerById, updateSeller, deleteSeller } from './seller/index.js';
import { shippingRouter, createShipping, getShippingMethods, getShippingById, updateShipping, deleteShipping } from './shipping/index.js';
import { uploadsRouter, createUpload, getUploads, getUploadById, updateUpload, deleteUpload } from './uploads/index.js';
import { usersRouter, createUser, getUsers, getUserById, updateUser, deleteUser } from './users/index.js';
import { wishlistRouter, addToWishlist, getWishlist, removeFromWishlist } from './wishlist/index.js';

export {
  paymentsRouter,
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  productsRouter,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  reviewsRouter,
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  searchRouter,
  search,
  sellersRouter,
  createSeller,
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
  shippingRouter,
  createShipping,
  getShippingMethods,
  getShippingById,
  updateShipping,
  deleteShipping,
  uploadsRouter,
  createUpload,
  getUploads,
  getUploadById,
  updateUpload,
  deleteUpload,
  usersRouter,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  wishlistRouter,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};

export default {
  paymentsRouter,
  productsRouter,
  reviewsRouter,
  searchRouter,
  sellersRouter,
  shippingRouter,
  uploadsRouter,
  usersRouter,
  wishlistRouter,
};

