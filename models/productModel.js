import mongoose from "mongoose";

//schema of product model
const productSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    image: {
        type: String
    },
    shipping: {
        type: String
    }
}, {timestamps: true}); //adds created time of product

export default mongoose.model('products',productSchema);