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

const Tag = mongoose.model("tag", tagSchema);

module.exports = Tag;
