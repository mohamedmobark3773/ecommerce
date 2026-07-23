//src/validators/attribute.validator.js

import { body, param, query } from "express-validator";


export const createAttributeValidator = [
  body("name")
    .notEmpty()
    .withMessage("Attribute name is required")
    .isString()
    .withMessage("Attribute name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Attribute name must be between 2 and 50 characters"),

  body("values")
    .optional()
    .isArray()
    .withMessage("Values must be an array"),

  body("values.*")
    .optional()
    .isString()
    .withMessage("Each value must be a string")
    .isLength({ min: 1 })
    .withMessage("Value cannot be empty"),
];


export const updateAttributeValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid attribute ID"),

  body("name")
    .optional()
    .isString()
    .withMessage("Attribute name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Attribute name must be between 2 and 50 characters"),

  body("values")
    .optional()
    .isArray()
    .withMessage("Values must be an array"),

  body("values.*")
    .optional()
    .isString()
    .withMessage("Each value must be a string"),
];


export const getAttributeValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid attribute ID"),
];


export const deleteAttributeValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid attribute ID"),
];


export const getAttributesValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a number greater than 0"),

  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a number greater than 0"),

  query("search")
    .optional()
    .isString()
    .withMessage("Search must be a string"),
];