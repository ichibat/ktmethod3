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
  dateScored: {
    type: String,
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
    type: Number
  },
  Q11Value: {
    type: Number
  },
  Q12Value: {
    type: Number
  },
  Q13Value: {
    type: Number
  },
  dateScored2: {
    type: String
  },
  Q1Value2: {
    type: Number
  },
  Q2Value2: {
    type: Number
  },
  Q3Value2: {
    type: Number
  },
  Q4Value2: {
    type: Number
  },
  Q5Value2: {
    type: Number
  },

  Q6Value2: {
    type: Number
  },
  Q7Value2: {
    type: Number
  },
  Q8Value2: {
    type: Number
  },
  Q9Value2: {
    type: Number
  },
  Q10Value2: {
    type: Number
  },
  Q11Value2: {
    type: Number
  },
  Q12Value2: {
    type: Number
  },
  Q13Value2: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("patients", PatientSchema);
