const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    live: {
        type: Boolean,
        default: true
    },
    owner: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Ad', AdSchema, 'ad');