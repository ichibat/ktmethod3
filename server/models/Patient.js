const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PatientSchema = new Schema({
  KarteNumber: {
    type: String,
    required: true
  },
  lastNameInitial: {
    type: String,
    required: true
  },
  firstNameInital: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("patients", PatientSchema);
