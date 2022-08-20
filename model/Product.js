const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { categorySchema } = require("./Category");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 244,
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  price: {
    type: Number,
    required: true,
    max: 9999,
    min: 1,
  },
  image: { type: String, required: true },
});

const Product = mongoose.model("product", productSchema);

function validateProductItem(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(244).required(),
    category: Joi.string().min(3).max(10).required(),
    price: Joi.number().min(1).max(255).required(),
    image: Joi.string(),
  });

  return schema.validate(product);
}

module.exports.Product = Product;
module.exports.validateProductItem = validateProductItem;
