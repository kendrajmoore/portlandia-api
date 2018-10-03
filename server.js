const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const expressValidator = require("express-validator");

// Port
const port = process.env.PORT || 3000;

//SET UP MONGOOSE
const mongoose = require("mongoose");

//middleware
app.use(methodOverride("_method"));
// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// static files middleware
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("combined"));

// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

const usersController = require("./controllers/users.js");
app.use("/portlandia/user", usersController);
const episodeController = require("./controllers/episodes.js");
app.use("/portlandia/episode", episodeController);

// Mongoose Connection
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/portlandia";
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
);

app.get("/", (req, res) => {
    res.send("portlandia home page");
});

//404 page
app.get("*", (req, res) => {
    res.render("error/index.hbs");
});

app.listen(port, () => {
    console.log("listening");
});

module.exports = app;
