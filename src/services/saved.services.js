const likedItems = require("../models/Liked")

exports.saveListing = async(user, listing)=>{
    // const use= user;
    // const listingId= id
    const listings= await likedItems.create({user:user, listing:listing})
    return listings
}

// exports.fetchSaved = async(listingId)=>{
//     const id = listingId
//     const listing = await Listing.findOne({producer: id})
//     return listing
// }
