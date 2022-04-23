// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema
const productSchema = new Schema(
    {
        name: {type: String, required: true},
        description: String,
        img: String,
        price: {type: Number, min:0},
        qty: {type: Number, min:0}
    }
);

const productModel = mongoose.model("Product", productSchema)
module.exports = productModel