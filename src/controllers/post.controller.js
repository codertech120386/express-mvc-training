const express = require("express");
const router = express.Router();

const Post = require("../models/post.model");

const crudController = require("./crud.controller");

router.post("/", async (req, res) => crudController(Post).post(req, res));

router.get("/", async (req, res) => crudController(Post).get(req, res));

router.get("/:id", async (req, res) => crudController(Post).getOne(req, res));

router.patch("/:id", async (req, res) =>
  crudController(Post).updateOne(req, res)
);

router.delete("/:id", async (req, res) =>
  crudController(Post).removeOne(req, res)
);

module.exports = router;
