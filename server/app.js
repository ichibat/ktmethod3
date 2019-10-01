const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

//Connect to mongoose
mongoose
  .connect("mongodb://tims:Hit135Run@ds019946.mlab.com:19946/ktmethod", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => {
    console.log(err);
  });

//Load Patient Model
require("./models/Patient");
const Patient = mongoose.model("patients");

//Views directory
app.set("views", "./server/views");

//Helmet
app.use(helmet());

//Express-handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cor
app.use(cors());

//Index route
app.get("/", (req, res) => {
  res.render("index");
});

//About route
app.get("/about", (req, res) => {
  res.render("about");
});

//Patients index page
app.get("/patients", (req, res) => {
  Patient.find({})
    .sort({ date: "desc" })
    .then(patients => {
      res.render("patients/index", {
        patients: patients
      });
    });
});

//add Patients
app.get("/patients/add", (req, res) => {
  res.render("patients/add");
});

//edit Patients Form
app.get("/patients/edit/:id", (req, res) => {
  Patient.findOne({
    _id: req.params.id
  }).then(patient => {
    res.render("patients/edit", {
      patient: patient
    });
  });
});

//Post Patients
app.post("/patients", (req, res) => {
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
      console.log("saved");
      res.redirect("/patients");
    });
  }
});

//Routing for api/scores
const scores = require("./routes/api/scores");

app.use("/api/scores", scores);

//Port setting
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
