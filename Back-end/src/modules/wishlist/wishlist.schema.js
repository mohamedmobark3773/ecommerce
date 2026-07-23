import Joi from "joi";

export const addToWishlistSchema = Joi.object({
  user: Joi.string().hex().length(24).required(),
  product: Joi.string().hex().length(24).required(),
});

