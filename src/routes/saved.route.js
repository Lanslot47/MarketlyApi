const express= require("express");
const router = express.Router()
const middleware = require("../middlewares/auth.middleware");
const saveController = require("../controller/saved.controller")

router.post("/save-listing/:savedId", middleware.protect, saveController.savedListing)
router.get("/fetch", middleware.protect, saveController.fetchSaved)

module.exports = router


// 11-31