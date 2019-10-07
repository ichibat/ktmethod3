const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PatientSchema = new Schema({
  karteNumber: {
    type: String,
    required: true
  },
  firstNameInitial: {
    type: String,
    required: true
  },
  lastNameInitial: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("patients", PatientSchema);
