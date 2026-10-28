const Listing = require("../models/Listing")
exports.createListing = async (data, id, name, img, address, chat) => {
  const producer = id
  const seller = name
  const images = img
  const email = address
  const whatsapp = chat
  const { title, listingType, price, location, description, status } = data
  if (!title || !listingType || price === undefined) {
    throw new Error("listingType and price are required.");
  }
  if (!["product", "services"].includes(listingType)) {
    throw new Error("listingType must be 'product' or 'services'.");
  }
  const listing = await Listing.create({
    title,
    listingType,
    price,
    location,
    description,
    images,
    status,
    producer,
    seller,
    email,
    whatsapp
  });
  return listing
}
exports.buildListingFilter = ({ search, listingType, adminId }) => {
  const filter = {};

  if (adminId) filter.producer = adminId;

  if (listingType && listingType !== "all") {
    filter.listingType = listingType;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  return filter;
};
