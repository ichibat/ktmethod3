const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

//Use Helmet
app.use(helmet());

//Middleware
app.use(bodyParser.json());
app.use(cors());

// const posts = require("./routes/api/scores");

// app.use("/api/scores", scores);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
