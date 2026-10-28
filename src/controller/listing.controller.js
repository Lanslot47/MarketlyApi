const Listings = require("../services/listing.services");
const Listing = require("../models/Listing");

exports.createListingController = async (req, res) => {
  try {
    // multer's .array("images", 5) puts uploaded files on req.files (plural),
    // NOT req.file.images — req.file is only set by .single()
    const imagePaths = req.files.map((file) => ({
      url: file.path,
      publicId: file.filename
    }))

    const listingservices = await Listings.createListing(
      req.body,
      req.user._id,
      req.user.fullName,
      imagePaths,
      req.user.email,
      req.user.whatsapp
    );

    res.status(200).json({
      success: true,
      message: "listing created successfully",
      listingservices,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.geProducersListing = async (req, res) => {
  try {
    const listing = await Listing.find({ producer: req.user._id })
    res.status(200).json({
      success: true,
      listing: listing
    })
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
}

exports.getListings = async (req, res) => {
  try {
    const { search, listingType, mine, sort, limit } = req.query;

    if (mine === "true" && !req.user) {
      return res.status(401).json({ error: "Not signed in." });
    }

    const filter = Listings.buildListingFilter({
      search,
      listingType,
      adminId: mine === "true" ? req.user._id : undefined,
    });

    let query = Listing.find(filter);
    if (sort === "recent") query = query.sort({ createdAt: -1 });
    if (limit) query = query.limit(Number(limit));

    const listings = await query;
    res.json(listings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found." });
    if (listing.producer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only edit your own listings." });
    }

    const fields = ["title", "listingType", "price", "location", "description", "images", "status"];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) listing[field] = req.body[field];
    });

    await listing.save();
    res.status(204).json({
      listing: listing,
      success: true,
      message: "Listing Updated successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getListingById= async(req, res)=>{
  try{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
      res.status(404).json({
        success: false,
        message: "Listing not found"
      })
    }
    res.status(200).json({
      success: true,
      message: "Listing found successfully",
      listing
    })

  }
  catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

exports.deleteListing = async (req, res) => {
  try {

    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found." });
    // schema field is `producer`, not `admin`
    if (listing.producer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own listings." });
    }

    await listing.deleteOne();
    res.status(204).json({
      success: true,
      message: "Listing deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

