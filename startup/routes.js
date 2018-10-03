const express = require("express");
const usersController = require("../controllers/users.js");
const episodeController = require("../controllers/episodes.js");

module.exports = app => {
    app.use(express.json());
    app.use("/portlandia/user", usersController);
    app.use("/portlandia/episode", episodeController);
};
