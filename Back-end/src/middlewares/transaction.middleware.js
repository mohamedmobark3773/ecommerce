//src/middlewares/transaction.middleware.js

import asyncHandler from "./asyncHandler.middleware.js";

const transactionMiddleware = asyncHandler(async (req, res, next) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    try {

        req.session = session;

        next();

    } catch (error) {

        await session.abortTransaction();

        throw error;

    }

});

export default transactionMiddleware;
