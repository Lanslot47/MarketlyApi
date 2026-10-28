const app = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { getProducerDashboardStats, getUsers, fetchListing } = require("../controller/producer.controller");
const router = app.Router();

router.get("/get", protect, getProducerDashboardStats)
router.get("/fetch", protect, fetchListing)
router.get("/",getUsers)
module.exports = router