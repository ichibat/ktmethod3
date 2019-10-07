const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ScoreSchema = new Schema({
  karteNumber: {
    type: String,
    required: true
  },
  scoreCreated: {
    type: Date,
    required: true
  }
  ktmScore.Q1Value: {
    type: Number
  },
  ktmScore.Q2Value: {
    type: Number
  },
  ktmScore.Q3Value: {
    type: Number
  },
  ktmScore.Q4Value: {
    type: Number
  },
  ktmScore.Q5Value: {
    type: Number
  },
  ktmScore.Q6Value: {
    type: Number
  },
  ktmScore.Q7Value: {
    type: Number
  },
  ktmScore.Q8Value: {
    type: Number
  },
  ktmScore.Q9Value: {
    type: Number
  },
  ktmScore.Q10Value: {
    type: Number,
    required: true
  },
  ktmScore.Q11Value: {
    type: Number,
    required: true
  },
  ktmScore.Q12Value: {
    type: Number,
    required: true
  },
  ktmScore.Q13Value: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:"users"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model("scores", ScoreSchema);
