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

//Use Helmet
app.use(helmet());

//Views directory
app.set("views", "./server/views");

//Express-handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Middleware
app.use(bodyParser.json());
app.use(cors());

const scores = require("./routes/api/scores");

app.use("/api/scores", scores);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));

//Index route
app.get("/", (req, res) => {
  res.render("index");
});

//About route
app.get("/about", (req, res) => {
  res.render("about");
});

//About Patient Form
app.get("/patients/add", (req, res) => {
  res.render("patients/add");
});
