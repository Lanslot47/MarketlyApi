const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");

const userController = require("../controller/user.controller");

// Update Role
router.patch(
  "/role",
  protect.protect,
  userController.updateRole
);

module.exports = router;