const dotenv = require("dotenv").config();
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
//SET UP MONGOOSE
const mongoose = require("./config/database");

// Port
const port = process.env.PORT || 3000;

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

// Set the view engine and file extension
app.engine("hbs", hbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

const usersController = require("./controllers/users.js");
app.use("/portlandia/user", usersController);
const episodeController = require("./controllers/episodes.js");
app.use("/portlandia/episode", episodeController);

// connection to mongodb
mongoose.connection.on(
    "error",
    console.error.bind(console, "MongoDB connection error:")
);

//USER AUTH
const checkauth = (req, res, next) => {
    if (
        typeof req.cookies.nToken === "undefined" ||
        req.cookies.nToken === null
    ) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;

        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload; // {  _id, username }
    }
    next();
};
app.use(checkauth);

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
