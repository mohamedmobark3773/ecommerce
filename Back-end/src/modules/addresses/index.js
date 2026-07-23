import addressesRouter from "./addresses.routes.js";
import { Address } from "./addresses.model.js";
import { addressesRepository } from "./addresses.repository.js";
import { addressesService } from "./addresses.service.js";
import { AddressDTO } from "./addresses.dto.js";
import * as addressesController from "./addresses.controller.js";
import * as addressesValidator from "./addresses.validator.js";

export {
  addressesRouter as default,
  addressesRouter,
  Address,
  addressesRepository,
  addressesService,
  AddressDTO,
  addressesController,
  addressesValidator,
};
