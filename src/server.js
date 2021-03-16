const express = require("express");
const mongoose = require("mongoose");

const authorController = require("./controllers/author.controller");
const tagController = require("./controllers/tag.controller");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/relational", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const postSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    tags: [
      { type: mongoose.Schema.Types.ObjectId, ref: "tag", required: true },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

const commentSchema = mongoose.Schema(
  {
    body: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

app.use("/authors", authorController);
app.use("/tags", tagController);

// Create a new post
app.post("/posts", async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({ data: post });
});

// Fetch all posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json({ data: posts });
});

// Fetch a single post By id
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json({ data: post });
});

// Update an existing post by id
app.patch("/posts/:id", async (req, res) => {
  const post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .lean()
    .exec();
  res.status(200).json({ data: post });
});

// Delete a single comment by id
app.delete("/posts/:id", async (req, res) => {
  const post = await Post.findOneAndRemove(req.params.id);
  res.status(200).json({ data: post });
});

// Fetch all posts by an author
app.get("/authors/:id/posts", async (req, res) => {
  const posts = await Post.find({ author: req.params.id }).populate("author");
  res.status(200).json({ data: posts });
});

// Fetch all posts by a tag
app.get("/tags/:id/posts", async (req, res) => {
  const posts = await Post.find({ tags: req.params.id }).populate("tag");
  res.status(200).json({ data: posts });
});

// Create a new comment
app.post("/comments", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.status(201).json({ data: comment });
});

// Fetch all comments
app.get("/comments", async (req, res) => {
  const comments = await Comment.find({});
  res.status(200).json({ data: comments });
});

// Fetch a single comment By id
app.get("/comments/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  res.status(200).json({ data: comment });
});

// Update an existing comment by id
app.patch("/comments/:id", async (req, res) => {
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
app.delete("/comments/:id", async (req, res) => {
  const comment = await Comment.findOneAndRemove(req.params.id);
  res.status(200).json({ data: comment });
});

// Fetch all comments by an author
app.get("/authors/:id/comments", async (req, res) => {
  const comments = await Comment.find({ author: req.params.id }).populate(
    "author"
  );
  res.status(200).json({ data: comments });
});

const start = async () => {
  await connect();

  app.listen(2244, () => {
    console.log("listening on port 2244");
  });
};

start();
