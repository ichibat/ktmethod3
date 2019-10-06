const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//User Login
router.get("/login", (req, res) => {
  res.render("users/login");
});

//User Register
router.get("/register", (req, res) => {
  res.render("users/register");
});

//Register form post
router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({ text: "パスワードが一致しません" });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: "パスワードは少なくとも4文字以上必要です" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      email: req.body.name,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    res.send("passed");
  }
});

module.exports = router;
