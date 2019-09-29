const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const exphbs = require("express-handlebars");

const app = express();

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
