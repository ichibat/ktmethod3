const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

//Load Patient Model
require("../models/Patient");
const Patient = mongoose.model("patients");

//Patients index page
router.get("/", (req, res) => {
  Patient.find({})
    .sort({ date: "desc" })
    .then(patients => {
      res.render("patients/index", {
        patients: patients
      });
    });
});

//add Patients
router.get("/add", (req, res) => {
  res.render("patients/add");
});

//edit Patients Form
router.get("/edit/:id", (req, res) => {
  Patient.findOne({
    _id: req.params.id
  }).then(patient => {
    res.render("patients/edit", {
      patient: patient
    });
  });
});

//Post Patients
router.post("/", (req, res) => {
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
      lastNameInitial: req.body.lastNameInitial
    };
    console.log(`patient is ${newPatient.karteNumber}`);

    new Patient(newPatient).save().then(patient => {
      req.flash("success_msg", "患者さんは新規登録されました");
      res.redirect("/patients");
    });
  }
});

//Edit Patients
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Patient.deleteOne({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "患者さんの登録は削除されました");
    res.redirect("/patients");
  });
});

module.exports = router;
