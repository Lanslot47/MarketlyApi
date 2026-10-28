const Listing = require("../models/Listing");
const User =require("../models/User");
const {getProducerStats} = require("../services/producer.services");
exports.getProducerDashboardStats = async (req, res) => {
  try {
    const stats = await getProducerStats(req.user._id);
    res.status(200).json({
      stat:stats,
      fullName:req.user.fullName
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUsers =async(req,res)=>{
  const users = await User.find()
  res.json({
    users
  })
}
exports.fetchListing = async (req, res) => {
  try {
    const listings = await Listing.find({ producer: req.user._id }).sort({
      createdAt: -1, // newest first
    });

    // Always respond, even when the producer has no listings yet
    res.status(200).json({
      success: true,
      message: "fetched successfully",
      listings, // an array (empty if none)
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};