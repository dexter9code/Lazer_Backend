const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Category } = require("../model/Category");

const { Product, validateProductItem } = require("../model/Product");

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const random = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + random + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
});

router.get("/", async (req, res) => {
  const product = await Product.find().sort("name");
  res.send(product);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { error } = validateProductItem(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const categoryName = await Category.findOne({ name: req.body.category });
  if (!categoryName) return res.status(400).send("Invalid Category");

  try {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: `http://192.168.1.40:8787/image/${req.file.filename}`,
    });
    console.log(req.file);
    await product.save();
    res.send(product);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
