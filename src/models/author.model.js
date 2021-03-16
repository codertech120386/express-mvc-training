const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    first_name: String,
    last_name: String,
  },
  { versionKey: false }
);

const Author = mongoose.model("author", authorSchema);

module.exports = Author;
