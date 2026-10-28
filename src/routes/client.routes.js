const app = require("express");
const { optionalAuth } = require("../middlewares/auth.middleware");
const { getDiscoverDashboardStats } = require("../controller/client.controller");
const router = app.Router();


router.get("/get", optionalAuth, getDiscoverDashboardStats)
module.exports = router;
