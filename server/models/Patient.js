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
  karteNumber: {
    type: String,
    required: true
  },
  scoreCreated: {
    type: Date,
    required: true
  },
  Q1Value: {
    type: Number
  },
  Q2Value: {
    type: Number
  },
  Q3Value: {
    type: Number
  },
  Q4Value: {
    type: Number
  },
  Q5Value: {
    type: Number
  },
  Q6Value: {
    type: Number
  },
  Q7Value: {
    type: Number
  },
  Q8Value: {
    type: Number
  },
  Q9Value: {
    type: Number
  },
  Q10Value: {
    type: Number,
    required: true
  },
  Q11Value: {
    type: Number,
    required: true
  },
  Q12Value: {
    type: Number,
    required: true
  },
  Q13Value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("patients", PatientSchema);
