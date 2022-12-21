const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
    },
    slug: String,
    imageCover: String,
    images: [String],
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    colors: [String],
    price: { type: Number, required: [true, "Product price is required"] },
    discountPrice: Number,
    sold: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    ratingAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingCount: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
