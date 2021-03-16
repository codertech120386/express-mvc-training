const express = require("express");
const router = express.Router();

const Author = require("../models/author.model");
const Tag = require("../models/tag.model");

// Create a new author
router.post("/", async (req, res) => {
  const author = await Author.create(req.body);
  res.status(201).json({ data: author });
});

// Fetch all authors
router.get("/", async (req, res) => {
  const authors = await Author.find({});
  res.status(200).json({ data: authors });
});

// Fetch a Single Author By Id
router.get("/:id", async (req, res) => {
  const author = await Author.findById(req.params.id);
  res.status(200).json({ data: author });
});

// Update an existing author by Id
router.patch("/:id", async (req, res) => {
  const author = await Author.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  )
    .lean()
    .exec();
  res.status(200).json({ data: author });
});

// Delete a Single Author by Id
router.delete("/:id", async (req, res) => {
  const author = await Author.findOneAndRemove(req.params.id);
  res.status(200).json({ data: author });
});

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

module.exports = router;
