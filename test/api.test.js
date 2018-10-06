// process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);
// const { site, message } = require("../helpers");

describe("API 404", () => {
    it("should get an error message", done => {
        chai.request(server)
            .get("/portlandia/ifc")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
