const User = require("../models/User");
const bcrypt = require("bcrypt"); // or argon2 if you're using argon2
const generateToken = require("../utilis/generateToken");

// ================= REGISTER =================

const registerUser = async (data) => {
  const { fullName, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      whatsapp: user.whatsapp,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    },
  };
};

// ================= LOGIN =================

const loginUser = async ({ email, password }) => {
  // Check email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      whatsapp: user.whatsapp,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};