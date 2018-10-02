var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server);

var User = require("../models/user");

describe("User", function() {});

// Return 401 if user not logged
//Return 400 if id not provided
//Return 400 if no character id is provided
//return 404 if no infor for customer
// return 200 if valid request
//
