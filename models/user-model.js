const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    }],
    orders: {
        type: Array,
        default: Array
    },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("user", userSchema);