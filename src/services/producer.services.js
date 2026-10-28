const Listing = require("../models/Listing");
exports.getProducerStats = async (adminId) => {
    const [totalListings, products, services, listings] = await Promise.all([
        Listing.countDocuments({ producer: adminId }),
        Listing.countDocuments({ producer: adminId, listingType: "product" }),
        Listing.countDocuments({ producer: adminId, listingType: "services" }),
        Listing.find({ producer: adminId }).select("views"),
    ]);
    // const name = req.user.fullname

    const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);

    return { totalListings, products, services, totalViews };
};
