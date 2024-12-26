const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 256,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: "",
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
