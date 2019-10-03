const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

//Load routes
const patients = require("./routes/patients");

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

//Method-override
app.use(methodOverride("_method"));

//Express-session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

//Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error_msg = req.flash("error");
  next();
});

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

//User Login
app.get("/users/login", (req, res) => {
  res.send("login");
});

//User Register
app.get("/users/register", (req, res) => {
  res.send("register");
});

//Routing for api/scores
const scores = require("./routes/api/scores");

app.use("/api/scores", scores);

//Use routes
app.use("/patients", patients);

//Port setting
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
