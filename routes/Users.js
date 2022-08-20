const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, validateUser } = require("../model/User");

//GET
router.get("/", async (req, res) => {
  const user = await User.find().sort("name").select({ name: 1, email: 1 });
  res.send(user);
});

//POST
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email Already Exists");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") //this must be passed otherwise we are not able to acess the header
    .send(_.pick(user, ["name", "email"]));
});

module.exports = router;
