const chai = require("chai");
const chaiHttp = require("chai-http");
const { character } = require("../../controllers/characters");
const expect = require("chai").expect;
chai.use(chaiHttp);

const Character = require("../models/character.js");

let req = {
    body: {}
};

let res = {
    sendCalledWith: "",
    send: function(arg) {
        this.sendCalledWith = arg;
    }
};

describe("Greetings Route", function() {
    describe("Hello() function", function() {
        it("Should error out if no name provided ", function() {
            hello(req, res);
            expect(res.sendCalledWith).to.contain("error");
        });
    });
});
