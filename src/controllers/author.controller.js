const express = require("express");
const router = express.Router();

const Author = require("../models/author.model");
const Tag = require("../models/tag.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const crudController = require("./crud.controller");

router.post("/", async (req, res) => crudController(Author).post(req, res));

router.get("/", async (req, res) => crudController(Author).get(req, res));

router.get("/:id", async (req, res) => crudController(Author).getOne(req, res));

router.patch("/:id", async (req, res) =>
  crudController(Author).updateOne(req, res)
);

router.delete("/:id", async (req, res) =>
  crudController(Author).removeOne(req, res)
);

// Fetch all tags of an author
router.get("/:id/tags", async (req, res) => {
  //   const authorDetails = await Author.findById(req.params.id);
  const tags = await Tag.find({ author: req.params.id })
    .populate("author")
    .lean()
    .exec();
  const data = { tags };
  res.status(200).json({ data });
});

// Fetch all posts by an author
router.get("/:id/posts", async (req, res) => {
  const posts = await Post.find({ author: req.params.id }).populate("author");
  res.status(200).json({ data: posts });
});

// Fetch all comments by an author
router.get("/:id/comments", async (req, res) => {
  const comments = await Comment.find({ author: req.params.id }).populate(
    "author"
  );
  res.status(200).json({ data: comments });
});

module.exports = router;
