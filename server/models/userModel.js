const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    username: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
