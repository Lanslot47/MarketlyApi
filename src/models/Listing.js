const mongoose = require('mongoose');
const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    listingType: {
        type: String,
        enum: ["product", "services"],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
    images: [
        {
            url: { type: String, required: true },
            publicId: { type: String, required: true }
        }
    ],
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "published",
    },
    views: {
        type: Number,
        default: 0,
    },
    producer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true
    },
    whatsapp: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        required: true
    }

},
    { timestamps: true })
module.exports = mongoose.model("Listing", listingSchema);