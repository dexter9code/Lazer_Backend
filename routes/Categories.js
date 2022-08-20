const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Category, validateCategory } = require("../model/Category");

router.get("/", async (req, res) => {
  const category = await Category.find().sort("name");
  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = new Category(_.pick(req.body, ["name"]));
  await category.save();
  res.send(category);
});

module.exports = router;
