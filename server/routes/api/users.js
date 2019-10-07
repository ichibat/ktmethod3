const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

//Load User Model
require("../../models/User");
const User = mongoose.model("users");

//User Login
router.get("/login", (req, res) => {
  res.render("users/login");
});

//User Register
router.get("/register", (req, res) => {
  res.render("users/register");
});

//Login Form Post
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/patients",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
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
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        console.log("Eメールは登録済みです");
        req.flash("error_msg", "Eメールは登録済みです");
        res.redirect("register");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "あなたは登録されたのでログインできます"
                );
                res.redirect("login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

//Logout user
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "ログアウトしました");
  res.redirect("login");
});

module.exports = router;
