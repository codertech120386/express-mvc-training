const express = require("express");

const authorController = require("./controllers/author.controller");
const tagController = require("./controllers/tag.controller");
const postController = require("./controllers/post.controller");
const commentController = require("./controllers/comment.controller");

const connect = require("./config/db");

const app = express();
app.use(express.json());

app.use("/authors", authorController);
app.use("/tags", tagController);
app.use("/posts", postController);
app.use("/comments", commentController);

const start = async () => {
  await connect();

  app.listen(2244, () => {
    console.log("listening on port 2244");
  });
};

module.exports = start;
