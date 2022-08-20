const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

const { User } = require("../model/User");

router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Invalid Email or Password");

  const validatepassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!validatepassword) res.status(401).send("Invalid Email or Password");

  const token = user.generateAuthToken();
  res.send(token);
});

function validateAuth(auth) {
  const schema = Joi.object({
    email: Joi.string().email().min(9).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(auth);
}

module.exports = router;
