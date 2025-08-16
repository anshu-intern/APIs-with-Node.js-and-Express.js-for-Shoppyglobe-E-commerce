import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    "id" :  { type: Number, required: true, unique: true },
    "name" : { type: String, required: true },
    "price" : { type: Number, required: true },
    "description" : { type: String, default: ""},
    "stockQuantity" : { type: Number, default: 0 }
},{ timestamps : true });

const productModel = mongoose.model("product",productSchema);

export default productModel;