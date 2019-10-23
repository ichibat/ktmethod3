const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated } = require("../../helpers/auth");

//Load Models
require("../../models/Patient");
const Patient = mongoose.model("patients");
require("../../models/Score");
const Score = mongoose.model("scores");

//Patients index page
router.get("/", ensureAuthenticated, (req, res) => {
  Patient.find({ user: req.user.id })
    .sort({ date: "desc" })
    .then(patients => {
      res.render("patients/index", {
        patients: patients
      });
    });
});

//add Patients
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("patients/add");
});

//edit Patients Form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Patient.findOne({
    _id: req.params.id
  }).then(patient => {
    if (patient.user != req.user.id) {
      req.flash("error_msg", "承認されていません");
      res.redirect("/");
    } else {
      res.render("patients/edit", {
        patient: patient
      });
    }
  });
});

//Post Patients
router.post("/add", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  console.log(req.body);

  let errors = [];

  if (!req.body.karteNumber) {
    errors.push({ text: "カルテ番号を入力してください" });
  }
  if (!req.body.firstNameInitial) {
    errors.push({ text: "名前のイニシャルを入力してください" });
  }
  if (!req.body.lastNameInitial) {
    errors.push({ text: "苗字のイニシャルを入力してください" });
  }
  if (errors.length > 0) {
    res.render("patients/add", {
      errors: errors,
      karteNumber: req.body.karteNumber,
      firstNameInitial: req.body.firstNameInitial,
      lastNameInitial: req.body.lastNameInitial
    });
  } else {
    const newPatient = {
      karteNumber: req.body.karteNumber,
      firstNameInitial: req.body.firstNameInitial,
      lastNameInitial: req.body.lastNameInitial,
      user: req.user._id,
      dateScored: req.body.dateScored,
      Q1Value: req.body.Q1Value,
      Q2Value: req.body.Q2Value,
      Q3Value: req.body.Q3Value,
      Q4Value: req.body.Q4Value,
      Q5Value: req.body.Q5Value,
      Q6Value: req.body.Q6Value,
      Q7Value: req.body.Q7Value,
      Q8Value: req.body.Q8Value,
      Q9Value: req.body.Q9Value,
      Q10Value: req.body.Q10Value,
      Q11Value: req.body.Q11Value,
      Q12Value: req.body.Q12Value,
      Q13Value: req.body.Q13Value
    };
    console.log(
      `patient is ${newPatient.karteNumber} and processed to graph drawing.`
    );

    new Patient(newPatient).save().then(patient => {
      req.flash("success_msg", "患者さんは新規登録されました");
      res.render("patients/graph", {
        patient: patient
      });
      // res.render("patients/edit", {
      //   patient: patient
      // });
    });
  }
});

//Post Scores
router.post("/score", ensureAuthenticated, (req, res) => {
  console.log(req.body);

  let errors = [];

  if (!req.body.dateScored) {
    errors.push({ text: "評価日を入力してください" });
  }
  if (!req.body.Q1Value) {
    errors.push({ text: "(1)食べる意欲を入力してください" });
  }
  if (!req.body.Q2Value) {
    errors.push({ text: "(2)全身状態を入力してください" });
  }
  if (!req.body.Q3Value) {
    errors.push({ text: "(3)呼吸状態を入力してください" });
  }
  if (!req.body.Q4Value) {
    errors.push({ text: "(4)口腔状態を入力してください" });
  }
  if (!req.body.Q5Value) {
    errors.push({ text: "(5)認知機能(食事中)を入力してください" });
  }
  if (!req.body.Q6Value) {
    errors.push({ text: "(6)咀嚼・送り込みを入力してください" });
  }
  if (!req.body.Q7Value) {
    errors.push({ text: "(7)嚥下を入力してください" });
  }
  if (!req.body.Q8Value) {
    errors.push({ text: "(8)姿勢・耐久性を入力してください" });
  }
  if (!req.body.Q9Value) {
    errors.push({ text: "(9)食事動作を入力してください" });
  }
  if (!req.body.Q10Value) {
    errors.push({ text: "(10)活動を入力してください" });
  }
  if (!req.body.Q11Value) {
    errors.push({ text: "(11)摂食状況レベルを入力してください" });
  }
  if (!req.body.Q12Value) {
    errors.push({ text: "(12)食物形態を入力してください" });
  }
  if (!req.body.Q13Value) {
    errors.push({ text: "(13)栄養を入力してください" });
  }

  if (errors.length > 0) {
    res.render("patients/score", {
      errors: errors
      // karteNumber: req.body.karteNumber,
      // firstNameInitial: req.body.firstNameInitial,
      // lastNameInitial: req.body.lastNameInitial
    });
  } else {
    const newScore = {
      karteNumber: req.body.karteNumber,
      dateScored: req.body.dateScored,
      Q1Value: req.body.Q1Value,
      Q2Value: req.body.Q2Value,
      Q3Value: req.body.Q3Value,
      Q4Value: req.body.Q4Value,
      Q5Value: req.body.Q5Value,
      Q6Value: req.body.Q6Value,
      Q7Value: req.body.Q7Value,
      Q8Value: req.body.Q8Value,
      Q9Value: req.body.Q9Value,
      Q10Value: req.body.Q10Value,
      Q11Value: req.body.Q11Value,
      Q12Value: req.body.Q12Value,
      Q13Value: req.body.Q13Value,
      Q2Value: req.body.Q2Value,
      Q1Value: req.body.Q1Value,
      Q2Value: req.body.Q2Value,

      userID: req.body.userID
    };
    console.log("score stored!");

    new Score(newScore).save().then(score => {
      req.flash("success_msg", "スコアは新規登録されました");
      res.redirect("/patients");
    });
  }
});

//Edit Patients
router.put("/:id", ensureAuthenticated, (req, res) => {
  Patient.findOne({
    _id: req.params.id
  }).then(patient => {
    //new values
    patient.karteNumber = req.body.karteNumber;
    patient.firstNameInitial = req.body.firstNameInitial;
    patient.lastNameInitial = req.body.lastNameInitial;
    patient.save().then(patient => {
      req.flash("success_msg", "患者さんの登録は変更されました");
      res.redirect("/patients");
    });
  });
});

//Delete patients
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Patient.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "患者さんの登録は削除されました");
    res.redirect("/patients");
  });
});

module.exports = router;
