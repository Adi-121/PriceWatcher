import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    currency: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        // required: true,
    },
    currentPrice: {
        type: String,
        // required: true,
    },
    originalPrice: {
        type: String,
        // required: true,
    },
    priceHistory: [
        {
            price: { type: String, required: true },
            date: { type: Date, default: Date.now },
        }
    ],
    lowestPrice: {
        type: String,
        // required: true,
    },
    highestPrice: {
        type: String,
        // required: true,
    },
    averagePrice: {
        type: String,
        // required: true,
    },
    discountRate: {
        type: String,
        default: "0%"
    },
    isOutOfStock: {
        type: Boolean,
        default: false,
    },
    user:{
        type:[{
            type:String,
        }],
        default: [],
    }
}, { timestamps: true });


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;