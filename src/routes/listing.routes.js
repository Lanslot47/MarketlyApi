const app = require("express");
const middleware = require("../middlewares/auth.middleware");
const { createListingController, getListings, updateListing, deleteListing, geProducersListing, getListingById } = require("../controller/listing.controller");
const upload = require("../middlewares/upload.middleware");
const router = app.Router();

router.post("/create-listing", middleware.protect, upload.array("images", 5), createListingController);
router.get("/", middleware.optionalAuth, getListings);
router.get("/get-producer", middleware.protect, geProducersListing);
router.put("/:id", middleware.protect, updateListing);
router.get("/get-listing/:id", middleware.protect, getListingById)
router.delete("/:id", middleware.protect, deleteListing);

module.exports = router;