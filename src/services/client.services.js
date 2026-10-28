const Listing = require("../models/Listing");
const likedItems = require("../models/Liked");
exports.getDiscoverStats = async (userId) => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [availableListings, newThisWeek] = await Promise.all([
        Listing.countDocuments({}),
        Listing.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
    ]);

    let savedItems = 0;
    if (userId) {
        
        savedItems = await likedItems.countDocuments({ user: userId });
    }

    return { availableListings, newThisWeek, savedItems };
};