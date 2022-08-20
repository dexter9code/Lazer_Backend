const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { GoogleUser, validateUser } = require("../model/googleUser");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let googleUser = new GoogleUser(_.pick(req.body, ["email", "name"]));

  await googleUser.save();
  res.send(googleUser);
});

module.exports = router;
