import mongoose from "mongoose";

let productSchema = mongoose.Schema;

let schema = new productSchema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    sub_category: {
        type: String,
        required: false,
    },
    tax: {
        type: String,
        required: false,
    },
    hsn_sac: {
        type: String,
        required: false,
    },
    unit_type: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
})

let Product = mongoose.model('products', schema)
export default Product;