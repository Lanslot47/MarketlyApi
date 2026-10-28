const saveServices = require("../services/saved.services");
const Listing = require("../models/Listing")
const likedItems = require("../models/Liked")
const mongoose = require("mongoose")
exports.savedListing = async (req, res) => {
    try {
        const listingId = req.params.savedId.trim();
        console.log(listingId)
        // const id = listingId.trim()
        if (!mongoose.Types.ObjectId.isValid(listingId)) {
            res.status(400).json({ message: "Invalid Idformat" })
        }
        const listing = await saveServices.saveListing(req.user._id, listingId)
        if (listing) {
            res.status(200).json({
                succes: true,
                message: "Listing saved succesfully",
                listing
            })
        }
        else {
        
            res.status(400).json({
                success: false,
                message: "Listing not found"
            })
        }

    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

exports.fetchSaved = async (req, res) => {
    try {
        const user = await likedItems.findOne({ user: req.user._id })
        if (user) {
                const listing = await Listing.findById(user.listing)
            res.status(200).json({
                success: true,
                message: "fetched",
                listing
            })
        }
    
        else {
            res.status(400).json({
                message: "error"
            })
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
        console.log(error)
    }
}