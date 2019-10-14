const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ScoreSchema = new Schema({
  karteNumber: {
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
  userID: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model("scores", ScoreSchema);
