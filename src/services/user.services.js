const User = require("../models/User");

const updateRole = async (userId, data) => {
  const { role, whatsapp } = data;

  // Validate role
  if (!["client", "producer"].includes(role)) {
    throw new Error("Invalid role selected.");
  }

  const updateData = {
    role,
  };

  // Only save WhatsApp for producers
  if (role === "producer") {
    updateData.whatsapp = whatsapp || null;
  } else {
    updateData.whatsapp = null;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

module.exports = {
  updateRole,
};