const mongoose = require("mongoose");
const slugify = require("slugify");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      minlength: [3, "Brand name must be at least 3 characters"],
      unique: true,
    },
    slug: String,
    image: String,
  },
  { timestamps: true }
);

brandSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
