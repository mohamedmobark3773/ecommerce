import { asyncHandler } from "../../middlewares/asyncHandler.middleware.js";
import { searchService } from "./search.service.js";

export const search = asyncHandler(async (req, res) => {
  const result = await searchService.search(req.query);

  return res.status(200).json({
    success: true,
    message: "Search completed successfully.",
    data: result,
  });
});

