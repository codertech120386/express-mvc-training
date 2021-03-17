const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("tag", tagSchema);
