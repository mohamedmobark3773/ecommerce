import { Router } from "express";
import { search } from "./search.controller.js";
import { searchValidator } from "./search.validator.js";
import { validate } from "../../validators/base.validator.js";

const router = Router();

router.get("/", searchValidator, validate, search);

export default router;

