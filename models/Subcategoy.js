const mongoose = require("mongoose");
const slugify = require("slugify");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      minlength: [3, "Subcategory name must be at least 3 characters"],
      unique: true,
    },
    slug: String,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

subcategorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;
