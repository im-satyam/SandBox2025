const mongoose = require("mongoose");
const emailSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("emails", emailSchema);
