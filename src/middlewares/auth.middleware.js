const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Authorization: Bearer TOKEN
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
    });
    }

    // Verify Token
    const decoded = jwt.verify(token, "MARKETLYPROJECT");

    // Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error
    });
  }
};
exports.optionalAuth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    try {
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, "MARKETLYPROJECT");
      const user = await User.findById(decoded.id).select("-password");
      if (user) req.user = user;
    } catch (err) {
      // ignore bad token — just treat the request as a guest
    }
  }

  next();
};
// module.exports = protect;