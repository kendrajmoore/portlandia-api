const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();
chai.use(chaiHttp);

const Character = require("../models/character.js");
