const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

const GoogleUser = mongoose.model("googleuser", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    name: Joi.string().max(255).required(),
  });

  return schema.validate(user);
}

module.exports.GoogleUser = GoogleUser;
module.exports.validateUser = validateUser;
