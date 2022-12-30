//This is the schema of the user created which is going to represent the model of the data
import mongoose from "mongoose";



const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number
  },
  { timestamps: true} //this gives us created and updated date
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;