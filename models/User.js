const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    phone: String,
    profileImage: String,
    role: { type: String, enum: ["admin", "user", "seller"], default: "user" },
    active: { type: Boolean, default: true, select: false },
    confirmEmail: { type: Boolean, default: false },
    passwordResetToken: String,
    passwordResetExpire: Date,
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
