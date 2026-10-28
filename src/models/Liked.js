const mongoose = require("mongoose");

const likeds= new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
  },
  { timestamps: true }
);

likeds.index({ user: 1, listing: 1 }, { unique: true });
module.exports = mongoose.model("likedItems", likeds);

