const userService = require("../services/user.services");

const updateRole = async (req, res) => {
  try {
    const user = await userService.updateRole(
      req.user._id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Role updated successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updateRole,
};