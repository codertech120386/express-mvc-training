const express = require("express");
const router = express.Router();

const Comment = require("../models/comment.model");

// Create a new comment
router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.status(201).json({ data: comment });
});

// Fetch all comments
router.get("/", async (req, res) => {
  const comments = await Comment.find({});
  res.status(200).json({ data: comments });
});

// Fetch a single comment By id
router.get("/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  res.status(200).json({ data: comment });
});

// Update an existing comment by id
router.patch("/:id", async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  )
    .lean()
    .exec();
  res.status(200).json({ data: comment });
});

// Delete a single comment by id
router.delete("/:id", async (req, res) => {
  const comment = await Comment.findOneAndRemove(req.params.id);
  res.status(200).json({ data: comment });
});

module.exports = router;
