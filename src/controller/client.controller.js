const {getDiscoverStats} = require("../services/client.services");
exports.getDiscoverDashboardStats = async (req, res) => {
  try {
    const username = req.user.fullName
    const stats = await getDiscoverStats(req.user?._id);
    
    res.status(200).json({
      stats: stats,
      name: username
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};