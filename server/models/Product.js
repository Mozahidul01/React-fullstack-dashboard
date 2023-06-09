import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: [String],
    },
    description: {
      type: String,
      minlength: 10,
      maxlength: 300,
    },
    category: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    supply: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleString() } }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
