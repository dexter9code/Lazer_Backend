const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
});

const Category = mongoose.model("category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(10).required(),
  });

  return schema.validate(category);
}

module.exports.Category = Category;
module.exports.validateCategory = validateCategory;
module.exports.categorySchema = categorySchema;
